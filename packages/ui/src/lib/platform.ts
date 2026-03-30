import { headers } from "next/headers"

export async function getPlatform(): Promise<"mac" | "windows" | "linux" | "unknown"> {
    const h = await headers()
    const ua = h.get("user-agent") || ""

    console.log("User-Agent:", ua)


    if (/Mac|iPhone|iPad|iPod/i.test(ua)) return "mac"
    if (/Win/i.test(ua)) return "windows"
    if (/Linux/i.test(ua)) return "linux"
    return "unknown"
}