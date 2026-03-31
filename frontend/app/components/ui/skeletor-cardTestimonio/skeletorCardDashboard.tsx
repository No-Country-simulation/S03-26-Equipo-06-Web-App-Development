'use client'
export function TestimonioSkeletonDashboard() {
  return (
    <div className='mt-16 w-full'>
      {/* Pantallas grandes*/}
      <table className='m-auto hidden table-auto border-collapse animate-pulse rounded-xl bg-white/30 shadow-md backdrop-blur-md md:table md:max-w-170 lg:m-auto lg:max-w-5xl'>
        <thead>
          <tr className='border-b border-gray-300 bg-gray-300/50'>
            <th className='w-1/4 px-6 py-3 text-left text-sm font-semibold text-gray-700'>Autor</th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Estado</th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Categoría / Tags</th>
            <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>Fecha</th>
            <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr key={idx} className='border-b border-gray-200'>
              <td className='px-4 py-4 align-middle'>
                <div className='flex items-start gap-3'>
                  <div className='h-20 w-28 shrink-0 rounded bg-gray-300' />
                  <div className='flex flex-1 flex-col gap-2'>
                    <div className='h-4 w-32 rounded bg-gray-300' />
                    <div className='h-3 w-full max-w-62.5 rounded bg-gray-200' />
                    <div className='h-3 w-3/4 rounded bg-gray-200' />
                  </div>
                </div>
              </td>
              <td className='px-6 py-4'>
                <div className='h-4 w-16 rounded bg-gray-300' />
              </td>
              <td className='px-6 py-4'>
                <div className='mb-1 h-4 w-20 rounded bg-gray-300' />
                <div className='h-3 w-24 rounded bg-gray-200' />
              </td>
              <td className='px-4 py-4 text-center'>
                <div className='mx-auto h-4 w-16 rounded bg-gray-300' />
              </td>
              <td className='flex justify-center gap-2 px-6 py-4 text-center'>
                <div className='h-8 w-16 rounded bg-gray-300' />
                <div className='h-8 w-16 rounded bg-gray-300' />
                <div className='h-8 w-16 rounded bg-gray-300' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Skeleton móvil */}
      <div className='flex animate-pulse flex-col gap-6 px-4 py-6 md:hidden'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='relative mr-2 ml-15 flex min-w-100 flex-col rounded-2xl border border-gray-200 bg-white/50 p-4 shadow-md backdrop-blur-md'
          >
            {/* ESTADO/}
            <div className='absolute top-4 right-4 h-4 w-16 rounded bg-gray-300' />
            {/* VIDEO */}
            <div className='h-16 w-28 rounded-md border border-gray-500/40 bg-gray-300' />
            {/* TITULO */}
            <div className='mt-2 h-4 w-40 rounded bg-gray-300' />
            {/* INFO */}
            <div className='mt-2 space-y-2'>
              <div className='h-3 w-28 rounded bg-gray-300' />
              <div className='h-2 w-24 rounded bg-gray-200' />
              {/* CONTENIDO*/}
              <div className='space-y-1'>
                <div className='h-2 w-full rounded bg-gray-200' />
                <div className='h-2 w-5/6 rounded bg-gray-200' />
                <div className='h-2 w-2/3 rounded bg-gray-200' />
              </div>
            </div>
            {/* FECHA*/}
            <div className='absolute right-4 bottom-4 h-3 w-16 rounded bg-gray-300' />
            {/*BOTONES*/}
            <div className='mt-4 flex flex-wrap gap-2'>
              <div className='h-7 w-20 rounded bg-gray-300' />
              <div className='h-7 w-20 rounded bg-gray-300' />
              <div className='h-7 w-20 rounded bg-gray-300' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
