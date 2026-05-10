// lib/services/authService.ts

import { authApi } from '@/lib/api/auth'
import { LoginPayload } from '@/types'

export const authService = {
  login: async (payload: LoginPayload) => {
    const formData = new FormData()

    console.log('Payload in authService.login:', payload)
    formData.append('username', payload.username)
    formData.append('password', payload.password)

    const data = await authApi.login(formData)

    return data
  },
}