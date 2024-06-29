'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { SkeletonItemOrder } from '@/components/orders/SkeletonItemOrder'

enum Status {
  all = 'all',
  in_progress = 'in_progress',
  completed = 'completed'
}
const Orders = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [statusType, setStatusType] = useState<Status | null>(null)
  useEffect(() => {
    const status = searchParams.get('status')
    if (status && status in Status) {
      setStatusType(status as Status)
    } else {
      setStatusType(Status.all)
    }
  }, [searchParams])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  return (
    <div className={'w-full'}>
      <div className={'flex items-center gap-3'}>
        <Link
          className={clsx(
            'p-2 rounded-lg',
            statusType === Status.all && 'bg-soft'
          )}
          href={pathname + '?' + createQueryString('status', Status.all)}
        >
          Все
        </Link>
        <Link
          className={clsx(
            'p-2 rounded-lg',
            statusType === Status.in_progress && 'bg-soft'
          )}
          href={
            pathname + '?' + createQueryString('status', Status.in_progress)
          }
        >
          Текущие
        </Link>
        <Link
          className={clsx(
            'p-2 rounded-lg',
            statusType === Status.completed && 'bg-soft'
          )}
          href={pathname + '?' + createQueryString('status', Status.completed)}
        >
          Выполненные
        </Link>
      </div>
      <div className={'mt-10'}>
        <SkeletomLayout />
      </div>
    </div>
  )
}

export default Orders

const SkeletomLayout = () => {
  return (
    <div className={'flex flex-col w-full gap-10'}>
      <SkeletonItemOrder />
      <SkeletonItemOrder />
      <SkeletonItemOrder />
    </div>
  )
}
