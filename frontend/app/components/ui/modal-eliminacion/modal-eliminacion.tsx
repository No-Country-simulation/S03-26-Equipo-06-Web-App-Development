type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export default function ModalConfirmacion({ isOpen, onClose, onConfirm, loading }: Props) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 backdrop-blur-sm'>
      <div className='w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg'>
        <h2 className='text-lg font-semibold text-gray-800'>¿Eliminar testimonio?</h2>
        <p className='mt-2 text-sm text-gray-600'>Esta acción no se puede deshacer.</p>
        <div className='mt-6 flex justify-end gap-3'>
          <button onClick={onClose} className='rounded-md border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100'>
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-md px-4 py-2 text-sm text-white ${loading ? 'bg-red-300' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
