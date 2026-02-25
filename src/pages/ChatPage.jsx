import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SendHorizontal,
  Plus,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { getSessionId, createNewSession } from '@/utils/session'
import { sendMessage, getConversation, getSessions } from '@/services/api'

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 max-w-3xl">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
      <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-muted-foreground/60"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-start gap-3 max-w-3xl', isUser && 'ml-auto flex-row-reverse')}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      )}
      <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap max-w-md lg:max-w-xl',
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-sm'
              : 'bg-secondary text-foreground rounded-tl-sm'
          )}
        >
          {message.content}
        </div>
        {time && (
          <span className="text-[11px] text-muted-foreground mt-1 px-1">{time}</span>
        )}
      </div>
    </motion.div>
  )
}

function Sidebar({ sessions, activeSessionId, onSelectSession, onNewChat, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          'fixed lg:relative z-50 top-0 left-0 h-full w-72 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Chats</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-secondary text-muted-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start"
            onClick={onNewChat}
          >
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>

        {/* Session List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {sessions.length === 0 && (
            <p className="text-sm text-muted-foreground px-3 py-6 text-center">
              No conversations yet
            </p>
          )}
          {sessions.map((session) => (
            <button
              key={session.sessionId || session.id}
              onClick={() => onSelectSession(session.sessionId || session.id)}
              className={cn(
                'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer group',
                (session.sessionId || session.id) === activeSessionId
                  ? 'bg-secondary/80 text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
              )}
            >
              <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  {session.lastMessage || session.title || 'New conversation'}
                </p>
                {session.updatedAt && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {new Date(session.updatedAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.aside>
    </>
  )
}

export default function ChatPage() {
  const [sessionId, setSessionId] = useState(getSessionId)
  const [messages, setMessages] = useState([])
  const [sessions, setSessions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingHistory, setIsFetchingHistory] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  // Fetch sessions list
  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getSessions()
        setSessions(Array.isArray(data) ? data : data.sessions || [])
      } catch {
        // Sessions may not be available yet
      }
    }
    fetchSessions()
  }, [sessionId])

  // Fetch conversation when session changes
  useEffect(() => {
    async function fetchConversation() {
      setIsFetchingHistory(true)
      setError(null)
      try {
        const data = await getConversation(sessionId)
        const msgs = Array.isArray(data) ? data : data.messages || []
        setMessages(msgs)
      } catch {
        // New session, no history yet
        setMessages([])
      } finally {
        setIsFetchingHistory(false)
      }
    }
    fetchConversation()
  }, [sessionId])

  const handleSend = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return

    setError(null)
    setInputValue('')

    const userMessage = {
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const data = await sendMessage(sessionId, trimmed)
      const assistantMessage = {
        role: 'assistant',
        content: data.reply || data.message || data.response || 'No response received.',
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error('Send error:', err)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewChat = () => {
    const newId = createNewSession()
    setSessionId(newId)
    setMessages([])
    setSidebarOpen(false)
    inputRef.current?.focus()
  }

  const handleSelectSession = (id) => {
    setSessionId(id)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        sessions={sessions}
        activeSessionId={sessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary text-muted-foreground cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link
            to="/"
            className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">AI Support Assistant</h1>
              <p className="text-[11px] text-muted-foreground">Always here to help</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
          {isFetchingHistory && (
            <div className="text-center text-sm text-muted-foreground py-8">
              Loading conversation...
            </div>
          )}

          {!isFetchingHistory && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                How can I help you today?
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                Ask me anything about your issue and I&apos;ll do my best to assist you.
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2 max-w-md mx-auto"
            >
              {error}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
              autoFocus
            />
            <Button
              size="md"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="flex-shrink-0"
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
