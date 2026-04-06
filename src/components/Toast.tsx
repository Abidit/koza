import { AnimatePresence, motion } from 'framer-motion'

interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.34, 1.15, 0.64, 1] }}
          style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#1E40AF',
            borderRadius: '10px',
            padding: '11px 14px',
            fontSize: '13px',
            width: '100%',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
