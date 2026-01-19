'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { HiArrowRight } from 'react-icons/hi'
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Roadmap', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: 'mailto:support@tapstack.dev' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: FaTwitter, href: 'https://twitter.com/tapstack', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/tapstack', label: 'Instagram' },
    { icon: FaYoutube, href: 'https://youtube.com/@tapstack', label: 'YouTube' },
    { icon: FaTiktok, href: 'https://tiktok.com/@tapstack', label: 'TikTok' },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Final CTA Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-light to-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime/10 rounded-full blur-[150px]" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ready to start your
              <span className="text-gradient"> agency?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-cream/60 mb-10 max-w-2xl mx-auto">
              Join hundreds of agency owners who are building their business with Tapstack. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="btn-primary text-lg group">
                Get Started Free
                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className="text-cream/40 text-sm">
                No credit card required
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Content */}
      <div className="bg-dark-light border-t border-cream/5">
        <div className="container-custom py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10">
                  <Image 
                    src="/logo.png" 
                    alt="Tapstack" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-display font-bold text-cream tracking-tight">
                  Tapstack
                </span>
              </Link>
              
              <p className="text-cream/50 mb-6 max-w-sm">
                The easiest way to start and run your own website agency. No code, no experience required.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-cream/5 hover:bg-lime/20 border border-cream/10 hover:border-lime/30 rounded-lg flex items-center justify-center text-cream/60 hover:text-lime transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-display font-semibold text-cream mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-cream/50 hover:text-lime transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-display font-semibold text-cream mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-cream/50 hover:text-lime transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-display font-semibold text-cream mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-cream/50 hover:text-lime transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-cream/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/40 text-sm">
              © {currentYear} Tapstack. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}