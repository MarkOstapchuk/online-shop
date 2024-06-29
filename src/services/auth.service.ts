import { axiosToAuth } from '@/config/interceptors'
import { client_secret } from '@/config/server'

import {
  EnumTokens,
  getRefreshToken,
  saveTokenStorage
} from '@/services/authToken.service'

export const AuthService = {
  async main(data: ILogin | IRegister) {
    const response = await axiosToAuth.post(``, {
      grant_type: 'password',
      client_secret: client_secret,
      client_id: 'service',
      username: data.email,
      password: data.password
    })
    console.log(response.data)
    if (response.data.access_token)
      saveTokenStorage(EnumTokens.ACCESS_TOKEN, response.data.access_token)

    if (response.data.refresh_token)
      saveTokenStorage(EnumTokens.REFRESH_TOKEN, response.data.refresh_token)
    return response
  },
  async getNewTokens() {
    const refresh_token = getRefreshToken()
    if (refresh_token) {
      const response = await axiosToAuth.post('', {
        grant_type: 'refresh_token',
        client_secret: client_secret,
        client_id: 'service',
        refresh_token: refresh_token
      })
      console.log(response)
      if (response.data.access_token)
        saveTokenStorage(EnumTokens.ACCESS_TOKEN, response.data.access_token)
      return response
    }
  },
  async logout() {
    const response = await axiosToAuth.post<boolean>('')
    return response
  }
}
