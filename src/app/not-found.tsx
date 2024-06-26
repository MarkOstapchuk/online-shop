import { Frown } from 'lucide-react'
import React from 'react'

const NotFound = () => {
  return (
    <div className={'flex mt-36 justify-center font-bold text-deep'}>
      <div className={'flex flex-col items-center'}>
        <div className={'flex items-center'}>
          <div className={'text-7xl mr-10'}>404</div>
          <Frown size={100} />
        </div>
        <div className={'text-3xl'}>Страница не найдена</div>
      </div>
    </div>
  )
}

export default NotFound
