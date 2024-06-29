import Cookies from 'js-cookie'

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

export const saveTokenStorage = (type: EnumTokens, token: string) => {
  Cookies.set(type, token, {
    sameSite: 'none',
    expires: 1
  })
}
export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
  Cookies.remove(EnumTokens.REFRESH_TOKEN)
}
