'use client'
import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { UsersPageSkeleton } from '@/app/components/ui/skeletors/skeletor-usuarios'

interface Usuario {
  id: number
  nombre: string
  rol: string
}
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Roles() {
  const router = useRouter()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/users`, {
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'Error al traer usuarios')
        }

        const json = await res.json()
        const data: Usuario[] = json.data ?? []
    

        setUsuarios(data)
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar usuarios')
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  if (loading) {
    return <UsersPageSkeleton />
  }

  // filtro por nombre
  const usuariosFiltrados = usuarios.filter(user => user.nombre.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='mb-9 min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-5'>
      {/*header*/}
      <button
        onClick={() => router.back()}
        className='absolute top-24 right-14 cursor-pointer rounded-md p-2 text-slate-500 transition hover:bg-slate-200'
      >
        <Undo2 />
      </button>
      <div className='flex items-center justify-between p-10 md:ml-15'>
        <h1 className='text-3xl font-semibold text-slate-700'>Usuarios Registrados</h1>
      </div>

      {/*input*/}
      <div className='mx-auto mb-8 max-w-md'>
        <input
          type='text'
          placeholder='Buscar usuario...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400'
        />
      </div>

      {/*grid*/}
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:px-10 lg:grid-cols-3'>
        {usuarios.length === 0 ? (
          <p className='col-span-full text-center text-slate-500'>No hay usuarios cargados</p>
        ) : usuariosFiltrados.length === 0 ? (
          <p className='col-span-full text-center text-slate-500'>No hay coincidencias con &quot;{search}&quot;</p>
        ) : (
          usuariosFiltrados.map(user => {
            const isAdmin = user.rol.toLowerCase().includes('admin')
            const isEditor = user.rol.toLowerCase().includes('editor')

            return (
              <div
                key={user.id}
                className='rounded-2xl border border-slate-200 bg-linear-to-br from-white via-slate-50 to-slate-100 p-6 shadow-sm transition hover:from-white hover:to-slate-200 hover:shadow-md'
              >
                <div className='mt-1 mb-6 space-y-3'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-slate-700'>{user.nombre}</p>

                    <span className='rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>{user.rol}</span>
                  </div>
                </div>

                {isAdmin ? (
                  <div className='text-sm font-medium text-red-400'>Admin</div>
                ) : (
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-500'>{isEditor ? 'Editor activo' : 'Usuario registrado'}</span>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
