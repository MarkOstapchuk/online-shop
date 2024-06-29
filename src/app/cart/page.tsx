'use client'

import { useQuery } from '@tanstack/react-query'

import Cart from '@/components/cart/Cart'
import EmptyCart from '@/components/cart/EmptyCart'
import Container from '@/components/header/Container'

import cartService from '@/services/cart.service'

const Page = () => {
  const { data, isLoading } = useQuery<ICart>({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart()
  })
  return (
    <div className={'bg-bg-gray pt-6 min-h-[90vh] pb-12'}>
      <Container>
        {isLoading ? (
          <SkeletonLayoutCart />
        ) : data && !isLoading && data.items.length ? (
          <Cart data={data} />
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  )
}
function SkeletonLayoutCart() {
  return (
    <div className={'flex justify-between'}>
      <div className={'flex space-y-5 flex-col  w-70p shrink-0 '}>
        <SkeletonItemCart />
        <SkeletonItemCart />
        <SkeletonItemCart />
        <SkeletonItemCart />
      </div>
      <div className={'w-25p '}>
        <div
          className={`bg-bg w-full p-10 rounded-lg flex flex-col items-center`}
        >
          <div className='flex flex-col gap-1'>
            <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
            <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
            <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
          </div>
          <div className='h-8 w-52 animate-pulse bg-gray-400 rounded-full my-2.5'></div>
        </div>
      </div>
    </div>
  )
}

function SkeletonItemCart() {
  return (
    <div className={`bg-bg p-4 rounded-lg flex w-full flex-col`}>
      <div className={'flex space-x-10 justify-between'}>
        <div className='h-[100px] w-[70px] animate-pulse bg-gray-400 rounded-lg'></div>
        <div className='flex flex-col gap-1'>
          <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
          <div className='h-3 w-64 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
          <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        </div>
        <div className='h-8 w-28 animate-pulse bg-gray-400 rounded-full my-2.5'></div>
        <div className='h-3 w-40 ml-auto mt-5 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
      </div>
    </div>
  )
}

export default Page
