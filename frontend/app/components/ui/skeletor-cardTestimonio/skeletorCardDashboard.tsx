export function TestimonioSkeletonDashboard() {
  return (
    <div className='w-full mt-16'>
      {/*pantallas grandes (tabla)*/}
      <table className='m-auto hidden table-auto border-collapse animate-pulse rounded-xl bg-white/30 shadow-md backdrop-blur-md md:table md:max-w-3xl lg:max-w-7xl'>
        <thead>
          <tr className='border-b border-gray-300 bg-gray-100/50'>
            {['Autor', 'Estado', 'Categoría / Tags', 'Fecha', 'Acciones'].map((_, i) => (
              <th key={i} className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                <div className='h-4 w-20 rounded bg-gray-300'></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(4)
            .fill(0)
            .map((_, row) => (
              <tr key={row} className='border-b border-gray-200'>
                {/* autor/imagen */}
                <td className='flex items-center gap-3 px-6 py-4'>
                  <div className='h-12 w-12 rounded-full bg-gray-300'></div>
                  <div className='h-4 w-32 rounded bg-gray-300'></div>
                </td>

                {/*estado */}
                <td className='px-6 py-4'>
                  <div className='h-4 w-16 rounded bg-gray-300'></div>
                </td>

                {/* categoría / tags */}
                <td className='space-y-1 px-6 py-4'>
                  <div className='h-3 w-24 rounded bg-gray-300'></div>
                  <div className='h-2 w-20 rounded bg-gray-300'></div>
                </td>

                {/*fecha */}
                <td className='px-6 py-4'>
                  <div className='h-3 w-16 rounded bg-gray-300'></div>
                </td>

                {/* acciones */}
                <td className='flex gap-2 px-6 py-4'>
                  <div className='h-6 w-20 rounded bg-gray-300'></div>
                  <div className='h-6 w-20 rounded bg-gray-300'></div>
                  <div className='h-6 w-20 rounded bg-gray-300'></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Skeleton para moviles*/}
      <div className='flex animate-pulse flex-col gap-6 px-4 py-6 md:hidden'>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className='flex flex-col rounded-2xl border border-gray-200 bg-white/50 p-6 shadow-md backdrop-blur-md'>
              <div className='flex items-center gap-3'>
                <div className='h-12 w-12 rounded-full bg-gray-300'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-4 w-32 rounded bg-gray-300'></div>
                  <div className='h-3 w-16 rounded bg-gray-300'></div>
                </div>
              </div>
              <div className='mt-4 space-y-1'>
                <div className='h-3 w-24 rounded bg-gray-300'></div>
                <div className='h-2 w-20 rounded bg-gray-300'></div>
                <div className='h-2 w-16 rounded bg-gray-300'></div>
              </div>
              <div className='mt-4 flex gap-2'>
                <div className='h-6 w-20 rounded bg-gray-300'></div>
                <div className='h-6 w-20 rounded bg-gray-300'></div>
                <div className='h-6 w-20 rounded bg-gray-300'></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
