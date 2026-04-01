import { ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react'
interface Props {
  scroll: (direction: 'left' | 'right') => void
}
export default function BotonCarrusel({ scroll }: Props) {
  return (
    <>
      <button onClick={() => scroll('left')} className='cursor-pointer absolute bottom-0 left-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100'>
        <ArrowLeftFromLine className='h-6 w-6' />
      </button>

      <button
        onClick={() => scroll('right')}
        className='cursor-pointer absolute right-0 bottom-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100'
      >
        <ArrowRightFromLine className='h-6 w-6' />
      </button>
    </>
  )
}
