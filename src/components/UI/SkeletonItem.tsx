export const SkeletonItem = () => {
  return (
    <div className={`bg-third space-y-10 p-4 rounded-lg`}>
      <div className='h-[208px] w-75p mx-auto animate-pulse bg-gray-400 rounded-lg'></div>
      <div className='space-y-3'>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export const SkeletonItemSecond = () => {
  return (
    <div className={`bg-third p-4 rounded-lg flex`}>
      <div className='h-[208px] w-[208px] animate-pulse bg-gray-400 rounded-lg'></div>
      <div className='w-full ml-10'>
        <div className='h-3  animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
        <div className='h-3 animate-pulse bg-gray-400 rounded-full mb-2.5'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
