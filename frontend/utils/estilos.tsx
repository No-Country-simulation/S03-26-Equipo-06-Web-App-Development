export const getEstadoColor = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'publicado':
      return 'bg-green-100 text-green-700 border-green-300'
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    case 'rechazado':
      return 'bg-red-100 text-red-700 border-red-300'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-500'
  }
}
