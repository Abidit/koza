import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Callout from '../components/Callout'

interface Props {
  flaggedConcepts: string[]
}

export default function CompleteScreen({ flaggedConcepts }: Props) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
      }}
    >
      <div className="container container-xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Check animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <motion.path
              d="M6 14l5.5 5.5L22 8"
              stroke="#166534"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        {/* Title */}
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 500,
            color: '#0F172A',
            letterSpacing: '-0.4px',
            margin: '0 0 8px',
          }}
        >
          Module done.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '14px',
            color: '#475569',
            lineHeight: 1.65,
            margin: '0 0 28px',
            maxWidth: '320px',
          }}
        >
          Course adapted to your signals — every tap shaped what came next.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            marginBottom: '28px',
          }}
        >
          {[
            { label: 'Pages', value: '4' },
            { label: 'Minutes', value: '22' },
            { label: 'Score', value: '87%' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                backgroundColor: '#F1F5F9',
                borderRadius: '10px',
                padding: '14px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 4px' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '22px', fontWeight: 500, color: '#0F172A', margin: 0 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Adaptive note */}
        {flaggedConcepts.length > 0 && (
          <div style={{ width: '100%', marginBottom: '28px' }}>
            <Callout
              text="You asked for more on this module — added a 2-min recap to the start of module 5."
              variant="info"
            />
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <Button
            label="Continue to module 5"
            variant="primary"
            fullWidth
            onClick={() => navigate('/path')}
          />
          <Button
            label="Take a break"
            variant="ghost"
            fullWidth
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  )
}
