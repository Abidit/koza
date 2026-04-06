import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { defaultSession, type SessionState } from './store/session'
import CompleteScreen from './screens/CompleteScreen'
import GeneratingScreen from './screens/GeneratingScreen'
import IntentScreen from './screens/IntentScreen'
import LearnScreen from './screens/LearnScreen'
import PathScreen from './screens/PathScreen'

export default function App() {
  const [session, setSession] = useState<SessionState>(defaultSession)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntentScreen />} />
        <Route path="/generating" element={<GeneratingScreen />} />
        <Route path="/path" element={<PathScreen />} />
        <Route
          path="/learn"
          element={<LearnScreen session={session} setSession={setSession} />}
        />
        <Route
          path="/complete"
          element={
            <CompleteScreen
              flaggedConcepts={session.flaggedConcepts}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
