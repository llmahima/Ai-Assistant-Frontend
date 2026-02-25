import { v4 as uuidv4 } from 'uuid'

const SESSION_KEY = 'support_assistant_session_id'

export function getSessionId(): string {
  const stored = localStorage.getItem(SESSION_KEY)
  if (stored) return stored
  const newId = uuidv4()
  localStorage.setItem(SESSION_KEY, newId)
  return newId
}

export function createNewSession(): string {
  const newId = uuidv4()
  localStorage.setItem(SESSION_KEY, newId)
  return newId
}

export function getStoredSessionId(): string | null {
  return localStorage.getItem(SESSION_KEY)
}
