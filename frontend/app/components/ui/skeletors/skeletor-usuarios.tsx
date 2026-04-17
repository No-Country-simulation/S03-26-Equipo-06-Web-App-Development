export function UsersPageSkeleton() {
  return (
    <div className='min-h-screen animate-pulse bg-linear-to-br from-slate-50 to-slate-100 p-10'>
      {/*header*/}
      <div className='mb-10 flex items-center justify-between md:ml-15'>
        <div className='h-8 w-64 rounded bg-slate-300' />

       
      </div>

      {/*buscardo*/}
      <div className='mx-auto mb-8 max-w-md'>
        <div className='h-10 w-full rounded-md bg-slate-300' />
      </div>

      {/*gri*/}
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:px-10 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='rounded-2xl border border-slate-200 bg-slate-100 p-6'>
            {/*card*/}
            <div className='mb-6 space-y-3'>
              <div className='flex items-center justify-between'>
                {/* nombre */}
                <div className='h-4 w-32 rounded bg-slate-300' />

                {/* rol*/}
                <div className='h-6 w-16 rounded-full bg-slate-300' />
              </div>
            </div>

            {/*footer*/}
            <div className='h-4 w-28 rounded bg-slate-300' />
          </div>
        ))}
      </div>
    </div>
  )
}