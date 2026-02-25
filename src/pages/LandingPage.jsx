import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Brain, Clock, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const features = [
  {
    icon: Zap,
    title: 'Instant Answers',
    description:
      'Get immediate, accurate responses to your support questions powered by advanced AI that understands context and nuance.',
  },
  {
    icon: Brain,
    title: 'Smart Context',
    description:
      'Our AI remembers your conversation history and builds context over time, delivering increasingly personalized support.',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description:
      'Never wait for business hours again. Our AI assistant is always ready to help, day or night, weekday or weekend.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Start a Conversation',
    description: 'Simply type your question or describe your issue in natural language.',
  },
  {
    number: '02',
    title: 'AI Analyzes & Responds',
    description:
      'Our AI processes your query using advanced language models to find the best answer.',
  },
  {
    number: '03',
    title: 'Get Resolved',
    description:
      'Receive a clear, actionable response. Follow up if needed — the AI remembers your context.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">SupportAI</span>
        </div>
        <Link to="/chat">
          <Button variant="ghost" size="sm">
            Open Chat <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 max-w-7xl mx-auto">
        {/* Floating gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border bg-secondary/50 backdrop-blur-sm text-sm text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Powered by Advanced AI
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            <span className="text-foreground">Support Assistant</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience the future of customer support. Get instant, intelligent answers to your
            questions with our AI assistant that learns and adapts to your needs.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/chat">
              <Button size="lg" className="text-base px-8">
                Start Chatting <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="lg" className="text-base">
                Learn More
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Our AI Assistant?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built with cutting-edge technology to deliver the best support experience possible.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors duration-300 group">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Getting help is as simple as having a conversation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden md:block" />

          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-6"
              >
                <div className="relative flex-shrink-0 h-16 w-16 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 max-w-4xl mx-auto text-center">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl pointer-events-none" />
        <motion.div
          className="relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Jump into a conversation and experience the power of AI-driven support.
          </p>
          <Link to="/chat">
            <Button size="lg" className="text-base px-8">
              Start Chatting Now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Built with AI
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SupportAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
