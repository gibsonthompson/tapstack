'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiMinus } from 'react-icons/hi'

const faqs = [
  {
    question: 'Do I need any technical skills or experience?',
    answer: 'Nope! Tapstack is built for beginners. Our AI builds the websites automatically - you just need to find clients and deliver. We provide all the training, scripts, and templates you need to get started.',
  },
  {
    question: 'How much can I charge for websites?',
    answer: 'Most agencies charge $49-$199/month per client for website hosting and maintenance. You set your own prices and keep 100% of the revenue. Some of our top agencies charge $299+/month for premium packages.',
  },
  {
    question: 'Will clients know I\'m using Tapstack?',
    answer: 'Never. Tapstack is completely white-labeled. Your clients see YOUR brand, YOUR domain, YOUR logo. We stay invisible. As far as they know, you built everything yourself.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'Our AI can generate a complete, professional website in under 10 minutes. Add your client\'s info, pick a template, and the site is live. You can customize further if needed.',
  },
  {
    question: 'What types of businesses can I sell to?',
    answer: 'Any local service business: landscapers, plumbers, junk removal, house cleaning, pressure washing, roofers, painters, electricians, HVAC, and more. These businesses NEED websites and will pay monthly for them.',
  },
  {
    question: 'Is there a contract or can I cancel anytime?',
    answer: 'No contracts, ever. You can cancel your Tapstack subscription anytime. We also offer a 30-day money-back guarantee if you\'re not satisfied.',
  },
  {
    question: 'What support do you provide?',
    answer: 'We\'ve got you covered. 24/7 chat support, extensive video training, done-for-you templates, client scripts, and a private community of other agency owners. You\'re never alone.',
  },
  {
    question: 'How do I find my first clients?',
    answer: 'We provide proven outreach templates, scripts, and strategies. Most new agencies find their first client within the first 2 weeks using our methods. Local businesses are everywhere - you just need to reach out.',
  },
]

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-cream/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-medium text-cream group-hover:text-lime transition-colors duration-200 pr-8">
          {faq.question}
        </span>
        <div className="w-8 h-8 rounded-full bg-cream/5 flex items-center justify-center flex-shrink-0 group-hover:bg-lime/20 transition-colors duration-200">
          {isOpen ? (
            <HiMinus className="text-lime" />
          ) : (
            <HiPlus className="text-cream/60 group-hover:text-lime transition-colors duration-200" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-cream/60 text-lg leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 md:py-32 relative">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            FAQ
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Got questions?
            <span className="text-gradient"> We got answers.</span>
          </motion.h2>
        </div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto bg-dark-light border border-cream/10 rounded-2xl p-6 md:p-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-cream/60">
            Still have questions?{' '}
            <a href="mailto:support@tapstack.dev" className="text-lime hover:underline">
              Chat with us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
