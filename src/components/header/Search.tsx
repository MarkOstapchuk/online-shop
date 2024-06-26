'use client'

import { SearchIcon, X } from 'lucide-react'
import { useRef, useState } from 'react'

const Search = () => {
  const [inputState, setInputState] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  return (
    <form className={'bg-gray-200 w-full rounded-2xl p-2 flex items-center'}>
      <button>
        <SearchIcon color={'gray'} />
      </button>
      <input
        ref={ref}
        value={inputState}
        onChange={(event) => setInputState(event.target?.value)}
        placeholder={'Поиск товаров'}
        type='text'
        className={'bg-gray-200 w-full mx-4 outline-none'}
      />
      {inputState && (
        <X
          color={'gray'}
          onClick={() => {
            setInputState('')
            if (ref.current) ref.current.focus()
          }}
        />
      )}
    </form>
  )
}

export default Search
