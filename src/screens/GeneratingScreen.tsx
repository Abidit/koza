import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'

type StepState = 'done' | 'active' | 'todo'

const INITIAL_STEPS: StepState[] = ['done', 'done', 'active', 'todo', 'todo']

const STEP_LABELS = [
  'Analysing your level',
  'Scoping 2-hour curriculum',
  'Structuring 8 modules',
  'Writing page content',
  'Preparing sandbox',
]

export default function GeneratingScreen() {
  const navigate = useNavigate()
  const [steps, setSteps] = useState<StepState[]>(INITIAL_STEPS)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => {
      setSteps(['done', 'done', 'done', 'active', 'todo'])
    }, 900)
    const t2 = setTimeout(() => {
      setSteps(['done', 'done', 'done', 'done', 'active'])
    }, 1800)
    const t3 = setTimeout(() => {
      setSteps(['done', 'done', 'done', 'done', 'done'])
    }, 2700)
    const t4 = setTimeout(() => {
      setDone(true)
    }, 3200)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="container container-xs">
        {/* Header */}
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 500,
            color: '#0F172A',
            textAlign: 'center',
            margin: '0 0 8px',
            transition: 'all 300ms',
          }}
        >
          {done ? 'Your course is ready.' : 'Building your Git and GitHub course'}
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#475569',
            textAlign: 'center',
            margin: '0 0 40px',
          }}
        >
          {done
            ? 'Tap below to review your path'
            : 'Personalising for someone with some basics — 2 hours'}
        </p>

        {/* Steps */}
        <div>
          {STEP_LABELS.map((label, i) => {
            const state = steps[i]
            return (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 0',
                  borderBottom: i < 4 ? '0.5px solid #E2E8F0' : 'none',
                }}
              >
                {/* Dot */}
                <motion.div
                  animate={
                    state === 'active'
                      ? { scale: [0.85, 1.0, 0.85], backgroundColor: '#1E40AF' }
                      : state === 'done'
                        ? { scale: 1, backgroundColor: '#166534' }
                        : { scale: 1, backgroundColor: '#E2E8F0' }
                  }
                  transition={
                    state === 'active'
                      ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.3 }
                  }
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                {/* Label */}
                <span
                  style={{
                    fontSize: '13px',
                    color: state === 'done' ? '#0F172A' : '#94A3B8',
                    fontWeight: state === 'done' ? 500 : 400,
                    transition: 'color 300ms, font-weight 300ms',
                  }}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>

        {/* CTA appears after done */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '32px' }}
            >
              <Button
                label="See my course →"
                variant="primary"
                fullWidth
                onClick={() => navigate('/path')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
