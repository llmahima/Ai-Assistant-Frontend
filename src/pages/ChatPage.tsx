import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SendHorizontal, Plus, Menu, X,
  MessageSquare, Sparkles, ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { getSessionId, createNewSession } from '@/utils/session'
import { sendMessage, getConversation, getSessions } from '@/services/api'
import type { Message, Session } from '@/services/api'

/* ─── Typing indicator ─── */
function TypingIndicator() {
  return (
    <div className="flex max-w-3xl items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
      <div className="rounded-2xl rounded-tl-sm border border-white/5 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Message bubble ─── */
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className={cn('flex max-w-3xl items-start gap-3', isUser && 'ml-auto flex-row-reverse')}
    >
      {!isUser && (
        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      )}
      <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'max-w-sm whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-md lg:max-w-lg',
            isUser
              ? 'rounded-tr-sm bg-primary text-primary-foreground'
              : 'rounded-tl-sm border border-white/5 bg-white/[0.03] text-foreground'
          )}
        >
          {message.content}
        </div>
        {time && <span className="mt-1 px-1 text-[11px] text-muted-foreground">{time}</span>}
      </div>
    </motion.div>
  )
}

/* ─── Sidebar ─── */
function Sidebar({
  sessions, activeSessionId, onSelectSession, onNewChat, isOpen, onClose,
}: {
  sessions: Session[]
  activeSessionId: string
  onSelectSession: (id: string) => void
  onNewChat: () => void
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col border-r border-white/5 bg-[#08080f]/95 backdrop-blur-xl transition-transform duration-300 lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Chats</span>
          </div>
          <button onClick={onClose} className="cursor-pointer rounded-md p-1.5 text-muted-foreground hover:bg-white/5 lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-3">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={onNewChat}>
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>

        <div className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
          {sessions.length === 0 && (
            <p className="px-3 py-8 text-center text-xs text-muted-foreground">No conversations yet</p>
          )}
          {sessions.map((session) => {
            const sid = session.sessionId || session.id || ''
            return (
              <button
                key={sid}
                onClick={() => onSelectSession(sid)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors',
                  sid === activeSessionId
                    ? 'bg-white/5 text-foreground'
                    : 'text-muted-foreground hover:bg-white/[0.03] hover:text-foreground'
                )}
              >
                <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{session.lastMessage || session.title || 'New conversation'}</p>
                  {session.updatedAt && (
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {new Date(session.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}

/* ─── Main ChatPage ─── */
export default function ChatPage() {
  const [sessionId, setSessionId] = useState(getSessionId)
  const [messages, setMessages] = useState<Message[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingHistory, setIsFetchingHistory] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Track brand-new sessions so we skip fetching empty history
  const [isNewSession, setIsNewSession] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, isLoading, scrollToBottom])

  // Fetch sessions list
  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getSessions()
        setSessions(Array.isArray(data) ? data : (data as { sessions?: Session[] }).sessions || [])
      } catch { /* ignore */ }
    }
    fetchSessions()
  }, [sessionId])

  // Fetch conversation — but skip if it's a brand-new session
  useEffect(() => {
    if (isNewSession) return

    async function fetchConversation() {
      setIsFetchingHistory(true)
      setError(null)
      try {
        const data = await getConversation(sessionId)
        const msgs = Array.isArray(data) ? data : (data as { messages?: Message[] }).messages || []
        setMessages(msgs as Message[])
      } catch {
        setMessages([])
      } finally {
        setIsFetchingHistory(false)
      }
    }
    fetchConversation()
  }, [sessionId, isNewSession])

  const handleSend = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return
    setError(null)
    setInputValue('')
    // Once user sends a message, this is no longer "new"
    setIsNewSession(false)

    const userMsg: Message = { role: 'user', content: trimmed, timestamp: new Date().toISOString() }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const data = await sendMessage(sessionId, trimmed)
      const reply: Message = {
        role: 'assistant',
        content: data.reply || data.message || data.response || 'No response received.',
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, reply])
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error('Send error:', err)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleNewChat = () => {
    const newId = createNewSession()
    setSessionId(newId)
    setMessages([])        // clear immediately
    setIsNewSession(true)  // prevent useEffect from fetching old data
    setSidebarOpen(false)
    inputRef.current?.focus()
  }

  const handleSelectSession = (id: string) => {
    setSessionId(id)
    setIsNewSession(false)  // existing session — fetch its history
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        sessions={sessions}
        activeSessionId={sessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-white/5 bg-background/80 px-4 py-3 backdrop-blur-xl">
          <button onClick={() => setSidebarOpen(true)} className="cursor-pointer rounded-md p-1.5 text-muted-foreground hover:bg-white/5 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="rounded-md p-1.5 text-muted-foreground hover:bg-white/5">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">AI Support Assistant</h1>
              <p className="text-[11px] text-muted-foreground">Always here to help</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
          {isFetchingHistory && (
            <div className="py-8 text-center text-sm text-muted-foreground">Loading conversation...</div>
          )}

          {!isFetchingHistory && messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-1.5 text-lg font-semibold">How can I help you today?</h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Ask me anything about your issue and I'll do my best to assist you.
              </p>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <MessageBubble key={`${msg.role}-${idx}`} message={msg} />
            ))}
          </AnimatePresence>

          {isLoading && <TypingIndicator />}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-2 text-center text-sm text-destructive"
            >
              {error}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/5 bg-background/80 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 border-white/8 bg-white/[0.03]"
              autoFocus
            />
            <Button size="icon" onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
