import { http } from '@/lib/http'
import type {LoginResponse } from '@/types'


export const authApi = {
  login: (payload: FormData) =>
    http.post<LoginResponse>('/auth/login', payload),
}