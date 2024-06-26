'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronRight, ChevronUp, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import Container from '@/components/header/Container'

import mediaService from '@/services/media.service'
import productService from '@/services/product.service'

interface props {
  params: {
    id: string
  }
}
const Page = ({ params }: props) => {
  const productId = params.id
  const [sizeShowed, setSizeShowed] = useState(false)

  const { data, isLoading } = useQuery<IProductDetails>({
    queryKey: ['product', productId],
    queryFn: () => productService.getProductDetailsById(productId)
  })
  console.log(data)
  return (
    <Container>
      <div>
        {data && !isLoading && (
          <div className={'flex items-start justify-between'}>
            <div className={'flex w-full justify-start'}>
              {data.images.length ? (
                <Image
                  src={mediaService.getImage(data.images[0])}
                  alt={'product image'}
                />
              ) : (
                <div
                  className={
                    'h-[408px] w-[350px] flex-shrink-0 bg-gray-400 rounded-lg flex items-center justify-center'
                  }
                >
                  <ImageIcon color={'white'} />
                </div>
              )}
              <div className={'ml-12 leading-10'}>
                <div className={'text-4xl font-semibold'}>{data.name}</div>
                <div className={'mt-4'}>Характеристики:</div>
                <div className={'mt-4 flex'}>
                  Размеры:
                  <span
                    className={'cursor-pointer'}
                    onClick={() => setSizeShowed((prevState) => !prevState)}
                  >
                    {!sizeShowed ? <ChevronRight /> : <ChevronUp />}
                  </span>
                </div>
                {sizeShowed && (
                  <div className={'ml-4'}>
                    <div>
                      <span className='text-gray-500'>Длина:</span>{' '}
                      {data.lengthInMeters} м.
                    </div>
                    <div>
                      <span className='text-gray-500'>Высота:</span>{' '}
                      {data.heightInMeters} м.
                    </div>
                    <div>
                      <span className='text-gray-500'>Ширина:</span>{' '}
                      {data.widthInMeters} м.
                    </div>
                  </div>
                )}
                <div className={'mt-4'}>
                  <div>
                    <span className='text-gray-500'>Вес "брутто":</span>{' '}
                    {data.grossWeightInKg} кг.
                  </div>
                  <div>
                    <span className='text-gray-500'>Вес "нетто":</span>{' '}
                    {data.netWeightInKg} кг.
                  </div>
                </div>
              </div>
            </div>
            <div className={'shadow-2xl ml-12 bg-bg p-7 rounded-3xl'}>
              <div className={'text-2xl font-bold flex'}>
                <span>
                  {data.price.amount} {data.price.currency}
                </span>
                <span className={' ml-1 mb-1 block text-xs font-normal'}>
                  \шт.
                </span>
              </div>
              <button
                className={
                  'mt-5 bg-deep rounded-3xl whitespace-nowrap py-3 block px-16 text-white'
                }
              >
                В корзину
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Page
