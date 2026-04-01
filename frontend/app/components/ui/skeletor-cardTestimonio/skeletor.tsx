export function TestimonialSkeleton() {
  return (
    <>
      {/*móvil*/}
      <div className='flex flex-col gap-5 px-4 py-4 sm:hidden'>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className='animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='relative h-44 w-full bg-gray-200' />

            <div className='p-4'>
              <span className='mb-2 inline-block rounded-full bg-gray-300 px-3 py-1 text-[11px]'>&nbsp;</span>
              <div className='mb-1 h-4 w-3/4 rounded bg-gray-300' />
              <div className='mt-1 h-3 w-1/2 rounded bg-gray-300' />
              <div className='mt-2 space-y-2'>
                <div className='h-3 rounded bg-gray-200' />
                <div className='h-3 w-5/6 rounded bg-gray-200' />
              </div>
              <div className='mt-3 flex flex-wrap gap-2'>
                <span className='h-4 w-10 rounded-full bg-gray-200' />
                <span className='h-4 w-12 rounded-full bg-gray-200' />
              </div>
              <div className='mt-3 h-3 w-1/4 rounded bg-gray-200' />
              <div className='mt-4 h-8 w-full rounded-lg bg-gray-300' />
            </div>
          </div>
        ))}
      </div>

      {/*pantalla>=sm */}
      <div className='hidden gap-6 sm:flex'>
        {/* card grande*/}
        <div className='relative h-80 w-[45%] animate-pulse overflow-hidden rounded-xl bg-gray-200 shadow-md' />

        {/*carrusel*/}
        <div className='relative w-[55%]'>
          {/* lista de cards*/}
          <div className='flex gap-5 overflow-x-auto px-8 pb-4'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='group min-w-55 animate-pulse cursor-pointer overflow-hidden rounded-xl border border-gray-200/60 bg-white/70'>
                <div className='relative h-41 w-full overflow-hidden bg-gray-200' />
                <div className='p-3'>
                  <div className='mb-1 h-3 w-3/4 rounded bg-gray-300' />
                  <div className='mt-1 h-2 w-1/2 rounded bg-gray-300' />
                  <div className='mt-2 h-2 w-6 rounded-full bg-gray-300' />
                </div>
              </div>
            ))}
          </div>

          {/*botones skeleton*/}
          <div className='absolute bottom-4 right-0 left-0 flex justify-between '>
            <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300' />
            <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300' />
          </div>
          </div>

        
      </div>
    </>
  )
}
