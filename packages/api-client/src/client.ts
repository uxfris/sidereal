// packages/api-client/src/client.ts

import { z } from "zod";

export const ApiErrorSchema = z.object({
    type: z.string(),
    title: z.string(),
    status: z.number(),
    detail: z.string(),
    traceId: z.string(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: unknown
    headers?: HeadersInit
    params?: Record<string, string | number | boolean | undefined>
    cache?: RequestCache
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
    } = options

    const baseUrl = "" //Make it empty, already handled by proxy


    const fullUrl = buildUrl(`${baseUrl}${url}`, params)

    const res = await fetch(fullUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'include', // IMPORTANT for cookie auth
        body: body ? JSON.stringify(body) : undefined,
        cache
    })

    if (!res.ok) {
        let errorBody: any = null
        try {
            errorBody = await res.json()
        } catch { }

        const error: ApiError = ApiErrorSchema.parse({
            type: errorBody?.['type'] || 'about:blank',
            title: errorBody?.['title'] || errorBody?.['message'] || res.statusText || 'API Error',
            status: res.status,
            detail: errorBody?.['detail'] || '',
            traceId: errorBody?.['trace_id'] || '',
        })

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