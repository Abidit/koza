interface CalloutProps {
  text: string
  variant: 'info' | 'adapt'
}

export default function Callout({ text, variant }: CalloutProps) {
  const isInfo = variant === 'info'

  return (
    <div
      style={{
        backgroundColor: isInfo ? '#EFF6FF' : '#FEF9EE',
        border: isInfo ? '1px solid #BFDBFE' : '1px solid #FDE68A',
        color: isInfo ? '#1E40AF' : '#854D0E',
        borderRadius: '10px',
        padding: '12px 14px',
        fontSize: '13px',
        lineHeight: '1.6',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {text}
    </div>
  )
}
