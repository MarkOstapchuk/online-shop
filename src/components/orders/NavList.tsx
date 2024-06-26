'use client'

import { clsx } from 'clsx'
import { Box, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavList = () => {
  const pathname = usePathname()
  return (
    <div className={'flex flex-col text-xs'}>
      <Link
        className={clsx(
          'py-2.5 px-2 flex items-center rounded-xl',
          pathname === '/profile' && 'bg-bg'
        )}
        href={'/profile'}
      >
        <UserRound
          className={'mr-2'}
          size={30}
        />
        <p>Профиль</p>
      </Link>
      <Link
        className={clsx(
          'py-2.5 px-2 flex items-center rounded-xl',
          pathname === '/orders' && 'bg-bg'
        )}
        href={'/orders'}
      >
        <Box
          className={'mr-2'}
          size={30}
        />
        <p>Заказы</p>
      </Link>
    </div>
  )
}

export default NavList
