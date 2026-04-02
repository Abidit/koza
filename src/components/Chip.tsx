import { motion, useAnimation } from 'framer-motion'

interface ChipProps {
  label: string
  variant: 'primary' | 'secondary'
  selected: boolean
  onClick: () => void
}

export default function Chip({ label, variant, selected, onClick }: ChipProps) {
  const controls = useAnimation()

  const handleClick = () => {
    controls.start({
      scale: [1, 0.96, 1.02, 1.0],
      transition: { duration: 0.2, times: [0, 0.33, 0.67, 1.0] },
    })
    onClick()
  }

  if (variant === 'primary') {
    return (
      <motion.button
        animate={controls}
        onClick={handleClick}
        style={{
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          fontWeight: 500,
          fontSize: '13px',
          height: '48px',
          minHeight: '44px',
          padding: '0 20px',
          borderRadius: '12px',
          width: '100%',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          appearance: 'none',
        }}
      >
        {label}
      </motion.button>
    )
  }

  return (
    <motion.button
      animate={controls}
      onClick={handleClick}
      style={{
        backgroundColor: selected ? '#EFF6FF' : '#FFFFFF',
        border: selected ? '1.5px solid #93C5FD' : '1px solid #E2E8F0',
        color: selected ? '#1E40AF' : '#475569',
        fontWeight: selected ? 500 : 400,
        fontSize: '13px',
        height: '40px',
        minHeight: '44px',
        padding: '0 16px',
        borderRadius: '9999px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        appearance: 'none',
      }}
    >
      {label}
    </motion.button>
  )
}
