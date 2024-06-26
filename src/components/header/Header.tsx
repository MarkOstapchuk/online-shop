import { Box, ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import CatalogBtn from '@/components/header/CatalogBtn'
import Container from '@/components/header/Container'
import Search from '@/components/header/Search'

const Header = () => {
  return (
    <Container>
      <div className={'flex pt-5 pb-14 items-center'}>
        <Link
          href={'/'}
          style={{ textShadow: '1px 1px 1px black' }}
          className={'text-3xl text-deep font-bold'}
        >
          Justore
        </Link>
        <CatalogBtn />
        <Search />
        <div className={'flex ml-4'}>
          <Link
            href={'/login'}
            className={'flex flex-col items-center'}
          >
            <UserRound />
            <span className={'text-gray-500 text-xxs'}>Профиль</span>
          </Link>
          <Link
            href={'/orders'}
            className={'flex flex-col mx-6 items-center'}
          >
            <Box />
            <span className={'text-gray-500 text-xxs'}>Заказы</span>
          </Link>
          <Link
            href={'/cart'}
            className={'flex flex-col items-center'}
          >
            <ShoppingCart />
            <span className={'text-gray-500 text-xxs'}>Корзина</span>
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default Header
