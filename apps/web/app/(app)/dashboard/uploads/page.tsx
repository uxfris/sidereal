"use client"

import { uploadsApi } from "@workspace/api-client"
import type { UploadSummary } from "@workspace/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { FetchFromLink } from "./_components/fetch-from-link"
import { RecentUploads } from "./_components/recent-uploads"
import { UploadInput } from "./_components/upload-input"

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

export default function Uploads() {
  const [uploads, setUploads] = useState<UploadSummary[]>([])
  const [inFlight, setInFlight] = useState<Record<string, InFlightUpload>>({})
  const [loading, setLoading] = useState(true)

  const refreshUploads = useCallback(async () => {
    const list = await uploadsApi.list({ limit: 20 })
    setUploads(list)
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const list = await uploadsApi.list({ limit: 20 })
        if (mounted) setUploads(list)
      } catch {
        toast.error("Failed to load recent uploads")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleUploadFile = useCallback(
    async (file: File) => {
      const title = deriveTitle(file.name)
      try {
        const presigned = await uploadsApi.presign({
          fileName: file.name,
          fileType: file.type || "application/octet-stream",
          fileSize: file.size,
          title,
        })

        const createdAt = new Date().toISOString()
        setInFlight((prev) => ({
          ...prev,
          [presigned.meetingId]: {
            meetingId: presigned.meetingId,
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
              const current = prev[presigned.meetingId]
              if (!current) return prev
              return {
                ...prev,
                [presigned.meetingId]: { ...current, progress: percent },
              }
            })
          },
        })

        await uploadsApi.complete(presigned.meetingId)
        setInFlight((prev) => {
          const next = { ...prev }
          delete next[presigned.meetingId]
          return next
        })

        await refreshUploads()
        toast.success("Upload queued for transcription")
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Upload failed. Please retry."
        )
      }
    },
    [refreshUploads]
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
    return [...inFlightList, ...uploads]
  }, [inFlight, uploads])

  const progressByMeetingId = useMemo(() => {
    const map: Record<string, number> = {}
    for (const item of Object.values(inFlight)) {
      map[item.meetingId] = item.progress
    }
    return map
  }, [inFlight])

  return (
    <div className="flex flex-col gap-8 overflow-y-auto px-4 pt-0 pb-12 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <UploadInput onUploadFile={handleUploadFile} />
        <FetchFromLink />
      </div>
      <RecentUploads
        uploads={displayUploads}
        progressByMeetingId={progressByMeetingId}
        loading={loading}
      />
    </div>
  )
}
