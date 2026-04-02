import { motion } from 'framer-motion'

interface ButtonProps {
  label: string
  variant: 'primary' | 'ghost'
  onClick: () => void
  fullWidth: boolean
}

export default function Button({ label, variant, onClick, fullWidth }: ButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      style={{
        backgroundColor: isPrimary ? '#0F172A' : 'transparent',
        color: isPrimary ? '#F8FAFC' : '#0F172A',
        border: isPrimary ? 'none' : '1px solid #E2E8F0',
        fontWeight: 500,
        fontSize: '14px',
        height: '48px',
        minHeight: '44px',
        borderRadius: '12px',
        padding: '0 24px',
        width: fullWidth ? '100%' : 'auto',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        appearance: 'none',
      }}
    >
      {label}
    </motion.button>
  )
}
