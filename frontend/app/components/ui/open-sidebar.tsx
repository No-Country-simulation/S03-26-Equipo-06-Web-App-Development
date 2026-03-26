
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react';

interface typeProps{
    open:boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ButtonSidebar({ open, setOpen }: typeProps) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className='relative h-6 w-6'
      
    >
      <AnimatePresence initial={false} mode='wait'>
        {open ? (
          <motion.div
            key='x'
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.6 }}
            className='absolute top-0 left-0'
          >
            <X aria-label={'Cerrar'} className='h-6 w-6 cursor-pointer' />
          </motion.div>
        ) : (
          <motion.div
            key='menu'
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.6 }}
            className='absolute top-0 left-0'
          >
            <Menu aria-label={'Abrir'} className='h-6 w-6 cursor-pointer' />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
