export function HomeSkeleton() {
  return (
    <div className='animate-pulse space-y-6 p-4 md:mx-auto md:w-[90%] md:p-6'>
      {/*card*/}
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className='flex items-center gap-3 rounded-xl border border-gray-400 bg-gray-100 p-4 shadow-sm h-20.25 md:min-h-25'>
            <div className='h-10 w-10 rounded-lg bg-gray-300' />
            <div className='space-y-2'>
              <div className='h-3 w-16 rounded bg-gray-300' />
              <div className='h-5 w-10 rounded bg-gray-400' />
            </div>
          </div>
        ))}
      </div>

      {/*acciones*/}
      <div className='my-10 flex justify-between gap-3 md:mx-auto md:w-120'>
        <div className='h-10 min-w-45 rounded-lg bg-gray-300' />
        <div className='h-10 min-w-45 rounded-lg bg-gray-200' />
      </div>

      {/*lsita*/}
      <div className='mt-20 mb-35 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='h-5 w-40 rounded bg-gray-300' />
          <div className='h-3 w-16 rounded bg-gray-200' />
        </div>
        <ul className='max-h-105 space-y-3 overflow-y-auto pr-1'>
          {Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className='flex max-h-13 items-center justify-between rounded-xl border border-gray-200 bg-white p-5'>
              <div className='flex flex-col space-y-3'>
                <div className='h-4 w-40 rounded bg-gray-300' />
                <div className='h-3 w-24 rounded bg-gray-200' />
              </div>

              <div className='h-6 w-20 rounded-full bg-gray-300' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
