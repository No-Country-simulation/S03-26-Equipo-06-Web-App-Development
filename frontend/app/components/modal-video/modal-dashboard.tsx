'use client'
import { X } from 'lucide-react'
type Props = {
  videoActivo: string | null
  setVideoActivo: (url: string | null) => void
  getYoutubeEmbed: (url?: string | null) => string | null
}

export default function VideoModalDashboard({ videoActivo, setVideoActivo, getYoutubeEmbed }: Props) {
  if (!videoActivo) return null
  const embedUrl = getYoutubeEmbed(videoActivo)

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'>
      <div className='relative w-[90%] max-w-3xl rounded-lg border shadow-blue-500 border-white'>
         {/* cerrar */}
        <button
          onClick={() => setVideoActivo(null)}
          className='absolute -top-10 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70'
          aria-label='Cerrar video'
        >
          <X className='h-5 w-5' />
        </button>
        {/* video */}
        <div className='aspect-video w-full'>
          {embedUrl ? (
            <iframe src={embedUrl} className='h-full w-full rounded-lg' allowFullScreen />
          ) : (
            <p className='flex h-full items-center justify-center text-sm text-gray-500'>Video no disponible</p>
          )}
        </div>
      </div>
    </div>
  )
}
