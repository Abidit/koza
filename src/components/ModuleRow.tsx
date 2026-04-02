interface ModuleRowProps {
  number: number
  title: string
  duration: string
  isActive: boolean
  isLast: boolean
}

export default function ModuleRow({ number, title, duration, isActive, isLast }: ModuleRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: '52px',
        padding: '10px 0 10px 14px',
        borderLeft: isActive ? '2px solid #1E40AF' : '2px solid transparent',
        fontFamily: 'Inter, sans-serif',
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
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
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
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A', margin: 0, lineHeight: '1.4' }}>
          {title}
        </p>
        <p style={{ fontSize: '11px', color: '#94A3B8', margin: '3px 0 0', lineHeight: '1.4' }}>
          {duration}
        </p>
      </div>
    </div>
  )
}
