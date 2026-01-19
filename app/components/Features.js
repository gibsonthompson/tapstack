'use client'
import { motion } from 'framer-motion'
import { 
  HiColorSwatch, 
  HiCurrencyDollar, 
  HiLightningBolt, 
  HiGlobe,
  HiDeviceMobile,
  HiSupport 
} from 'react-icons/hi'

const features = [
  {
    icon: HiColorSwatch,
    title: 'Your Brand, Your Way',
    description: 'Complete white-label solution. Your logo, your colors, your domain. Clients never see us.',
  },
  {
    icon: HiCurrencyDollar,
    title: 'Keep 100% Revenue',
    description: 'Set your own prices. Charge what you want. Every dollar goes straight to your pocket.',
  },
  {
    icon: HiLightningBolt,
    title: 'Launch in Minutes',
    description: 'No code, no design skills needed. Our AI builds stunning websites in under 10 minutes.',
  },
  {
    icon: HiGlobe,
    title: 'Built-in Hosting & SSL',
    description: 'We handle the technical stuff. Fast hosting, SSL certificates, and domain setup included.',
  },
  {
    icon: HiDeviceMobile,
    title: 'Run From Your Phone',
    description: 'Manage your entire business from anywhere. Mobile dashboard, instant notifications.',
  },
  {
    icon: HiSupport,
    title: 'We\'ve Got Your Back',
    description: '24/7 support for you and your clients. Training, templates, and resources included.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light to-dark" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Features
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Everything you need to
            <span className="text-gradient"> sell websites</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-cream/60"
          >
            We built the platform. You build the business.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card card-glow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center mb-6 group-hover:bg-lime/20 transition-colors duration-300">
                <feature.icon className="text-2xl text-lime" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-lime transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-cream/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
