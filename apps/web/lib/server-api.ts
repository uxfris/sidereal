import { ACTIVE_WORKSPACE_ID_KEY } from "@workspace/api-client"
import { cookies } from "next/headers"

/**
 * For `@workspace/api-client` calls from Server Components / Route Handlers:
 * forwards session cookies and the active workspace cookie to the API `fetch`.
 */
export async function getServerApiFetchOptions(): Promise<{
  cookie: string
  workspaceId: string | undefined
}> {
  const store = await cookies()
  const cookie = store
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")
  const workspaceId = store.get(ACTIVE_WORKSPACE_ID_KEY)?.value
  return { cookie, workspaceId }
}
