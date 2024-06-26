'use client'

import { clsx } from 'clsx'
import { useState } from 'react'

const CatalogBtn = () => {
  const [isActive, setActive] = useState<boolean>(false)

  return (
    <button
      onClick={() => setActive((prevState) => !prevState)}
      className={
        'bg-deep rounded-2xl flex items-center px-5 py-2 text-white mx-4'
      }
    >
      <div className={'w-5 h-5 relative mr-2'}>
        <span
          style={
            isActive
              ? { transition: 'top .05s,transform .15s .05s' }
              : { transition: 'transform .05s,top .15s .05s' }
          }
          className={clsx(
            'w-5 h-0.5 block bg-white absolute left-0 rounded-3xl',
            isActive ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-1'
          )}
        ></span>
        <span
          style={
            isActive
              ? { transition: 'bottom .05s,transform .15s .05s' }
              : { transition: 'transform .05s,bottom .15s .05s' }
          }
          className={clsx(
            'w-5 h-0.5 block bg-white absolute left-0 rounded-3xl',
            isActive ? 'bottom-1/2 translate-y-1/2 rotate-45' : 'bottom-1'
          )}
        ></span>
      </div>
      Каталог
    </button>
  )
}

export default CatalogBtn
