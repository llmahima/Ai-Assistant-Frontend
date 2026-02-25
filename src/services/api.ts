const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface ChatResponse {
  reply?: string
  message?: string
  response?: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

interface ConversationResponse {
  messages?: Message[]
}

interface Session {
  sessionId?: string
  id?: string
  lastMessage?: string
  title?: string
  updatedAt?: string
}

interface SessionsResponse {
  sessions?: Session[]
}

export async function sendMessage(sessionId: string, message: string): Promise<ChatResponse> {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  })
  if (!response.ok) throw new Error(`Failed to send message: ${response.statusText}`)
  return response.json()
}

export async function getConversation(sessionId: string): Promise<Message[] | ConversationResponse> {
  const response = await fetch(`${BASE_URL}/api/conversations/${sessionId}`)
  if (!response.ok) throw new Error(`Failed to fetch conversation: ${response.statusText}`)
  return response.json()
}

export async function getSessions(): Promise<Session[] | SessionsResponse> {
  const response = await fetch(`${BASE_URL}/api/sessions`)
  if (!response.ok) throw new Error(`Failed to fetch sessions: ${response.statusText}`)
  return response.json()
}

export type { Message, Session }
