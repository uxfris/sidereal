/** Cursor payload for meeting list pagination (opaque to clients). */

export type MeetingListCursorPayload = { c: string; i: string }

export function encodeMeetingListCursor(
  payload: MeetingListCursorPayload
): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
}

export function decodeMeetingListCursor(
  raw: string
): { createdAt: Date; id: string } {
  try {
    const payload = JSON.parse(
      Buffer.from(raw, "base64url").toString("utf8")
    ) as MeetingListCursorPayload
    return { createdAt: new Date(payload.c), id: payload.i }
  } catch {
    throw new Error("INVALID_CURSOR")
  }
}
