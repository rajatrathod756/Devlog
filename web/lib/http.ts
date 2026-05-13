import { useAuthStore } from "./stores/authStore";
import { ApiError, UnauthorizedError } from "./errors";
// in request function

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";

const URL_V1 = `${BASE_URL}api/v1`;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;
  // const token = typeof window !== 'undefined'
  //   ? localStorage.getItem('token')
  //   : null
  const token = useAuthStore.getState().token;

  const res = await fetch(`${URL_V1}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));

    if (res.status === 401) {
      // clear token and redirect to login
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
      throw new UnauthorizedError();
    }

    throw new ApiError(
      body.error || "Something went wrong",
      res.status,
      body.code,
    );
  }

  if (res.status === 204) return null as T;

  return res.json();
}

export const http = {
  get: <T>(endpoint: string) => request<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: <T>(
    endpoint: string,

    body: unknown,
  ) =>
    request<T>(endpoint, {
      method: "PATCH",

      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};
