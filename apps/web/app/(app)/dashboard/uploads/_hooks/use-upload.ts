"use client"

import { uploadsApi } from "@workspace/api-client"
import type { UploadSummary } from "@workspace/types"
import { useCallback, useMemo, useState } from "react"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"

type InFlightUpload = {
  meetingId: string
  title: string
  fileName: string
  fileType: string
  fileSize: number
  progress: number
  createdAt: string
  status: UploadSummary["status"]
}

function deriveTitle(fileName: string): string {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "").trim()
  return withoutExt.length > 0 ? withoutExt : "Untitled meeting"
}

export function useUpload() {
  const queryClient = useQueryClient()

  // ✅ Server state handled by React Query
  const { data: uploads = [], isLoading } = useQuery({
    queryKey: ["uploads"],
    queryFn: () => uploadsApi.list({ limit: 20 }),
  })

  // ✅ Client-side ephemeral state
  const [inFlight, setInFlight] = useState<Record<string, InFlightUpload>>({})

  const handleUploadFile = useCallback(
    async (file: File) => {
      const title = deriveTitle(file.name)
      let meetingId: string | null = null

      try {
        const presigned = await uploadsApi.presign({
          fileName: file.name,
          fileType: file.type || "application/octet-stream",
          fileSize: file.size,
          title,
        })

        meetingId = presigned.meetingId

        const createdAt = new Date().toISOString()

        // initialize upload
        setInFlight((prev) => ({
          ...prev,
          [meetingId!]: {
            meetingId: meetingId!,
            title,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            progress: 0,
            createdAt,
            status: "PENDING_UPLOAD",
          },
        }))

        await uploadsApi.uploadToSignedUrl(presigned.url, file, {
          onProgress: (percent) => {
            setInFlight((prev) => {
              const current = prev[meetingId!]
              if (!current) return prev
              return {
                ...prev,
                [meetingId!]: { ...current, progress: percent },
              }
            })
          },
        })

        // mark processing
        setInFlight((prev) => {
          const current = prev[meetingId!]
          if (!current) return prev
          return {
            ...prev,
            [meetingId!]: {
              ...current,
              status: "UPLOADED",
              progress: 100,
            },
          }
        })

        await uploadsApi.complete(meetingId)

        // remove from inFlight
        setInFlight((prev) => {
          const next = { ...prev }
          delete next[meetingId!]
          return next
        })

        // ✅ tell React Query data is stale
        queryClient.invalidateQueries({ queryKey: ["uploads"] })

        toast.success("Upload queued for transcription")
      } catch (error) {
        if (meetingId) {
          setInFlight((prev) => {
            const current = prev[meetingId!]
            if (!current) return prev
            return {
              ...prev,
              [meetingId!]: { ...current, status: "FAILED" },
            }
          })
        }

        toast.error(
          error instanceof Error
            ? error.message
            : "Upload failed. Please retry."
        )
      }
    },
    [queryClient]
  )

  const displayUploads = useMemo(() => {
    const inFlightList: UploadSummary[] = Object.values(inFlight).map(
      (item) => ({
        meetingId: item.meetingId,
        title: item.title,
        fileName: item.fileName,
        fileType: item.fileType,
        fileSize: item.fileSize,
        createdAt: item.createdAt,
        status: item.status,
      })
    )

    const inFlightIds = new Set(inFlightList.map((u) => u.meetingId))
    const filteredUploads = uploads.filter((u) => !inFlightIds.has(u.meetingId))

    return [...inFlightList, ...filteredUploads]
  }, [inFlight, uploads])

  const progressByMeetingId = useMemo(() => {
    const map: Record<string, number> = {}
    for (const item of Object.values(inFlight)) {
      map[item.meetingId] = item.progress
    }
    return map
  }, [inFlight])

  return {
    handleUploadFile,
    displayUploads,
    progressByMeetingId,
    loading: isLoading,
  }
}
