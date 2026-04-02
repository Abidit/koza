import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ModuleRow from '../components/ModuleRow'
import Tag from '../components/Tag'
import { MODULES } from '../data/course'

export default function PathScreen() {
  const navigate = useNavigate()

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
      <div className="container container-sm" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '20px',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            color: '#0F172A',
            cursor: 'pointer',
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            appearance: 'none',
          }}
        >
          ←
        </button>
        <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>koza.</span>
        <Tag label="ready" color="forest" />
      </div>

      {/* Tag row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <Tag label="Git and GitHub" color="navy" />
        <Tag label="2 hours" color="navy" />
        <Tag label="some basics" color="neutral" />
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: '20px',
          fontWeight: 500,
          color: '#0F172A',
          letterSpacing: '-0.4px',
          margin: '0 0 4px',
        }}
      >
        Here's what we'd suggest
      </h1>
      <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 20px' }}>
        8 modules · 29 pages · live terminal included
      </p>

      {/* Module list */}
      <div style={{ flex: 1 }}>
        {MODULES.map((mod, i) => (
          <ModuleRow
            key={mod.number}
            number={mod.number}
            title={mod.title}
            duration={mod.duration}
            isActive={mod.number === 4}
            isLast={i === MODULES.length - 1}
          />
        ))}
      </div>

      {/* Bottom actions */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '24px',
          paddingBottom: '32px',
        }}
      >
        <div style={{ flex: 1 }}>
          <Button label="Adjust" variant="ghost" fullWidth onClick={() => navigate('/')} />
        </div>
        <div style={{ flex: 2 }}>
          <Button
            label="Start learning"
            variant="primary"
            fullWidth
            onClick={() => navigate('/learn')}
          />
        </div>
      </div>
      </div>
    </div>
  )
}
