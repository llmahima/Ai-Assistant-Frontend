import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, Brain, Clock, ArrowRight, Sparkles,
  MessageSquare, Shield, BarChart3, type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  iconColor: string
}

interface Step {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Instant Answers',
    description: 'Get immediate, accurate responses powered by advanced AI that understands context.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Brain,
    title: 'Smart Context',
    description: 'Remembers your conversation history for increasingly personalized support.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Always ready to help — day or night, weekday or weekend. No waiting.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
]

const steps: Step[] = [
  { number: '01', title: 'Ask Your Question', description: 'Type your question in natural language — just like chatting with a colleague.', icon: MessageSquare },
  { number: '02', title: 'AI Analyzes & Responds', description: 'Our AI searches the knowledge base and crafts a precise, relevant answer.', icon: BarChart3 },
  { number: '03', title: 'Get Resolved', description: 'Receive clear answers. Follow up if needed — the AI keeps your context.', icon: Shield },
]

const stats = [
  { value: '< 1s', label: 'Response Time' },
  { value: '24/7', label: 'Availability' },
  { value: '99%', label: 'Accuracy' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* ─── Nav ─── */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 glass-panel">
        <div className="mx-auto flex h-14 w-full max-w-[1080px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight">SupportAI</span>
          </Link>

          <div className="flex items-center gap-1">
            <a href="#features" className="hidden sm:block">
              <Button variant="ghost" size="sm">Features</Button>
            </a>
            <a href="#how-it-works" className="hidden sm:block">
              <Button variant="ghost" size="sm">How it Works</Button>
            </a>
            <Link to="/chat">
              <Button size="sm" className="gap-1.5">
                Open Chat <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-60px] h-[320px] w-[480px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute right-[-40px] top-8 h-[200px] w-[200px] rounded-full bg-accent/5 blur-[80px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(129,140,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center px-6 pb-10 pt-14 text-center sm:pb-14 sm:pt-20"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Badge variant="outline" className="mb-5 gap-2 border-primary/25 bg-primary/5 text-xs text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Powered by Advanced AI
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[3.25rem]"
          >
            Your <span className="text-gradient">AI-Powered</span>
            <br />
            Support Assistant
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground"
          >
            Experience the future of customer support. Get instant, intelligent
            answers from an AI that understands your product inside and out.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-7 flex items-center gap-3"
          >
            <Link to="/chat">
              <Button size="lg" className="gap-2 rounded-lg px-7 shadow-lg shadow-primary/25">
                Start Chatting <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="rounded-lg">
                Learn More
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-10 inline-flex items-center overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && <Separator orientation="vertical" className="h-8 bg-white/5" />}
                <div className="px-7 py-3 text-center">
                  <div className="text-lg font-bold leading-none sm:text-xl">{stat.value}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Chat Preview ─── */}
      <section className="w-full px-6 pb-16 sm:pb-20">
        <motion.div
          className="mx-auto w-full max-w-[640px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-white/5 bg-white/[0.02] shadow-2xl shadow-black/30">
            <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.02] px-3.5 py-2">
              <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <div className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">SupportAI Chat</span>
            </div>
            <CardContent className="space-y-3 p-4 sm:p-5">
              <ChatBubble side="right" delay={0.15}>How can I reset my password?</ChatBubble>
              <AiBubble delay={0.4}>
                Navigate to <strong>Settings &gt; Security &gt; Reset Password</strong>. Click
                'Reset Password', enter your current password, then confirm your new one.
              </AiBubble>
              <ChatBubble side="right" delay={0.65}>What are the password requirements?</ChatBubble>
              <AiBubble delay={0.9}>
                At least <strong>8 characters</strong> with one uppercase letter and one number.
              </AiBubble>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="w-full border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1080px] px-6">
          <SectionHeader badge="Features" title="Why Choose Our AI Assistant?" subtitle="Built with cutting-edge technology to deliver the best support experience." />

          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-3 sm:mt-12"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
          >
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeInUp} transition={{ duration: 0.35 }}>
                  <Card className="h-full border-white/5 bg-white/[0.02] transition-all hover:-translate-y-0.5 hover:border-white/10 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="p-5 lg:p-6">
                      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${f.gradient}`}>
                        <Icon className={`h-5 w-5 ${f.iconColor}`} />
                      </div>
                      <h3 className="mb-1.5 text-[15px] font-semibold">{f.title}</h3>
                      <p className="text-[13px] leading-relaxed text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="w-full border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[900px] px-6">
          <SectionHeader badge="How it works" title="Three Simple Steps" subtitle="Getting help is as simple as having a conversation." />

          <motion.div
            className="mt-10 grid gap-8 md:grid-cols-3 sm:mt-12"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div key={step.number} variants={fadeInUp} transition={{ duration: 0.35 }} className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="pointer-events-none absolute left-[60%] top-8 hidden h-px w-[80%] bg-gradient-to-r from-white/8 to-transparent md:block" />
                  )}
                  <div className="relative mb-4 inline-flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03]">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-1.5 text-[15px] font-semibold">{step.title}</h3>
                  <p className="mx-auto max-w-[220px] text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full px-6 py-16 sm:py-20">
        <div className="relative mx-auto w-full max-w-[480px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-0 left-1/2 h-[200px] w-[350px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
          </div>
          <motion.div className="relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Card className="border-white/5 bg-white/[0.02] text-center">
              <CardContent className="p-8 sm:p-10">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-2 text-xl font-bold sm:text-2xl">Ready to Get Started?</h2>
                <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
                  Jump into a conversation and experience the power of AI-driven support. No signup required.
                </p>
                <Link to="/chat">
                  <Button size="lg" className="gap-2 rounded-lg px-7 shadow-lg shadow-primary/25">
                    Start Chatting Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="w-full border-t border-white/5 py-5">
        <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-primary">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="text-sm font-semibold">SupportAI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SupportAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ─── Helper components ─── */

function SectionHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <motion.div
      className="text-center"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      variants={fadeInUp} transition={{ duration: 0.4 }}
    >
      <Badge variant="outline" className="mb-3 border-primary/20 text-[11px] uppercase tracking-[0.15em] text-primary">{badge}</Badge>
      <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-[15px]">{subtitle}</p>
    </motion.div>
  )
}

function ChatBubble({ children, side, delay }: { children: React.ReactNode; side: 'left' | 'right'; delay: number }) {
  return (
    <motion.div
      className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, x: side === 'right' ? 12 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
    >
      <div className="max-w-[240px] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-[13px] leading-relaxed text-primary-foreground">
        {children}
      </div>
    </motion.div>
  )
}

function AiBubble({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
    >
      <div className="flex max-w-[320px] gap-2">
        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
          <Sparkles className="h-3 w-3 text-accent" />
        </div>
        <div className="rounded-2xl rounded-bl-sm border border-white/5 bg-white/[0.03] px-3.5 py-2 text-[13px] leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
