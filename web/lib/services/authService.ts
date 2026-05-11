import { useAuthStore } from '@/lib/stores/authStore'
import { authApi } from '@/lib/api/auth'

import type {
  LoginPayload,
  SignupPayload
} from '@/types'


export const authService = {

  login: async (
    payload: LoginPayload
  ) => {

    const formData = new FormData()

    formData.append(
      'username',
      payload.username
    )

    formData.append(
      'password',
      payload.password
    )

    const data = await authApi.login(formData)
    console.log("data",data)
     useAuthStore.getState().setAuth(data.token, data.access_token)
    return data
  },

  signup: async (
    payload: SignupPayload
  ) => {

    return authApi.signup(payload)
  },

  logout: async () => {
    await authApi.logout()
    useAuthStore.getState().clearAuth()
    window.location.href = '/login'
  },
}