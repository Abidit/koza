import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Chip from '../components/Chip'

const TIME_OPTIONS = [
  { value: '30 min', label: '30 min', desc: 'Quick concept' },
  { value: '1 hour', label: '1 hour', desc: 'Solid foundation' },
  { value: '2 hours', label: '2 hours', desc: 'Build something' },
  { value: '4 hours', label: '4 hours', desc: 'Deep dive' },
]

const LEVELS = ['complete beginner', 'some basics', 'intermediate']

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  color: '#94A3B8',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  fontFamily: 'Inter, sans-serif',
  marginBottom: '8px',
  display: 'block',
}

export default function IntentScreen() {
  const navigate = useNavigate()
  const [topic, setTopic] = useState('Git and GitHub')
  const [level, setLevel] = useState('some basics')
  const [duration, setDuration] = useState('2 hours')
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="container container-xs" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top wordmark */}
        <div style={{ paddingTop: '20px' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>koza.</span>
        </div>

        {/* Centered content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingBottom: '40px',
          }}
        >
        {/* Greeting */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 500,
            color: '#0F172A',
            letterSpacing: '-0.6px',
            margin: '0 0 8px',
          }}
        >
          Good morning, Abidit.
        </h1>
        <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 32px' }}>
          What do you want to learn today?
        </p>

        {/* Topic input */}
        <label style={labelStyle}>Topic</label>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          style={{
            width: '100%',
            height: '48px',
            border: `1px solid ${inputFocused ? '#1E40AF' : '#E2E8F0'}`,
            borderRadius: '12px',
            padding: '0 16px',
            fontSize: '15px',
            color: '#0F172A',
            backgroundColor: '#FFFFFF',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'Inter, sans-serif',
            transition: 'border-color 150ms',
          }}
        />

        {/* Level */}
        <label style={{ ...labelStyle, marginTop: '20px' }}>Your level</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {LEVELS.map(l => (
            <Chip
              key={l}
              label={l}
              variant="secondary"
              selected={level === l}
              onClick={() => setLevel(l)}
            />
          ))}
        </div>

        {/* Time available */}
        <label style={{ ...labelStyle, marginTop: '20px' }}>Time available</label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}
        >
          {TIME_OPTIONS.map(opt => (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => setDuration(opt.value)}
              style={{
                backgroundColor: duration === opt.value ? '#EFF6FF' : '#FFFFFF',
                border: `1px solid ${duration === opt.value ? '#93C5FD' : '#E2E8F0'}`,
                borderRadius: '12px',
                padding: '12px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                appearance: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <div
                style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A', marginBottom: '2px' }}
              >
                {opt.label}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{opt.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '32px' }}>
          <Button
            label="Build my course"
            variant="primary"
            fullWidth
            onClick={() => navigate('/generating')}
          />
          <p
            style={{
              fontSize: '12px',
              color: '#94A3B8',
              textAlign: 'center',
              marginTop: '8px',
              marginBottom: 0,
            }}
          >
            Generates in ~5 seconds
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
