import { axiosClassic, axiosToAuth } from '@/config/interceptors'
import { client_secret } from '@/config/server'

import { saveTokenStorage } from '@/services/authToken.service'

export const AuthService = {
  async main(data: ILogin | IRegister) {
    const response = await axiosToAuth.post(``, {
      grant_type: 'password',
      client_secret: client_secret,
      client_id: 'product-service',
      username: data.email,
      password: data.password
    })
    console.log(response.data)
    if (response.data.access_token)
      saveTokenStorage('access_token', response.data.access_token)

    if (response.data.refresh_token)
      saveTokenStorage('refresh_token', response.data.refresh_token)
    return response
  },
  async getNewTokens() {
    const response = await axiosToAuth.post('')

    if (response.data.access_token)
      saveTokenStorage('access_token', response.data.access_token)
    return response
  },
  async logout() {
    const response = await axiosToAuth.post<boolean>('')
    return response
  }
}
