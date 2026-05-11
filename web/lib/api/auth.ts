import { http } from '@/lib/http'

import type {
  LoginResponse,
  SignupPayload,
  UserResponse
} from '@/types'


export const authApi = {

  login: (
    payload: FormData
  ) =>
    http.post<LoginResponse>(
      '/auth/login',
      payload
    ),

  signup: (
    payload: SignupPayload
  ) =>
    http.post<UserResponse>(
      '/auth/signup',
      payload
    ),

  logout: () =>
    http.post('/auth/logout', {})
}