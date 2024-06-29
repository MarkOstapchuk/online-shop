'use client'

import { useRouter } from 'next/navigation'

import routes from '@/config/routes'

const EmptyCart = () => {
  const { push } = useRouter()
  return (
    <div className={'w-full bg-bg rounded-3xl p-6 '}>
      <div className={'text-center mt-2 text-2xl font-medium'}>
        В корзине пусто
      </div>
      <div className={'text-center mt-3 text-gray-500'}>
        Находите нужные товары в каталоге, поиске и подборках на главной
      </div>
      <button
        onClick={() => {
          push(routes.HOME)
        }}
        className={'bg-third mx-auto mt-10 px-5 py-2 block rounded-2xl'}
      >
        На главную
      </button>
    </div>
  )
}

export default EmptyCart
