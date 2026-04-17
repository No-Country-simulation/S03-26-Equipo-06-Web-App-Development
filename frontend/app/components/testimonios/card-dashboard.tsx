'use client'
import { Trash2, Edit, Eye } from 'lucide-react'
import { Testimonio } from '@/types/nuevo-testimonio'
import Image from 'next/image'
import VideoModalDashboard from '../modal-video/modal-dashboard'
import { ExpandableTextDashboard } from '../ui/expanded-card-dashboard'
import { getEstadoColor } from '@/utils/estilos'
import { PlayCircle } from 'lucide-react'
import BotoneraDashboard from '../botonera-dashboard/botonera'
import { useRouter } from 'next/navigation'
import { EditForm } from '@/types/editar-testimonio'
import { getCategoriaStyle } from '@/utils/estilos'

type Props = {
  testimonios: Testimonio[]
  handleDelete?: (id: number) => void
  handleEdit?: (id: number) => void
  handleView?: (id: number) => void
  videoActivo: string | null
  setVideoActivo: (url: string | null) => void
  getYoutubeThumbnail: (url: string) => string
  getYoutubeEmbed: (url?: string | null) => string | null
  setOpenModal: (value: boolean) => void
  setSelectedId: (id: number) => void
  editId: number | null
  setEditId: (id: number | null) => void
  editForm: EditForm
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
}
export function TestimonialCardDashboard({
  setOpenModal,
  setSelectedId,
  testimonios,
  videoActivo,
  setVideoActivo,
  getYoutubeThumbnail,
  getYoutubeEmbed,
  setEditId,
  setEditForm,
  setOpenEditModal,
}: Props) {
  const router = useRouter()

  return (
    <>
      <div className='mt-2 max-h-125 min-h-screen overflow-x-auto overflow-y-auto pb-15'>
        {/* TABLA */}
        <table className='m-auto hidden table-auto border-collapse rounded-xl bg-white/30 shadow-md backdrop-blur-md md:ml-23 md:table md:w-[87%] md:max-w-none lg:ml-23 lg:w-[89%]'>
          <thead>
            <tr className='border-b border-gray-300 bg-gray-300/50'>
              <th className='w-[40%] px-6 py-3 text-left text-sm font-semibold text-gray-700'>Publicaciones</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Categoría / Tags</th>
              <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>Fecha</th>
              <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700'>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {testimonios.length === 0 ? (
              <tr>
                <td colSpan={4} className='py-16 text-center'>
                  <div className='flex flex-col items-center justify-center text-gray-500'>
                    {/* icono opcional */}
                    <svg className='mb-3 h-10 w-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 13h6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v16a2 2 0 01-2 2z'
                      />
                    </svg>

                    <p className='text-lg font-semibold'>No hay publicaciones</p>
                    <p className='text-sm text-gray-400'>Aún no se han cargado testimonios</p>
                  </div>
                </td>
              </tr>
            ) : (
              testimonios.reverse().map(testimonio => {
                const estadoUI = getEstadoColor(testimonio.estado || '')

                return (
                  <tr key={testimonio.id_testimonio} className='border-b border-gray-200 transition hover:bg-gray-50'>
                    {/* PUBLICACION */}
                    <td className='px-4 py-4 align-middle'>
                      <div className='flex gap-3'>
                        <div
                          onClick={() => testimonio.video_url && setVideoActivo(testimonio.video_url)}
                          className='relative h-17 w-25 shrink-0 cursor-pointer overflow-hidden rounded border border-gray-300'
                        >
                          <Image
                            src={
                              testimonio.video_url
                                ? getYoutubeThumbnail(testimonio.video_url)
                                : testimonio.imagen_url?.trim()
                                  ? testimonio.imagen_url
                                  : '/testimoniales.webp'
                            }
                            alt={testimonio.titulo || ''}
                            className='h-17 w-25 object-cover'
                            height={44}
                            width={44}
                          />

                          {testimonio.video_url && (
                            <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                              <PlayCircle className='h-6 w-6 text-white' />
                            </div>
                          )}
                        </div>

                        <div className='flex flex-col'>
                          <span className='font-medium text-gray-900'>{testimonio.titulo ?? 'Sin título'}</span>

                          <div className='mt-1 max-w-42.5'>
                            <ExpandableTextDashboard content={testimonio.contenido || ''} />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORIA */}
                    <td className='py-4 text-center text-sm text-gray-700'>
                      <div>
                        <p className='font-medium'>Categoría:</p>

                        <span
                          className={`mt-1 inline-block rounded border px-2 py-1 text-xs font-medium ${getCategoriaStyle(
                            testimonio.categoria?.nombre
                          )}`}
                        >
                          {testimonio.categoria?.nombre ?? 'Sin categoría'}
                        </span>
                      </div>
                    </td>

                    {/* FECHA */}
                    <td className='px-4 py-4 text-sm text-gray-500'>
                      {testimonio.fecha_creacion ? new Date(testimonio.fecha_creacion).toLocaleDateString() : '-'}
                    </td>

                    {/* ACCIONES */}
                    <td className='px-4 py-4 align-middle'>
                      <div className='relative flex flex-col items-center gap-2'>
                        <span className='absolute top-[-25] right-1 flex h-10 w-10 items-center justify-center rounded-full'>{estadoUI.icon}</span>

                        <BotoneraDashboard
                          testimonio={testimonio}
                          setOpenModal={setOpenModal}
                          setSelectedId={setSelectedId}
                          setEditId={setEditId}
                          setEditForm={setEditForm}
                          setOpenEditModal={setOpenEditModal}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* MOBILE */}
        <div className='flex flex-col gap-6 px-6 py-6 md:hidden'>
          {testimonios.map(testimonio => {
            const estadoUI = getEstadoColor(testimonio.estado || '')
            return (
              <div
                key={testimonio.id_testimonio}
                className='relative mx-auto flex w-full flex-col rounded-2xl border border-gray-200 bg-white/50 p-4 shadow-md backdrop-blur-md transition hover:scale-[1.02] hover:shadow-xl'
              >
                {/* ESTADO */}
                <span className={`absolute top-4 right-4 flex gap-1 rounded-md border px-2 py-1 text-xs font-medium ${estadoUI.className}`}>
                  {estadoUI.icon}
                </span>

                {/* VIDEO */}
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
                    alt={testimonio.titulo || ''}
                    className='h-full w-full bg-gray-700 object-cover'
                    height={64}
                    width={112}
                  />

                  {testimonio.video_url && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                      <PlayCircle className='text-white' />
                    </div>
                  )}
                </div>

                {/* TITULO */}
                <h2 className='mt-2 font-medium text-gray-900'>{testimonio.titulo ?? 'Sin título'}</h2>

                {/* INFO */}
                <div className='mt-2 text-sm text-gray-700'>
                  <div>
                    <span className='font-medium'>Categoría: </span>
                    {testimonio.categoria?.nombre ?? 'Sin categoría'}
                  </div>

                  {/* CONTENIDO */}
                  <div className='mt-1'>
                    <ExpandableTextDashboard content={testimonio.contenido || ''} />
                  </div>
                </div>
                <div>
                  <span className='font-medium'>Categoría: </span>

                  <span
                    className={`ml-1 inline-block rounded border px-2 py-1 text-xs font-medium ${getCategoriaStyle(testimonio.categoria?.nombre)}`}
                  >
                    {testimonio.categoria?.nombre ?? 'Sin categoría'}
                  </span>
                </div>
                {/* FECHA */}
                <span className='absolute right-4 bottom-4 text-xs text-gray-400'>
                 Publicado {testimonio.fecha_creacion ? new Date(testimonio.fecha_creacion).toLocaleDateString() : '-'}
                </span>

                {/* BOTONES */}
                <div className='mt-3 flex gap-2'>
                  <button
                    onClick={() => router.push(`/testimonios/${testimonio.id_testimonio}`)}
                    className='flex items-center gap-1 rounded-md border border-blue-400 bg-blue-100 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-200'
                  >
                    <Eye className='h-4 w-4' /> Ver
                  </button>

                  <button
                    onClick={() => {
                      setEditId(testimonio.id_testimonio)
                      setEditForm({
                        titulo: testimonio.titulo || '',
                        contenido: testimonio.contenido || '',
                        categoria: testimonio.categoria?.id ?? 0,
                        imagen_url: testimonio.imagen_url || '',
                        video_url: testimonio.video_url || '',
                        estado: testimonio.estado || 'pendiente',
                      })
                      setOpenEditModal(true)
                    }}
                    className='flex items-center gap-1 rounded-md border border-green-400 bg-green-100 px-3 py-1 text-sm text-green-700 transition hover:bg-green-200'
                  >
                    <Edit className='h-4 w-4' /> Editar
                  </button>

                  <button
                    onClick={() => {
                      setSelectedId(testimonio.id_testimonio!)
                      setOpenModal(true)
                    }}
                    className='flex items-center gap-1 rounded-md border border-red-400 bg-red-100 px-3 py-1 text-sm text-red-700 transition hover:bg-red-200'
                  >
                    <Trash2 className='h-4 w-4' /> Eliminar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* MODAL */}
      {videoActivo && <VideoModalDashboard videoActivo={videoActivo} setVideoActivo={setVideoActivo} getYoutubeEmbed={getYoutubeEmbed} />}
    </>
  )
}
