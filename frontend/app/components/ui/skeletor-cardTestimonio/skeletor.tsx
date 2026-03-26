export function TestimonialSkeleton() {
  return (
    <div className='ml-17 grid grid-cols-1 gap-6 sm:ml-25 sm:grid-cols-2 lg:ml-10 lg:grid-cols-3 lg:gap-2'>
        {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className='relative mb-10 flex w-78 flex-col rounded-2xl border border-gray-200/30 bg-white/30 p-5 shadow-sm backdrop-blur-lg transition-all duration-300 hover:shadow-md md:w-80 lg:ml-10 lg:w-84'
        >
          {/*imagen*/}
          <div className='absolute -top-8'>
            <div className='h-20 w-20 animate-pulse rounded-full bg-gray-300' />
          </div>
          {/* categoría */}
          <div className='absolute top-3 right-4 h-5 w-16 animate-pulse rounded-full bg-gray-300' />
          {/* titulo */}
          <div className='mx-auto mt-12 h-4 w-24 animate-pulse rounded bg-gray-300' />
          {/* contenido */}
          <div className='mt-4 space-y-2'>
            <div className='h-3 w-full animate-pulse rounded bg-gray-300' />
            <div className='h-3 w-5/6 animate-pulse rounded bg-gray-300' />
            <div className='h-3 w-4/6 animate-pulse rounded bg-gray-300' />
          </div>
          {/* fecha */}
          <div className='mt-4 ml-auto h-3 w-20 animate-pulse rounded bg-gray-300' />
        </div>
      ))}
    </div>
  )
}
