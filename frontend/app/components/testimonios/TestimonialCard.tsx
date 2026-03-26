import { Testimonio } from '@/types/testimonio'
import Image from 'next/image'
import { ExpandableText } from '../ui/expanded-card'
type Props = {
  data: Testimonio[]
}

export function TestimonialCard({ data }: Props) {
  const getCategoryStyle = (categoria: Testimonio['categoria']) => {
    switch (categoria) {
      case 'Bootcamp':
        return 'bg-blue-100 text-blue-600 border-blue-300'
      case 'Producto':
        return 'bg-green-100 text-green-600 border-green-300'
      case 'Evento':
        return 'bg-purple-100 text-purple-600 border-purple-300'
      case 'Cliente':
        return 'bg-orange-100 text-orange-600 border-orange-300'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300'
    }
  }

  return (
    <div className='ml-17 grid grid-cols-1 gap-6 sm:ml-25 sm:grid-cols-2 lg:ml-10 lg:grid-cols-3 lg:gap-2'>
      {data.map(item => (
        <div
          key={item.id}
          className='relative mb-10 flex w-78 flex-col rounded-2xl border border-gray-200/30 bg-white/30 p-5 shadow-sm backdrop-blur-lg transition-all duration-300 hover:shadow-md md:w-80 lg:ml-10 lg:w-84'
        >
          {/* imagen*/}
          <div className='absolute -top-8'>
            <Image
              src={item.imagen_url || 'https://via.placeholder.com/100'}
              alt={item.titulo}
              className={`h-20 w-20 rounded-full border-2 ${getCategoryStyle(item.categoria)} object-cover shadow-sm`}
              height={80}
              width={80}
              loading='lazy'
            />
          </div>

          {/*nombe y categoría*/}
          <p className='absolute top-6 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-800'>
            {item.categoria}
          </p>
          <span
            className={`absolute top-3 right-4 rounded-full px-3 py-1 text-xs font-semibold ${getCategoryStyle(
              item.categoria
            )}`}
          >
            {item.categoria}
          </span>

          <span className='absolute right-4 bottom-3 mt-1 text-xs text-gray-400'>
            {item.fecha_creacion}
          </span>

          {/*contenido*/}
          <div className='mt-15 w-full'>
            <ExpandableText content={item.contenido} />
          </div>
        </div>
      ))}
    </div>
  )
}
