'use client'

import { useRouter } from 'next/navigation'

import routes from '@/config/routes'

import { removeFromStorage } from '@/services/authToken.service'

const Logout = () => {
  const { refresh } = useRouter()
  const logout = () => {
    removeFromStorage()
    refresh()
  }
  return (
    <button
      className={'px-5 py-2 bg-deep text-white rounded-2xl'}
      onClick={logout}
    >
      Выйти из профиля
    </button>
  )
}

export default Logout
