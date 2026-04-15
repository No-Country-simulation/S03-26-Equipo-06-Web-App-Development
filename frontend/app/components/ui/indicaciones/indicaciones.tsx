import {  CheckCircle, Clock, XCircle } from 'lucide-react'
export function Indicaciones() {
  return (
    <div className='mt-15 ml-8 flex flex-wrap items-center gap-4 text-xs text-gray-600 md:ml-25'>
      <div className='flex items-center gap-1'>
        <CheckCircle className='h-4 w-4 text-green-600' />
        <span>Aprobado / Publicado</span>
      </div>

      <div className='flex items-center gap-1'>
        <Clock className='h-4 w-4 text-yellow-600' />
        <span>Pendiente de revisión</span>
      </div>

      <div className='flex items-center gap-1'>
        <XCircle className='h-4 w-4 text-red-600' />
        <span>Rechazado</span>
      </div>
    </div>
  )
}
