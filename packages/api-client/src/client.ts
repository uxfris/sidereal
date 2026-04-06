// packages/api-client/src/client.ts

import { env } from "apps/web/config/env"

export type ApiError = {
    code: string
    message: string
    status: number
    details?: unknown
}

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: unknown
    headers?: HeadersInit
    params?: Record<string, string | number | boolean | undefined>
    cache?: RequestCache
    next?: NextFetchRequestConfig
}

function buildUrl(url: string, params?: RequestOptions['params']) {
    if (!params) return url

    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
            search.append(key, String(value))
        }
    }

    return `${url}?${search.toString()}`
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const {
        method = 'GET',
        body,
        headers,
        params,
        cache = 'no-store',
        next,
    } = options

    const baseUrl =
        typeof window === 'undefined'
            ? env.API_URL // server-side
            : env.NEXT_PUBLIC_API_URL // client-side

    const fullUrl = buildUrl(`${baseUrl}${url}`, params)

    const res = await fetch(fullUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'include', // IMPORTANT for cookie auth
        body: body ? JSON.stringify(body) : undefined,
        cache,
        next,
    })

    if (!res.ok) {
        let errorBody: any = null
        try {
            errorBody = await res.json()
        } catch { }

        const error: ApiError = {
            code: errorBody?.code,
            message: errorBody?.message || res.statusText || 'API Error',
            status: res.status,
            details: errorBody,
        }

        throw error
    }

    // Handle empty response
    if (res.status === 204) {
        return {} as T
    }

    return res.json()
}

export const client = {
    get: <T>(url: string, options?: RequestOptions) =>
        request<T>(url, { ...options, method: 'GET' }),

    post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        request<T>(url, { ...options, method: 'POST', body }),

    put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        request<T>(url, { ...options, method: 'PUT', body }),

    patch: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        request<T>(url, { ...options, method: 'PATCH', body }),

    delete: <T>(url: string, options?: RequestOptions) =>
        request<T>(url, { ...options, method: 'DELETE' }),
}