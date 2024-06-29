import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { Image as ImageIcon, Trash } from 'lucide-react'
import Image from 'next/image'

import cartService from '@/services/cart.service'
import mediaService from '@/services/media.service'

interface props {
  data: ICart
}
function getText(quantity: number): string {
  const lastDigit = quantity % 10
  const lastTwoDigits = quantity % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${quantity} товаров`
  }

  if (lastDigit === 1) {
    return `${quantity} товар`
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${quantity} товара`
  }

  return `${quantity} товаров`
}

const Cart = ({ data }: props) => {
  const price =
    Object.entries(data.totalPrices)[0][1] +
    ' ' +
    Object.entries(data.totalPrices)[0][0]

  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationKey: ['updateQuantity'],
    mutationFn: (data: { id: number; quantity: IUpdateQuantityRequest }) =>
      cartService.updateQuantity(data.id, data.quantity),
    async onSuccess(newCartState: ICart) {
      await queryClient.setQueryData(['cart'], newCartState)
    }
  })

  const removeMutation = useMutation({
    mutationKey: ['deleteItem'],
    mutationFn: (id: number) => cartService.deleteCartItem(id),
    async onSuccess(newCartState: ICart) {
      await queryClient.setQueryData(['cart'], newCartState)
    }
  })

  function updateQuantity(id: number, newQuantity: number) {
    updateMutation.mutate({ id, quantity: { quantity: newQuantity } })
  }

  function deleteItem(id: number) {
    removeMutation.mutate(id)
  }

  return (
    <div className={'flex h-full space-x-6 items-start'}>
      <div className={'w-70p bg-bg p-5 shrink-0 rounded-3xl'}>
        <div className={'text-2xl font-medium flex items-center'}>
          Корзина
          <span className={'text-xs text-gray-500 ml-5'}>
            {getText(data.items.length)}
          </span>
        </div>
        <div className={'flex flex-col mt-6'}>
          {data.items.map((item) => (
            <div
              key={item.id}
              className={'flex border-t-0.25 border-gray-200 py-6 group'}
            >
              {item.product.images.length ? (
                <Image
                  src={mediaService.getImage(item.product.images[0])}
                  alt='product_image'
                  width={208}
                  height={208}
                />
              ) : (
                <div
                  className={
                    'h-[100px] w-[70px] bg-gray-400 rounded-lg flex items-center justify-center'
                  }
                >
                  <ImageIcon color={'white'} />
                </div>
              )}
              <div className={'w-45p mx-5'}>
                {item.product.name}, {item.product.netWeightInKg} кг
              </div>
              <div className={'flex flex-col items-center'}>
                <div
                  style={{ boxShadow: '0 2px 6px rgba(28,28,30,.08)' }}
                  className={
                    'rounded-3xl bg-bg py-0.5 flex items-center h-8 px-4'
                  }
                >
                  <button
                    disabled={item.quantity <= 1}
                    className={'w-4 block p-1'}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <span
                      className={clsx(
                        'block h-0.5 w-4 cursor-pointer',
                        item.quantity <= 1 ? 'bg-second' : 'bg-black'
                      )}
                    ></span>
                  </button>
                  <span className={'mx-5'}>{item.quantity} шт</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={'w-4 p-1'}
                  >
                    <span
                      className={
                        'relative w-4 flex justify-center items-center'
                      }
                    >
                      <span
                        className={'h-0.5 block w-4 bg-black absolute'}
                      ></span>

                      <span
                        className={
                          'h-0.5 w-4 bg-black block cursor-pointer rotate-90 absolute'
                        }
                      ></span>
                    </span>
                  </button>
                </div>
                {item.quantity > 1 && (
                  <div className={'text-xxs text-gray-500 mt-1'}>
                    {item.product.price.amount} {item.product.price.currency} за
                    шт
                  </div>
                )}
                <button
                  className={'mt-2 delete-btn hidden group-hover:block'}
                  onClick={() => deleteItem(item.id)}
                >
                  <Trash
                    className={'text-gray-500 hover:text-soft'}
                    size={20}
                  />
                </button>
              </div>
              <div className={'ml-auto mr-2 font-medium '}>
                {item.product.price.amount * item.quantity}{' '}
                {item.product.price.currency}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={'bg-bg p-5 basis-auto w-full h-auto rounded-3xl'}>
        <div className={'flex items-center justify-between'}>
          <span>Итого:</span>
          <span className={'font-semibold text-lg'}>{price}</span>
        </div>

        <div
          className={
            'flex text-xs mt-5 justify-between items-center text-gray-500'
          }
        >
          <span>{getText(data.items.length)}</span>
          <span>{price}</span>
        </div>
        <button
          className={
            'rounded-3xl bg-deep block px-16 mx-auto mt-8 text-white py-3 whitespace-nowrap'
          }
        >
          Оформить заказ
        </button>
      </div>
    </div>
  )
}

export default Cart
