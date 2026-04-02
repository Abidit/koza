import { useState } from 'react'
import Button from './components/Button'
import Callout from './components/Callout'
import Chip from './components/Chip'
import CodeBlock from './components/CodeBlock'
import ModuleRow from './components/ModuleRow'
import ProgressBar from './components/ProgressBar'
import Tag from './components/Tag'
import Toast from './components/Toast'

const sampleCode = `// Load the course modules
const modules = await fetchModules(courseId)

function formatTitle(title) {
  return title.trim()
}

const result = modules.map(m => formatTitle(m.title))
return result`

function Section({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p
        style={{
          fontSize: '11px',
          fontWeight: 500,
          color: '#94A3B8',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {name}
      </p>
      {children}
    </div>
  )
}

export default function App() {
  const [toastVisible, setToastVisible] = useState(false)
  const [selectedChip, setSelectedChip] = useState<string | null>(null)

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        padding: '40px 24px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* Chip */}
        <Section name="Chip">
          <Chip label="Build my course" variant="primary" selected={false} onClick={() => {}} />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip
              label="some basics"
              variant="secondary"
              selected={selectedChip === 'basics'}
              onClick={() => setSelectedChip(selectedChip === 'basics' ? null : 'basics')}
            />
            <Chip
              label="advanced topics"
              variant="secondary"
              selected={selectedChip === 'advanced'}
              onClick={() => setSelectedChip(selectedChip === 'advanced' ? null : 'advanced')}
            />
          </div>
        </Section>

        {/* Button */}
        <Section name="Button">
          <Button label="Build my course" variant="primary" onClick={() => {}} fullWidth />
          <Button label="Learn more" variant="ghost" onClick={() => {}} fullWidth />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button label="Primary" variant="primary" onClick={() => {}} fullWidth={false} />
            <Button label="Ghost" variant="ghost" onClick={() => {}} fullWidth={false} />
          </div>
        </Section>

        {/* ProgressBar */}
        <Section name="ProgressBar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ProgressBar current={1} total={5} />
            <ProgressBar current={3} total={5} />
            <ProgressBar current={5} total={5} />
          </div>
        </Section>

        {/* CodeBlock */}
        <Section name="CodeBlock">
          <CodeBlock code={sampleCode} />
        </Section>

        {/* Callout */}
        <Section name="Callout">
          <Callout
            text="This section covers the fundamentals you'll need before diving deeper."
            variant="info"
          />
          <Callout
            text="This content has been adapted based on your previous experience with React."
            variant="adapt"
          />
        </Section>

        {/* Toast */}
        <Section name="Toast">
          <Button
            label="Show toast"
            variant="primary"
            onClick={() => setToastVisible(v => !v || v)}
            fullWidth={false}
          />
          <Toast
            message="Progress saved successfully."
            visible={toastVisible}
            onDismiss={() => setToastVisible(false)}
          />
        </Section>

        {/* Tag */}
        <Section name="Tag">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Tag label="Beginner" color="navy" />
            <Tag label="Project" color="forest" />
            <Tag label="Theory" color="neutral" />
          </div>
        </Section>

        {/* ModuleRow */}
        <Section name="ModuleRow">
          <div>
            <ModuleRow
              number={1}
              title="Introduction to React"
              duration="12 min"
              isActive={false}
              isLast={false}
            />
            <ModuleRow
              number={2}
              title="State and Props"
              duration="18 min"
              isActive={true}
              isLast={false}
            />
            <ModuleRow
              number={3}
              title="Hooks Deep Dive"
              duration="24 min"
              isActive={false}
              isLast={true}
            />
          </div>
        </Section>

      </div>
    </div>
  )
}
