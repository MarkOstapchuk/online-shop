'use client'

import { useQuery } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { SkeletonItem, SkeletonItemSecond } from '@/components/UI/SkeletonItem'
import Filters from '@/components/main/Filters'

import routes from '@/config/routes'

import mediaService from '@/services/media.service'
import productService from '@/services/product.service'

const AllProducts = () => {
  const [layout, setLayout] = useState(false)
  const [sort, setSort] = useState('')

  const pathname = usePathname()
  const { push } = useRouter()

  const { data, isSuccess } = useQuery<IPage>({
    queryKey: ['pageProduct', sort],
    queryFn: () => productService.getProducts(undefined, sort, undefined)
  })
  return (
    <div>
      <Filters
        setLayout={setLayout}
        setSort={setSort}
        sort={sort}
      />
      <div className={'mt-6'}>
        {!isSuccess && !data ? (
          <SkeletonLayout layout={layout} />
        ) : (
          <div
            className={clsx(
              'grid gap-10',
              layout ? 'grid-cols-2' : 'grid-cols-4'
            )}
          >
            {data.content.map((item) => (
              <div
                onClick={() => push(routes.PRODUCT + '/' + item.id)}
                className={
                  'bg-transparent cursor-pointer py-4 px-2 rounded-lg flex flex-col justify-between'
                }
                key={item.id}
              >
                <div>
                  {item.images.length ? (
                    <Image
                      src={mediaService.getImage(item.images[0])}
                      alt='product_image'
                      width={208}
                      height={208}
                    />
                  ) : (
                    <div
                      className={
                        'h-[208px] w-[150px] mx-auto bg-gray-400 rounded-lg flex items-center justify-center'
                      }
                    >
                      <ImageIcon color={'white'} />
                    </div>
                  )}
                  <div
                    className={'font-medium text-lg mt-8'}
                  >{`${item.price.amount} ${item.price.currency}`}</div>
                  <div className={'my-2 text-xs'}>{item.name}</div>
                  {item.title && <div>{item.title}</div>}
                </div>
                <button
                  className={
                    'bg-deep text-white text-xs rounded-3xl w-full block mx-auto h-8'
                  }
                >
                  В корзину
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProducts

function SkeletonLayout({ layout }: { layout: boolean }) {
  return (
    <div>
      {layout ? (
        <div className={'grid gap-10 grid-cols-2'}>
          <SkeletonItemSecond />
          <SkeletonItemSecond />
          <SkeletonItemSecond />
          <SkeletonItemSecond />
        </div>
      ) : (
        <div className={'grid gap-10 grid-cols-4'}>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      )}
    </div>
  )
}
