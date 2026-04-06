interface ModuleRowProps {
  number: number
  title: string
  duration: string
  isActive: boolean
  isLocked: boolean
  isLast: boolean
}

export default function ModuleRow({ number, title, duration, isActive, isLocked, isLast }: ModuleRowProps) {
  const titleColor = isLocked ? '#94A3B8' : '#0F172A'
  const circleBg = isLocked ? '#E2E8F0' : '#0F172A'
  const circleText = isLocked ? '#94A3B8' : '#F8FAFC'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: '52px',
        padding: '10px 0 10px 14px',
        borderLeft: isActive ? '2px solid #1E40AF' : '2px solid transparent',
        fontFamily: 'Inter, sans-serif',
        opacity: isLocked ? 0.7 : 1,
      }}
    >
      {/* Left: number circle + connector */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'stretch',
          marginRight: '12px',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '9999px',
            backgroundColor: circleBg,
            color: circleText,
            fontSize: '11px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        {!isLast && (
          <div
            style={{
              width: '1px',
              flexGrow: 1,
              backgroundColor: '#E2E8F0',
              marginTop: '4px',
              minHeight: '8px',
            }}
          />
        )}
      </div>

      {/* Right: title + duration */}
      <div style={{ paddingTop: '2px' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: titleColor, margin: 0, lineHeight: '1.4' }}>
          {title}
        </p>
        <p style={{ fontSize: '11px', color: '#94A3B8', margin: '3px 0 0', lineHeight: '1.4' }}>
          {duration}
        </p>
      </div>
    </div>
  )
}
