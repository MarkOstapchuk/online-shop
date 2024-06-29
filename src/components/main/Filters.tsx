'use client'

import { clsx } from 'clsx'
import {
  ArrowDownUp,
  Grid3X3,
  LayoutGrid,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { useState } from 'react'

interface props {
  setLayout: (state: boolean) => void
  setSort: (sort: string) => void
  sort: string
}

const sortParams = {
  nameAsc: 'По алфавиту А-Я',
  nameDesc: 'C конца алфавита Я-А',
  priceAsc: 'По возрастанию цены',
  priceDesc: 'По убыванию цены'
}
function getSortName(str: string): string {
  switch (str) {
    case 'name,asc':
      return sortParams.nameAsc
    case 'name,desc':
      return sortParams.nameDesc
    case 'price.amount,asc':
      return sortParams.priceAsc
    case 'price.amount,desc':
      return sortParams.nameDesc
    default:
      return 'сортировка'
  }
}

const Filters = ({ setLayout, setSort, sort }: props) => {
  const [layoutActive, setLayoutActive] = useState(false)
  const [sortActive, setSortActive] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  const setCustomSort = (newSort: string) => {
    setSort(newSort)
    setSortActive((prev) => !prev)
  }
  return (
    <div>
      <div className={'mt-4 flex items-center text-xs'}>
        <div className={'px-3 py-2 flex z-50 items-center bg-third rounded-xl'}>
          <button
            onClick={() => {
              setLayoutActive(false)
              setLayout(false)
            }}
            className={'bg-third mr-2 z-40 rounded-xl'}
          >
            <Grid3X3 color={layoutActive ? 'gray' : 'black'} />
          </button>

          <button
            onClick={() => {
              setLayoutActive(true)
              setLayout(true)
            }}
            className={'bg-third rounded-xl'}
          >
            <LayoutGrid color={layoutActive ? 'black' : 'gray'} />
          </button>
        </div>

        <div
          className={clsx(
            'rounded-xl z-20 relative block mx-4 w-auto',
            sort ? 'bg-black text-white' : 'bg-third'
          )}
        >
          <button
            onClick={() => setSortActive((prevState) => !prevState)}
            className={'flex px-3 z-20 py-2 '}
          >
            <ArrowDownUp className={'mr-2'} />
            <div>
              {sort ? (
                <div className={'flex space-x-2 items-center'}>
                  <div>{getSortName(sort)}</div>
                  <button
                    className={
                      'bg-white rounded-full flex items-center justify-center p-0.5'
                    }
                    onClick={(event) => {
                      setSort('')
                      event.stopPropagation()
                    }}
                  >
                    <X
                      color={'black'}
                      size={20}
                    />
                  </button>
                </div>
              ) : (
                'Сортировка'
              )}
            </div>
          </button>
          {sortActive && (
            <div
              className={
                'fixed left-0 top-0 right-0 bottom-0 bg-transparent z-10'
              }
              onClick={() => setSortActive(false)}
            />
          )}
          {sortActive && <SetSortComponent setSort={setCustomSort} />}
        </div>

        <div>
          <button
            onClick={() => setFilterActive((prevState) => !prevState)}
            className={'px-3 py-2 bg-third rounded-xl flex'}
          >
            <SlidersHorizontal className={'mr-2'} />
            Фильтр
          </button>
          {filterActive && (
            <div
              className={
                'fixed left-0 top-0 right-0 bottom-0 bg-black opacity-25 z-10'
              }
              onClick={() => setFilterActive(false)}
            />
          )}
          {filterActive && <SetFilterComponent />}
        </div>
      </div>
    </div>
  )
}

export default Filters

function SetSortComponent({ setSort }: { setSort: (sort: string) => void }) {
  return (
    <div
      className={
        ' top-11 left-0 text-gray-700 z-20 absolute w-auto bg-gray-100 whitespace-nowrap rounded-lg'
      }
    >
      <button
        onClick={() => setSort('name,asc')}
        className={
          'rounded-t-lg w-full hover:bg-bg-gray px-6 py-3 flex items-center'
        }
      >
        <span>По алфавиту А-Я</span>
      </button>
      <button
        onClick={() => setSort('name,desc')}
        className={'hover:bg-bg-gray px-6 py-3 flex items-center w-full'}
      >
        <span>C конца алфавита Я-А</span>
      </button>
      <button
        onClick={() => setSort('price.amount,asc')}
        className={'hover:bg-bg-gray px-6 py-3 flex items-center w-full'}
      >
        <span>По возрастанию цены</span>
      </button>
      <button
        onClick={() => setSort('price.amount,desc')}
        className={
          'rounded-b-lg hover:bg-bg-gray px-6 py-3 flex items-center w-full'
        }
      >
        <span>По убыванию цены</span>
      </button>
    </div>
  )
}
function SetFilterComponent() {
  return (
    <div className={'fixed z-20 top-0 left-0 bottom-0 bg-bg-gray'}>filter</div>
  )
}
