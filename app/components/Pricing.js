'use client'
import { motion } from 'framer-motion'
import { HiCheck, HiArrowRight } from 'react-icons/hi'
import Link from 'next/link'

const features = [
  'Unlimited client websites',
  'Your custom branding',
  'Custom domain support',
  'AI website builder',
  'Built-in hosting & SSL',
  'Mobile dashboard',
  'Client management',
  'Booking system included',
  'SEO optimization',
  'Email & SMS notifications',
  'Priority support',
  'Training & resources',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light to-dark" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[150px]" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Simple Pricing
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            One plan.
            <span className="text-gradient"> Everything included.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-cream/60"
          >
            No hidden fees. No upsells. Just everything you need to run your agency.
          </motion.p>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-gradient-to-b from-dark-light to-dark-lighter border-2 border-lime/30 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime/10 rounded-full blur-[80px]" />
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime/10 border border-lime/30 rounded-full text-lime text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-lime rounded-full" />
              Most Popular
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl md:text-7xl font-display font-bold text-cream">$99</span>
              <span className="text-cream/60 text-xl">/month</span>
            </div>
            
            <p className="text-cream/60 mb-8">
              Unlimited everything. Cancel anytime.
            </p>

            {/* CTA */}
            <Link 
              href="/signup" 
              className="btn-primary w-full text-lg justify-center mb-10 group"
            >
              Start 14-Day Free Trial
              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                    <HiCheck className="text-lime text-sm" />
                  </div>
                  <span className="text-cream/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Annual Option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-cream/40">
            Want to save? <a href="/signup?plan=annual" className="text-lime hover:underline">Pay annually for $79/month</a>
          </p>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pt-12 border-t border-cream/5"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-cream/5 rounded-full">
            <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-cream/80 font-medium">30-Day Money-Back Guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
