export default function CardTestimonioSkeleton() {
  return (
    <div className='mt-16 mb-20 w-full max-w-5xl px-4 sm:px-6 mx-auto'>
      <div className='animate-pulse rounded-2xl border border-gray-200 bg-white/50 p-4 mx-6 sm:mx-0 shadow-md sm:p-6'>
        {/* HEADER */}
        <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div className='space-y-2'>
            <div className='h-6 w-3/4 rounded bg-gray-300'></div>
            <div className='h-4 w-1/2 rounded bg-gray-200'></div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className='flex flex-col gap-6 md:flex-row'>
          {/* VIDEO / IMAGEN */}
          <div className='w-full md:w-1/2'>
            <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-gray-300'></div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className='flex w-full flex-col justify-between md:w-1/2'>
            {/* TEXTO */}
            <div className='space-y-2'>
              <div className='h-3 w-full rounded bg-gray-200'></div>
              <div className='h-3 w-5/6 rounded bg-gray-200'></div>
              <div className='h-3 w-2/3 rounded bg-gray-200'></div>
            </div>

            {/* FILA FINAL */}
            <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
              {/* IZQUIERDA */}
              <div className='space-y-2'>
                <div className='h-4 w-1/3 rounded bg-gray-300'></div>
                <div className='flex flex-wrap gap-2'>
                  <div className='h-6 w-16 rounded-full bg-gray-200'></div>
                  <div className='h-6 w-16 rounded-full bg-gray-200'></div>
                  <div className='h-6 w-16 rounded-full bg-gray-200'></div>
                </div>
              </div>

              {/* DERECHA */}
              <div className='h-3 w-20 rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}