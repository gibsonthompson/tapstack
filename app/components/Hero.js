'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { HiArrowRight, HiPlay, HiCheck } from 'react-icons/hi'

export default function Hero() {
  const features = [
    'No code required',
    'Keep 100% of revenue',
    'Launch in minutes',
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-lime/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-lime/5 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(252,252,253,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(252,252,253,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 noise-bg" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">
              <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              Launch your agency this week
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 leading-[0.95] tracking-tight"
          >
            Start your website
            <br />
            <span className="text-gradient">agency today</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-cream/60 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Launch your own white-label website business. 
            <span className="text-cream"> No code. No experience. No problem.</span>
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {features.map((feature, i) => (
              <span 
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cream/5 border border-cream/10 rounded-full text-sm text-cream/80"
              >
                <HiCheck className="text-lime" />
                {feature}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup" className="btn-primary text-lg group">
              Get Started Free
              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="btn-secondary group">
              <HiPlay className="text-lime" />
              Watch Demo
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 pt-10 border-t border-cream/5"
          >
            <p className="text-cream/40 text-sm mb-6">Trusted by agencies worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {/* Placeholder logos - replace with real ones */}
              {['Agency 1', 'Agency 2', 'Agency 3', 'Agency 4'].map((name, i) => (
                <div 
                  key={i}
                  className="text-cream/30 font-display font-bold text-lg"
                >
                  {name}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}