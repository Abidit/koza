interface TagProps {
  label: string
  color: 'navy' | 'forest' | 'neutral'
}

const colorStyles = {
  navy: { backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF' },
  forest: { backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534' },
  neutral: { backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', color: '#475569' },
}

export default function Tag({ label, color }: TagProps) {
  return (
    <span
      style={{
        ...colorStyles[color],
        fontSize: '11px',
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: '9999px',
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {label}
    </span>
  )
}
