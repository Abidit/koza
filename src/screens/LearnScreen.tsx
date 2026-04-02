import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Callout from '../components/Callout'
import Chip from '../components/Chip'
import CodeBlock from '../components/CodeBlock'
import ProgressBar from '../components/ProgressBar'
import Toast from '../components/Toast'
import { MODULE_4_PAGES, QUIZ } from '../data/course'
import type { SessionState } from '../store/session'

interface Props {
  session: SessionState
  setSession: React.Dispatch<React.SetStateAction<SessionState>>
}

export default function LearnScreen({ session, setSession }: Props) {
  const navigate = useNavigate()
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [sandboxCode, setSandboxCode] = useState('')
  const [outputVisible, setOutputVisible] = useState(false)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { currentPage, currentVariant, sandboxOpen, quizOpen, quizAnswered, quizCorrect } = session

  const pageData = MODULE_4_PAGES[currentPage - 1]
  const variant = pageData.variants[currentVariant]

  // Sync sandbox code when page/variant changes
  useEffect(() => {
    setSandboxCode(variant.sandboxCode ?? '')
    setOutputVisible(false)
  }, [currentPage, currentVariant])

  // Fix 3: cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  function showToast(msg: string) {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToastMessage(msg)
    setToastVisible(true)
    toastTimeoutRef.current = setTimeout(() => setToastVisible(false), 2800)
  }

  function handleNext() {
    // Fix 3: clear toast immediately on page change
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToastVisible(false)
    setToastMessage('')

    if (currentPage < 4) {
      setSession(s => ({
        ...s,
        currentPage: s.currentPage + 1,
        currentVariant: 'default',
        explainMoreCount: 0,
        quizOpen: false,
        sandboxOpen: false,
        quizAnswered: false,
        quizCorrect: null,
      }))
    } else {
      navigate('/complete')
    }
  }

  function handleExplain() {
    const next = session.explainMoreCount + 1
    const newVariant = next === 1 ? 'deeper' : 'visual'
    const msg = next === 1 ? "Let's go a level deeper." : "Let's try a completely different angle."
    // Fix 4: debug log for flaggedConcepts flow
    console.log('[koza] explain click — count:', next, 'pageId:', pageData.id, 'willFlag:', next >= 2)
    setSession(s => {
      const updatedFlags =
        next >= 2 && !s.flaggedConcepts.includes(pageData.id)
          ? [...s.flaggedConcepts, pageData.id]
          : s.flaggedConcepts
      console.log('[koza] flaggedConcepts now:', updatedFlags)
      return {
        ...s,
        explainMoreCount: next,
        currentVariant: newVariant,
        sandboxOpen: false,
        tapHistory: [...s.tapHistory, { page: currentPage, chip: 'explain', ms: Date.now() }],
        flaggedConcepts: updatedFlags,
      }
    })
    showToast(msg)
  }

  function handleQuizAnswer(optionId: string) {
    const isCorrect = QUIZ.options.find(o => o.id === optionId)?.correct ?? false
    setSession(s => ({
      ...s,
      quizAnswered: isCorrect,
      quizCorrect: isCorrect ? true : false,
    }))
  }

  const isLastPage = currentPage === 4
  const primaryChipLabel = isLastPage ? 'Finish module' : 'Got it — next page'

  // Fix 1+5: sandbox panel content — rendered inline on desktop, in sheet on mobile
  const sandboxPanel = (
    <>
      {/* Header — fixed 48px */}
      <div
        style={{
          height: '48px',
          padding: '0 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ width: '44px' }} />
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>Sandbox</span>
        <button
          onClick={() => setSession(s => ({ ...s, sandboxOpen: false }))}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: '#94A3B8',
            cursor: 'pointer',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 0,
            appearance: 'none',
          }}
        >
          ×
        </button>
      </div>

      {/* Code editor — fixed textarea height, no flex:1 */}
      <div
        style={{
          backgroundColor: '#0F172A',
          padding: '14px 16px',
          overflowY: 'auto',
        }}
      >
        <textarea
          value={sandboxCode}
          onChange={e => setSandboxCode(e.target.value)}
          style={{
            width: '100%',
            height: '140px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: '#E2E8F0',
            lineHeight: '1.85',
            resize: 'none',
            boxSizing: 'border-box',
          }}
          spellCheck={false}
        />
        {outputVisible && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#86EFAC',
              lineHeight: '1.7',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '10px',
              marginTop: '8px',
            }}
          >
            {'$ ' + (sandboxCode.split('\n').find(l => l.trim() && !l.startsWith('#')) ?? '')}
            {'\n✓ Done.'}
          </div>
        )}
      </div>

      {/* Run button — 44px height */}
      <button
        onClick={() => setOutputVisible(true)}
        style={{
          backgroundColor: '#166534',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: 500,
          height: '44px',
          borderRadius: '8px',
          border: 'none',
          margin: '12px 16px 8px',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          appearance: 'none',
        }}
      >
        Run
      </button>

      {/* AI nudge */}
      {variant.sandboxNudge && (
        <div
          style={{
            backgroundColor: '#EFF6FF',
            padding: '10px 14px',
            fontSize: '12px',
            color: '#1E40AF',
            lineHeight: '1.55',
            borderTop: '1px solid #BFDBFE',
            flexShrink: 0,
          }}
        >
          {variant.sandboxNudge}
        </div>
      )}
    </>
  )

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F8FAFC',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top bar — border full-bleed, inner content container-lg */}
      <div style={{ borderBottom: '0.5px solid #E2E8F0', flexShrink: 0 }}>
        <div
          className="container container-lg"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px' }}
        >
          <button
            onClick={() => navigate('/path')}
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
              flexShrink: 0,
            }}
          >
            ←
          </button>
          <div style={{ flex: 1 }}>
            <ProgressBar current={currentPage} total={4} />
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8', flexShrink: 0 }}>
            pg {currentPage} / 4
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="learn-body">
        {/* Fix 5: left column = scroll content (top) + action chips (bottom) */}
        <div className="learn-left">
          <div className="learn-scroll">
            {/* Fix 2: reserved 52px in-flow toast slot — no content jump */}
            <div style={{ height: '52px', padding: '6px 24px 0', overflow: 'hidden' }}>
              <Toast
                message={toastMessage}
                visible={toastVisible}
                onDismiss={() => setToastVisible(false)}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPage}-${currentVariant}`}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-30%', opacity: 0 }}
                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                style={{ padding: '0 24px 20px' }}
              >
                {!quizOpen ? (
                  <>
                    <p
                      style={{
                        fontSize: '10px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        color: '#94A3B8',
                        margin: '0 0 8px',
                      }}
                    >
                      {pageData.eyebrow}
                    </p>
                    <h1
                      style={{
                        fontSize: '20px',
                        fontWeight: 500,
                        color: '#0F172A',
                        letterSpacing: '-0.4px',
                        margin: '0 0 16px',
                        lineHeight: 1.25,
                      }}
                    >
                      {variant.title}
                    </h1>
                    <div style={{ marginBottom: '20px' }}>
                      {variant.body.split('\n\n').map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontSize: '15px',
                            color: '#475569',
                            lineHeight: 1.75,
                            margin: i < variant.body.split('\n\n').length - 1 ? '0 0 12px' : 0,
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                    {pageData.hasCode && variant.code && (
                      <div style={{ marginBottom: '16px' }}>
                        <CodeBlock code={variant.code} />
                      </div>
                    )}
                    <div style={{ marginBottom: '20px' }}>
                      <Callout text={variant.callout} variant="info" />
                    </div>
                  </>
                ) : (
                  <QuizView
                    answered={quizAnswered}
                    correct={quizCorrect}
                    onAnswer={handleQuizAnswer}
                    onBack={() =>
                      setSession(s => ({
                        ...s,
                        quizOpen: false,
                        quizAnswered: false,
                        quizCorrect: null,
                      }))
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fix 5: action chips pinned to bottom of left column */}
          <div className="learn-action" style={{ padding: '14px 24px 32px' }}>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 10px' }}>
              How did that land?
            </p>
            <Chip label={primaryChipLabel} variant="primary" selected={false} onClick={handleNext} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginTop: '8px',
              }}
            >
              {pageData.chips.includes('explain') && (
                <Chip
                  label="Explain more"
                  variant="secondary"
                  selected={false}
                  onClick={handleExplain}
                />
              )}
              {pageData.chips.includes('try') && (
                <Chip
                  label="Try it myself"
                  variant="secondary"
                  selected={sandboxOpen}
                  onClick={() => setSession(s => ({ ...s, sandboxOpen: true, quizOpen: false }))}
                />
              )}
              {pageData.chips.includes('quiz') && (
                <Chip
                  label="Quiz me"
                  variant="secondary"
                  selected={quizOpen}
                  onClick={() => setSession(s => ({ ...s, quizOpen: true, sandboxOpen: false }))}
                />
              )}
            </div>
          </div>
        </div>

        {/* Fix 5: right column — inline sandbox on desktop, hidden when closed */}
        <div className={`learn-right${!sandboxOpen ? ' learn-right-hidden' : ''}`}>
          {sandboxPanel}
        </div>
      </div>

      {/* Fix 1+5: mobile-only sandbox bottom sheet (hidden on desktop via CSS) */}
      <div className="sandbox-mobile">
        <AnimatePresence>
          {sandboxOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSession(s => ({ ...s, sandboxOpen: false }))}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  zIndex: 10,
                }}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.3, ease: [0.34, 1.15, 0.64, 1] }}
                style={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px 16px 0 0',
                  maxHeight: '52vh',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 11,
                  overflow: 'hidden',
                }}
              >
                {/* Drag handle */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '4px',
                      backgroundColor: '#E2E8F0',
                      borderRadius: '2px',
                    }}
                  />
                </div>
                {sandboxPanel}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Quiz sub-component ───────────────────────────────────────────────────────
interface QuizViewProps {
  answered: boolean
  correct: boolean | null
  onAnswer: (id: string) => void
  onBack: () => void
}

function QuizView({ answered, correct, onAnswer, onBack }: QuizViewProps) {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(id: string) {
    if (answered) return
    setSelected(id)
    onAnswer(id)
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#0F172A',
            margin: '0 0 16px',
            lineHeight: 1.5,
          }}
        >
          {QUIZ.question}
        </p>

        {QUIZ.options.map(opt => {
          const isSelected = selected === opt.id
          const isCorrect = opt.correct
          const showResult = isSelected

          let bg = '#FFFFFF'
          let border = '1px solid #E2E8F0'
          let textColor = '#475569'
          let radioFill = 'transparent'
          let radioBorder = '#E2E8F0'

          if (showResult) {
            if (isCorrect) {
              bg = '#F0FDF4'
              border = '1px solid #BBF7D0'
              textColor = '#166534'
              radioFill = '#166534'
              radioBorder = '#166534'
            } else {
              bg = '#FEF9EE'
              border = '1px solid #FDE68A'
              textColor = '#854D0E'
              radioFill = '#854D0E'
              radioBorder = '#854D0E'
            }
          }

          return (
            <motion.div
              key={opt.id}
              whileTap={!answered ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border,
                borderRadius: '8px',
                marginBottom: '8px',
                cursor: answered ? 'default' : 'pointer',
                backgroundColor: bg,
                transition: 'all 200ms',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: `1.5px solid ${radioBorder}`,
                  backgroundColor: radioFill,
                  flexShrink: 0,
                  transition: 'all 200ms',
                }}
              />
              <span style={{ fontSize: '13px', color: textColor }}>{opt.label}</span>
            </motion.div>
          )
        })}

        {selected && (
          <p
            style={{
              fontSize: '12px',
              color: correct ? '#166534' : '#854D0E',
              margin: '12px 0 0',
              lineHeight: 1.5,
            }}
          >
            {correct ? QUIZ.correctFeedback : QUIZ.wrongFeedback}
          </p>
        )}
      </div>

      {answered && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            color: '#1E40AF',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
          }}
        >
          Back to lesson →
        </motion.button>
      )}
    </div>
  )
}
