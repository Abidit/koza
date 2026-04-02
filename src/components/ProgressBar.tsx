interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.min((current / total) * 100, 100)

  return (
    <div
      style={{
        width: '100%',
        height: '3px',
        backgroundColor: '#E2E8F0',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${percent}%`,
          backgroundColor: '#1E40AF',
          transition: 'width 350ms cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  )
}
