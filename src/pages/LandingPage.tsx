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
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="layout-container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight">SupportAI</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#features" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="px-3">Features</Button>
            </a>
            <a href="#how-it-works" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="px-3">How it Works</Button>
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
          className="layout-container layout-container-narrow relative z-10 mx-auto flex w-full flex-col items-center pb-16 pt-16 text-center sm:pb-20 sm:pt-24"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Badge variant="outline" className="mb-6 gap-2 border-primary/25 bg-primary/5 text-xs text-primary">
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
            className="mt-5 max-w-md text-[15px] leading-[1.7] text-muted-foreground"
          >
            Experience the future of customer support. Get instant, intelligent
            answers from an AI that understands your product inside and out.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
            className="mt-12 inline-flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && <Separator orientation="vertical" className="h-10 bg-white/10" />}
                <div className="px-8 py-3.5 text-center">
                  <div className="text-lg font-bold leading-none sm:text-xl">{stat.value}</div>
                  <div className="mt-1.5 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Chat Preview ─── */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <motion.div
          className="layout-container mx-auto w-full max-w-[37.5rem]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-white/10 bg-white/[0.03] shadow-xl shadow-black/40 ring-1 ring-white/5">
            {/* Chat window title bar */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-3.5">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-xs font-medium text-muted-foreground">SupportAI Chat</span>
            </div>
            <CardContent className="space-y-5 p-6 sm:p-8">
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
      <section id="features" className="w-full border-t border-white/10 py-20 sm:py-24 lg:py-28">
        <div className="layout-container layout-container-wide mx-auto w-full">
          <SectionHeader badge="Features" title="Why Choose Our AI Assistant?" subtitle="Built with cutting-edge technology to deliver the best support experience." />

          <motion.div
            className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8 lg:mt-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
          >
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeInUp} transition={{ duration: 0.35 }}>
                  <Card className="h-full border-white/10 bg-white/[0.03] transition-all hover:-translate-y-0.5 hover:border-white/15 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="p-6 lg:p-7">
                      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${f.gradient}`}>
                        <Icon className={`h-5 w-5 ${f.iconColor}`} />
                      </div>
                      <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
                      <p className="text-[14px] leading-[1.6] text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="w-full border-t border-white/10 py-20 sm:py-24 lg:py-28">
        <div className="layout-container mx-auto w-full max-w-[56rem]">
          <SectionHeader badge="How it works" title="Three Simple Steps" subtitle="Getting help is as simple as having a conversation." />

          <motion.div
            className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div key={step.number} variants={fadeInUp} transition={{ duration: 0.35 }} className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="pointer-events-none absolute left-[60%] top-8 hidden h-px w-[80%] bg-gradient-to-r from-white/8 to-transparent md:block" />
                  )}
                  <div className="relative mb-5 inline-flex items-center justify-center">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold">{step.title}</h3>
                  <p className="mx-auto max-w-[240px] text-[14px] leading-[1.6] text-muted-foreground">{step.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full py-20 sm:py-24 lg:py-28">
        <div className="layout-container layout-container-narrow relative mx-auto w-full max-w-[30rem]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-0 left-1/2 h-[200px] w-[350px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
          </div>
          <motion.div className="relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Card className="border-white/10 bg-white/[0.03] text-center shadow-xl shadow-black/20">
              <CardContent className="p-8 sm:p-12">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-3 text-xl font-bold sm:text-2xl">Ready to Get Started?</h2>
                <p className="mx-auto mb-8 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
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
      <footer className="w-full border-t border-white/10 py-8 sm:py-10">
        <div className="layout-container layout-container-wide flex w-full items-center justify-between">
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
      <Badge variant="outline" className="mb-4 border-primary/20 text-[11px] uppercase tracking-[0.15em] text-primary">{badge}</Badge>
      <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{subtitle}</p>
    </motion.div>
  )
}

function ChatBubble({ children, side, delay }: { children: React.ReactNode; side: 'left' | 'right'; delay: number }) {
  return (
    <motion.div
      className={`flex w-full ${side === 'right' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, x: side === 'right' ? 12 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
    >
      <div className="max-w-[85%] min-w-0 rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-[14px] leading-[1.55] text-primary-foreground shadow-sm sm:max-w-[320px]">
        {children}
      </div>
    </motion.div>
  )
}

function AiBubble({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      className="flex w-full justify-start gap-3"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
    >
      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/15">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="min-w-0 max-w-[85%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-4 py-3 text-[14px] leading-[1.55] shadow-sm sm:max-w-[340px]">
        {children}
      </div>
    </motion.div>
  )
}
