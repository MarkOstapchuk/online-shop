import Cookies from 'js-cookie'

import { client_path, client_url, domain } from '@/config/server'

export enum EnumTokens {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token'
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}
export const getRefreshToken = () => {
  const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)
  return refreshToken || null
}

export const saveTokenStorage = (token: string, type: EnumTokens) => {
  Cookies.set(type, token, {
    domain: domain,
    sameSite: 'strict',
    expires: 1
  })
}
export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
  Cookies.remove(EnumTokens.REFRESH_TOKEN)
}
