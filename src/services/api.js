const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function sendMessage(sessionId, message) {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  })

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`)
  }

  return response.json()
}

export async function getConversation(sessionId) {
  const response = await fetch(`${BASE_URL}/api/conversations/${sessionId}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch conversation: ${response.statusText}`)
  }

  return response.json()
}

export async function getSessions() {
  const response = await fetch(`${BASE_URL}/api/sessions`)

  if (!response.ok) {
    throw new Error(`Failed to fetch sessions: ${response.statusText}`)
  }

  return response.json()
}
