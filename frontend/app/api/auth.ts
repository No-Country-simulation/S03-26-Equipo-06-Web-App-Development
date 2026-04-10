export type AuthLogin = {
  correo: string
  password: string
}

export type AuthRegistro = {
  nombre: string
  correo: string
  password: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function Ingresar({ correo, password }: AuthLogin) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password }),
  })

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  return res.json()
}

export async function Registrar({ nombre, correo, password }: AuthRegistro) {
  const res = await fetch(`${API_URL}/api/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, password }),
  })

  if (!res.ok) {
    throw new Error('Error al registrar usuario');
  }

  return res.json();
}
