'use client'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

const steps = [
  {
    number: '01',
    title: 'Set Up Your Brand',
    description: 'Upload your logo, pick your colors, connect your domain. Your agency is ready in 5 minutes.',
    color: 'from-lime/20 to-lime/5',
  },
  {
    number: '02',
    title: 'Find Your Clients',
    description: 'Use our proven templates and scripts. Target local businesses who need websites. They\'re everywhere.',
    color: 'from-lime/15 to-lime/5',
  },
  {
    number: '03',
    title: 'Deliver & Get Paid',
    description: 'Our AI builds their website in minutes. You deliver, they pay. Recurring revenue, every month.',
    color: 'from-lime/10 to-lime/5',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime/5 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            How It Works
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            From zero to selling
            <span className="text-gradient"> in 3 steps</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-cream/60"
          >
            No technical skills. No prior experience. Just follow the system.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-4 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-lime/30 to-transparent z-0" />
              )}
              
              <div className={`relative bg-gradient-to-b ${step.color} border border-lime/10 rounded-3xl p-8 h-full`}>
                {/* Step number */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-6xl md:text-7xl font-display font-bold text-lime/20">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  {step.title}
                </h3>
                
                <p className="text-cream/60 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a href="/signup" className="btn-primary text-lg group">
            Start Your Agency Now
            <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
