export const SkeletonItemOrder = () => {
  return (
    <div className={`bg-bg p-4 rounded-lg flex w-full flex-col`}>
      <div className='w-full flex gap-5'>
        <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 w-40 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
      </div>
      <div className={'flex gap-3'}>
        <div className='h-[100px] w-[70px] animate-pulse bg-gray-400 rounded-lg'></div>
        <div className='h-[100px] w-[70px] animate-pulse bg-gray-400 rounded-lg'></div>
        <div className='h-[100px] w-[70px] animate-pulse bg-gray-400 rounded-lg'></div>
        <div className='h-[100px] w-[70px] animate-pulse bg-gray-400 rounded-lg'></div>
      </div>
      <div className='h-8 w-28 animate-pulse bg-gray-400 rounded-full my-2.5'></div>
    </div>
  )
}
