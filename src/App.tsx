export default function App() {
  return (
    <div className="min-h-screen bg-snow flex items-center justify-center">
      <div className="flex flex-col items-start gap-4">
        {/* Brand label */}
        <p className="text-[12px] font-medium text-ash font-sans">koza.</p>

        {/* Greeting */}
        <h1 className="text-[24px] font-medium text-ink font-sans">
          Good morning, Abidit.
        </h1>

        {/* CTA Button */}
        <button
          className="bg-navy text-snow font-sans font-medium text-sm h-12 px-6 cursor-pointer border-none appearance-none"
          style={{ borderRadius: '12px' }}
        >
          Build my course
        </button>

        {/* Chip */}
        <span
          className="inline-flex items-center bg-ice text-navy font-sans font-medium text-sm rounded-full h-10 px-4"
          style={{ border: '1.5px solid #93C5FD' }}
        >
          some basics
        </span>

        {/* Code block */}
        <pre
          className="bg-charcoal text-mist font-mono text-[12px] px-4 py-[14px] m-0"
          style={{ borderRadius: '12px' }}
        >
          git remote add origin https://github.com/you/repo.git
        </pre>
      </div>
    </div>
  )
}
