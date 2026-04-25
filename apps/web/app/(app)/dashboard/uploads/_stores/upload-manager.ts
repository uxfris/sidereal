// stores/upload-manager.ts
import { create } from "zustand"
import { uploadsApi } from "@workspace/api-client"
import { UploadSummary } from "@workspace/types"

type UploadItem = {
  meetingId: string
  title: string
  fileName: string
  fileType: string
  fileSize: number
  progress: number
  status: UploadSummary["status"]
  createdAt: string
}

type UploadStore = {
  uploads: Record<string, UploadItem>

  startUpload: (file: File) => Promise<void>
  removeUpload: (meetingId: string) => void
}

function deriveTitle(fileName: string): string {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "").trim()
  return withoutExt.length > 0 ? withoutExt : "Untitled meeting"
}

export const useUploadStore = create<UploadStore>((set, get) => ({
  uploads: {},

  removeUpload: (meetingId) =>
    set((state) => {
      const next = { ...state.uploads }
      delete next[meetingId]
      return { uploads: next }
    }),

  startUpload: async (file) => {
    const title = deriveTitle(file.name)

    try {
      // 1. presign
      const presigned = await uploadsApi.presign({
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
        fileSize: file.size,
        title,
      })

      const createdAt = new Date().toISOString()

      // 2. init state
      set((state) => ({
        uploads: {
          ...state.uploads,
          [presigned.meetingId]: {
            meetingId: presigned.meetingId,
            title,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            progress: 0,
            status: "PENDING_UPLOAD",
            createdAt,
          },
        },
      }))

      // 3. upload ke :contentReference[oaicite:1]{index=1}
      await uploadsApi.uploadToSignedUrl(presigned.url, file, {
        onProgress: (percent) => {
          set((state) => {
            const item = state.uploads[presigned.meetingId]
            if (!item) return state

            return {
              uploads: {
                ...state.uploads,
                [presigned.meetingId]: {
                  ...item,
                  progress: percent,
                },
              },
            }
          })
        },
      })

      // 4. mark uploaded
      set((state) => {
        const item = state.uploads[presigned.meetingId]
        if (!item) return state

        return {
          uploads: {
            ...state.uploads,
            [presigned.meetingId]: {
              ...item,
              status: "UPLOADED",
              progress: 100,
            },
          },
        }
      })

      // 5. notify backend
      await uploadsApi.complete(presigned.meetingId)

      // 6. mark processing
      set((state) => {
        const item = state.uploads[presigned.meetingId]
        if (!item) return state

        return {
          uploads: {
            ...state.uploads,
            [presigned.meetingId]: {
              ...item,
              status: "ANALYZING",
            },
          },
        }
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed"

      console.error(message)

      // mark failed
      set((state) => {
        const entries = Object.entries(state.uploads)
        const last = entries[entries.length - 1]
        if (!last) return state

        const [id, item] = last

        return {
          uploads: {
            ...state.uploads,
            [id]: {
              ...item,
              status: "FAILED",
            },
          },
        }
      })
    }
  },
}))
