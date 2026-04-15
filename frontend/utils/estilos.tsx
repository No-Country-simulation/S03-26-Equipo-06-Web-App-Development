
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export const getEstadoColor = (estado: string) => {
  switch (estado?.toLowerCase()) {
    case 'publicado':
    case 'aprobado':
      return {
        label: 'Aprobado',
        icon: <CheckCircle className='h-4 w-4 text-green-600' />,
        className: 'bg-green-100 text-green-700 border-green-300'
      }

    case 'pendiente':
      return {
        label: 'Pendiente',
        icon: <Clock className='h-4 w-4 text-yellow-600' />,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-300'
      }

    case 'rechazado':
      return {
        label: 'Rechazado',
        icon: <XCircle className='h-4 w-4 text-red-600' />,
        className: 'bg-red-100 text-red-700 border-red-300'
      }

    default:
      return {
        label: 'Sin estado',
        icon: <Clock className='h-4 w-4 text-gray-600' />,
        className: 'bg-gray-100 text-gray-700 border-gray-300'
      }
  }
}