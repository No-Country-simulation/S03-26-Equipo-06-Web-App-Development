'use client'
import { Trash2, Edit, Eye } from 'lucide-react'
import { Testimonio } from '@/types/testimonio'
import Image from 'next/image'
import VideoModalDashboard from '../modal-video/modal-dashboard'
import { ExpandableTextDashboard } from '../ui/expanded-card-dashboard'
import { getEstadoColor } from '@/utils/estilos'
import { PlayCircle } from 'lucide-react'
import BotoneraDashboard from '../botonera-dashboard/botonera'

type Props = {
  testimonios: Testimonio[]
  handleDelete?: (id: number) => void
  handleEdit?: (id: number) => void
  handleView?: (id: number) => void
  videoActivo: string | null
  setVideoActivo: (url: string | null) => void
  getYoutubeThumbnail: (url: string) => string
  getYoutubeEmbed: (url?: string | null) => string | null
}

export function TestimonialCardDashboard({ testimonios, videoActivo, setVideoActivo, getYoutubeThumbnail, getYoutubeEmbed }: Props) {
  return (
    <>
      <div className='mt-15 mb-35 max-h-125 overflow-x-auto overflow-y-auto'>
        {/* TABLA */}
        <table className='m-auto hidden table-auto border-collapse rounded-xl bg-white/30 shadow-md backdrop-blur-md md:ml-25 md:table md:max-w-170 lg:m-auto lg:max-w-5xl'>
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
            {testimonios.map(testimonio => (
              <tr key={testimonio.id} className='border-b border-gray-200 transition hover:bg-gray-50'>
                {/*auor-video-contenido*/}
                <td className='px-4 py-4 align-middle'>
                  <div className='flex items-center justify-end gap-3'>
                    {/*video*/}
                    <div
                      onClick={() => testimonio.video_url && setVideoActivo(testimonio.video_url)}
                      className='relative h-17 w-25 shrink-0 cursor-pointer overflow-hidden rounded border border-gray-300'
                    >
                      <Image
                        src={
                          testimonio.video_url
                            ? getYoutubeThumbnail(testimonio.video_url)
                            : testimonio.imagen_url && testimonio.imagen_url.trim() !== ''
                              ? testimonio.imagen_url
                              : '/testimoniales.webp'
                        }
                        alt={testimonio.titulo}
                        className='h-17 w-25 bg-gray-700 object-cover'
                        height={44}
                        width={44}
                      />
                      {/*over-play*/}
                      {testimonio.video_url && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                          <div className='flex items-center justify-center text-white'>
                            <PlayCircle className='h-6 w-6' />
                          </div>
                        </div>
                      )}
                    </div>

                    {/*titulo*/}
                    <div className='flex flex-col'>
                      <span className='font-medium text-gray-900'>{testimonio.titulo}</span>

                      <div className='mt-1 max-w-42.5'>
                        <ExpandableTextDashboard content={testimonio.contenido} />
                      </div>
                    </div>
                  </div>
                </td>
                {/*estado*/}
                <td className='px-1 py-4 text-center'>
                  <span className={`rounded-md px-2 py-1 border text-sm font-medium ${getEstadoColor(testimonio.estado)}`}>{testimonio.estado}</span>
                </td>
                {/*categoria*/}
                <td className='py-4 text-sm text-gray-700 text-center'>
                  <div>
                    {/*consultar  <span><p className='text-black'>{testimonio.autor}</p></span>*/}
                    <span className='font-medium'>Categoría: </span>
                    {testimonio.categoria}
                  </div>
                  {testimonio.tags.length > 0 && <div className='w-40 text-xs text-gray-500'>Tags: {testimonio.tags.join(', ')}</div>}
                </td>
                {/*fecha*/}
                <td className='px-4 py-4 text-sm text-gray-500'>{testimonio.fecha_creacion}</td>
                {/*acciones*/}
                <td className='px-4 py-4 align-middle'>
                  <BotoneraDashboard testimonio={testimonio}  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*movil*/}
        <div className='flex flex-col gap-6 px-4 py-6 md:hidden'>
          {testimonios.map(testimonio => (
            <div
              key={testimonio.id}
              className='relative mr-2 ml-15 flex min-w-100 flex-col rounded-2xl border border-gray-200 bg-white/50 p-4 shadow-md backdrop-blur-md transition hover:scale-[1.02] hover:shadow-xl'
            >
              {/*estado*/}
              <span className={`absolute top-4 right-4 rounded-md border px-2 py-1 text-xs font-medium ${getEstadoColor(testimonio.estado)}`}>
                {testimonio.estado}
              </span>

              {/*video*/}
              <div
                onClick={() => testimonio.video_url && setVideoActivo(testimonio.video_url)}
                className='relative h-16 w-28 cursor-pointer overflow-hidden rounded-md border border-gray-500/40'
              >
                <Image
                  src={
                    testimonio.video_url
                      ? getYoutubeThumbnail(testimonio.video_url)
                      : testimonio.imagen_url && testimonio.imagen_url.trim() !== ''
                        ? testimonio.imagen_url
                        : '/testimoniales.webp'
                  }
                  alt={testimonio.titulo}
                  className='h-full w-full bg-gray-700 object-cover'
                  height={64}
                  width={112}
                />

                {testimonio.video_url && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full text-white'>
                      <PlayCircle />
                    </div>
                  </div>
                )}
              </div>

              {/*titulo*/}
              <h2 className='mt-2 font-medium text-gray-900'>{testimonio.titulo}</h2>

              {/*info*/}
              <div className='mt-2 text-sm text-gray-700'>
                <div>
                  <span className='font-medium'>Categoría: </span>
                  {testimonio.categoria}
                </div>

                {testimonio.tags.length > 0 && <div className='text-xs text-gray-500'>Tags: {testimonio.tags.join(', ')}</div>}

                {/*contenido*/}
                <div className='mt-1'>
                  <ExpandableTextDashboard content={testimonio.contenido} />
                </div>
              </div>

              {/*fecha*/}
              <span className='absolute right-4 bottom-4 text-xs text-gray-400'>{testimonio.fecha_creacion}</span>

              {/*botones*/}
              <div className='mt-3 flex flex-wrap gap-2'>
                <button
                  onClick={() => testimonio.video_url && setVideoActivo(testimonio.video_url)}
                  className='flex items-center gap-1 rounded-md border border-blue-400 bg-blue-100 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-200'
                >
                  <Eye className='h-4 w-4' /> Ver
                </button>

                <button className='flex items-center gap-1 rounded-md border border-green-400 bg-green-100 px-3 py-1 text-sm text-green-700 transition hover:bg-green-200'>
                  <Edit className='h-4 w-4' /> Editar
                </button>

                <button className='flex items-center gap-1 rounded-md border border-red-400 bg-red-100 px-3 py-1 text-sm text-red-700 transition hover:bg-red-200'>
                  <Trash2 className='h-4 w-4' /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*modal*/}
      {videoActivo && <VideoModalDashboard videoActivo={videoActivo} setVideoActivo={setVideoActivo} getYoutubeEmbed={getYoutubeEmbed} />}
    </>
  )
}
