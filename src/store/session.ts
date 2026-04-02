export interface SessionState {
  currentPage: number
  currentVariant: 'default' | 'deeper' | 'visual'
  explainMoreCount: number
  flaggedConcepts: string[]
  sandboxOpen: boolean
  quizOpen: boolean
  quizAnswered: boolean
  quizCorrect: boolean | null
  tapHistory: Array<{ page: number; chip: string; ms: number }>
}

export const defaultSession: SessionState = {
  currentPage: 1,
  currentVariant: 'default',
  explainMoreCount: 0,
  flaggedConcepts: [],
  sandboxOpen: false,
  quizOpen: false,
  quizAnswered: false,
  quizCorrect: null,
  tapHistory: [],
}
