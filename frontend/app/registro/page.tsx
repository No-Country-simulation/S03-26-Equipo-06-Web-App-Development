'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { Registrar } from '@/app/api/auth'
import { User, Mail, Lock, UserPlus } from 'lucide-react'
import { toast } from 'react-toastify'

export default function RegistroForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ nombre: '', correo: '', password: '', rol: 'UsuarioRegistrado' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.password) {
      toast.error('Todos los campos son obligatorios!');
      return
    }
    try {
      const data = await Registrar(form);
      login(data.token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Error inesperado');
      }
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[url('/testimoniales.webp')] bg-size-[28%] bg-no-repeat px-4">
      <form onSubmit={handleSubmit} className='relative z-10 w-full max-w-md rounded-xl border border-gray-200 bg-white p-8'>
        <h2 className='mb-6 text-center text-2xl font-semibold text-gray-800'>Registro</h2>
        {/*nombre*/}
        <div className='mb-4 flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-600'>Nombre</label>
          <div className='relative'>
            <User className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' size={18} />
            <input
              type='text'
              placeholder='Tu nombre'
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              className='w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              required
            />
          </div>
        </div>
        {/*correo*/}
        <div className='mb-4 flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-600'>Correo electrónico</label>
          <div className='relative'>
            <Mail className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' size={18} />
            <input
              type='email'
              placeholder='tu@email.com'
              value={form.correo}
              onChange={e => setForm({ ...form, correo: e.target.value })}
              className='w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              required
            />
          </div>
        </div>
        {/*contrasña*/}
        <div className='mb-6 flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-600'>Contraseña</label>
          <div className='relative'>
            <Lock className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' size={18} />
            <input
              type='password'
              placeholder='••••••••'
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className='w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]'
        >
          <UserPlus size={18} />
          Registrarse
        </button>
        <p className='mt-5 text-center text-sm text-gray-500'>
          ¿Ya tienes cuenta?
          <span onClick={() => router.push('/ingresar')} className='cursor-pointer text-blue-600 hover:underline'>
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  )
}
