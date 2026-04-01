import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
interface Props {
  scroll: (direction: 'left' | 'right') => void
}
export default function BotonCarrusel({ scroll }: Props) {
  return (
    <>
      <button onClick={() => scroll('left')} className='absolute bottom-0 left-0 z-10 -translate-y-1/2 cursor-pointer rounded text-blue-500'>
        <CircleArrowLeft className='h-7 w-7' />
      </button>

      <button onClick={() => scroll('right')} className='absolute right-0 bottom-0 z-10 -translate-y-1/2 cursor-pointer rounded text-blue-500'>
        <CircleArrowRight className='h-7 w-7' />
      </button>
    </>
  )
}
