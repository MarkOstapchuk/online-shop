import axios, { CreateAxiosDefaults } from 'axios'

import { errorCatch } from '@/config/error'
import { auth_path, server_path } from '@/config/server'

import { AuthService } from '@/services/auth.service'
import {
  getAccessToken,
  getRefreshToken,
  removeFromStorage
} from '@/services/authToken.service'

const options: CreateAxiosDefaults = {
  baseURL: server_path,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
}
const axiosToAuth = axios.create({
  baseURL: auth_path,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const axiosClassic = axios.create({
  baseURL: server_path,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  if (!accessToken && refreshToken) {
    try {
      await AuthService.getNewTokens()
    } catch (e: any) {
      if (e.response?.data?.error_description === 'Token is not active')
        removeFromStorage()
    }
  }
  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await AuthService.getNewTokens()
        console.log(123)
        return axiosWithAuth.request(originalRequest)
      } catch (error: any) {
        if (error?.response?.status === 400) removeFromStorage()
      }
    }
    throw error
  }
)
export { axiosClassic, axiosToAuth, axiosWithAuth }
