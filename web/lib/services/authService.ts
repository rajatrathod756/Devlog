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

    return authApi.login(formData)
  },

  signup: async (
    payload: SignupPayload
  ) => {

    return authApi.signup(payload)
  },
}