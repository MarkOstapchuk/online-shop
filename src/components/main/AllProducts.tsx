'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { MouseEventHandler, useState } from 'react'
import { toast } from 'react-toastify'

import { SkeletonItem, SkeletonItemSecond } from '@/components/UI/SkeletonItem'
import Filters from '@/components/main/Filters'

import routes from '@/config/routes'

import cartService from '@/services/cart.service'
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

  const { mutate, isError } = useMutation({
    mutationKey: ['addToCart'],
    mutationFn: (data: ICartRequest) => cartService.addItemToCart(data),
    onSuccess() {
      toast.success('Product has been added to the cart!')
    },
    onError() {
      toast.error('An error occurred!')
    }
  })
  const addToCart = (id: number) => {
    mutate({ productId: id, quantity: 1 })
  }
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
                {layout ? (
                  <div className={'flex'}>
                    {item.images.length ? (
                      <Image
                        src={mediaService.getImage(item.images[0])}
                        alt='product_image'
                        className={'shrink-0'}
                        width={308}
                        height={204}
                      />
                    ) : (
                      <div
                        className={
                          'h-[308px] shrink-0 w-[204px] bg-gray-400 rounded-lg flex items-center justify-center'
                        }
                      >
                        <ImageIcon color={'white'} />
                      </div>
                    )}
                    <div
                      className={
                        'flex flex-col w-full justify-between ml-12 items-start'
                      }
                    >
                      <div
                        className={'flex flex-col justify-between h-full mb-5'}
                      >
                        <div>
                          <div className={'text-lg font-medium'}>
                            {item.name}
                          </div>

                          <div className={'text-xs mt-4 text-gray-500'}>
                            {item.description}
                          </div>
                        </div>
                        <div
                          className={'font-medium text-lg'}
                        >{`${item.price.amount} ${item.price.currency}`}</div>
                      </div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          addToCart(item.id)
                        }}
                        className={
                          'bg-deep my-2 text-white text-xs rounded-3xl px-12 block py-2.5'
                        }
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      {item.images.length ? (
                        <Image
                          className={'mx-auto block'}
                          src={mediaService.getImage(item.images[0])}
                          alt='product_image'
                          width={208}
                          height={150}
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
                        className={'font-medium text-lg mt-2'}
                      >{`${item.price.amount} ${item.price.currency}`}</div>
                      <div className={'mt-2 text-xs'}>{item.name}</div>
                      <div className={'text-xxs text-gray-500'}>
                        {item.description}
                      </div>
                    </div>

                    <button
                      onClick={(event) => {
                        event.stopPropagation()
                        addToCart(item.id)
                      }}
                      className={
                        'bg-deep my-2 text-white text-xs rounded-3xl w-full block mx-auto h-8'
                      }
                    >
                      В корзину
                    </button>
                  </>
                )}
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
