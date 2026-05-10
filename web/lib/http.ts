const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/'

const URL_V1 = `${BASE_URL}api/v1`

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = options.body instanceof FormData
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null

  const res = await fetch(`${URL_V1}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Something went wrong')
  }

  return res.json()
}

export const http = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
  request<T>(endpoint, {
    method: 'POST',
    body: body instanceof FormData
      ? body
      : JSON.stringify(body),
  }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}