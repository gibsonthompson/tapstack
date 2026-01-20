'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { HiArrowLeft, HiArrowRight, HiCheck, HiCloudUpload, HiX } from 'react-icons/hi'

const steps = [
  { id: 1, name: 'Account' },
  { id: 2, name: 'Branding' },
  { id: 3, name: 'Colors' },
  { id: 4, name: 'Payment' },
]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agencyName: '',
    logo: null,
    logoPreview: null,
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    extractedColors: [],
  })

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="Tapstack" fill className="object-contain" />
            </div>
            <span className="text-2xl font-display font-bold text-cream tracking-tight">
              Tapstack
            </span>
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep > step.id 
                      ? 'bg-lime text-dark' 
                      : currentStep === step.id 
                        ? 'bg-lime/20 border-2 border-lime text-lime' 
                        : 'bg-cream/5 border border-cream/20 text-cream/40'
                  }`}
                >
                  {currentStep > step.id ? <HiCheck className="text-lg" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-lime' : 'bg-cream/10'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Title */}
          <h2 className="text-center text-2xl font-display font-bold text-cream mb-2">
            {currentStep === 1 && 'Create your account'}
            {currentStep === 2 && 'Upload your logo'}
            {currentStep === 3 && 'Choose your colors'}
            {currentStep === 4 && 'Start your free trial'}
          </h2>
          <p className="text-center text-cream/50 mb-8">
            {currentStep === 1 && 'Enter your details to get started'}
            {currentStep === 2 && 'We\'ll extract colors from your logo'}
            {currentStep === 3 && 'Select your brand colors'}
            {currentStep === 4 && '14 days free, then $99/month'}
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
              >
                <HiX className="text-red-500 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <StepAccount 
                  formData={formData} 
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  setError={setError}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              )}
              {currentStep === 2 && (
                <StepBranding 
                  formData={formData} 
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                  setError={setError}
                />
              )}
              {currentStep === 3 && (
                <StepColors 
                  formData={formData} 
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 4 && (
                <StepPayment 
                  formData={formData}
                  onBack={prevStep}
                  setError={setError}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Login Link */}
          <p className="mt-8 text-center text-cream/50 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-lime hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-dark-light to-dark items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-lime/5" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-lime/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-lime/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-md text-center px-8">
          <div className="text-6xl mb-6">🚀</div>
          <h3 className="text-3xl font-display font-bold text-cream mb-4">
            Launch your agency today
          </h3>
          <p className="text-cream/60 text-lg">
            Join hundreds of entrepreneurs building their website business with Tapstack.
          </p>
        </div>
      </div>
    </div>
  )
}

// Step 1: Account Details
function StepAccount({ formData, updateFormData, onNext, setError, setIsLoading, isLoading }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.email || !formData.password || !formData.agencyName) {
      setError('Please fill in all fields')
      return
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    
    // TODO: Check if email already exists
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-cream/80 mb-2">
          Agency Name
        </label>
        <input
          type="text"
          value={formData.agencyName}
          onChange={(e) => updateFormData({ agencyName: e.target.value })}
          placeholder="Acme Web Agency"
          className="w-full px-4 py-3 bg-dark-light border border-cream/10 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-lime/50 transition-colors"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-cream/80 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-dark-light border border-cream/10 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-lime/50 transition-colors"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-cream/80 mb-2">
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-dark-light border border-cream/10 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-lime/50 transition-colors"
        />
        <p className="mt-1 text-xs text-cream/40">Minimum 8 characters</p>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full justify-center mt-6"
      >
        Continue
        <HiArrowRight />
      </button>
    </form>
  )
}

// Step 2: Logo Upload
function StepBranding({ formData, updateFormData, onNext, onBack, setError }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)

  const handleFileChange = async (file) => {
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    
    // Create preview
    const reader = new FileReader()
    reader.onload = async (e) => {
      updateFormData({ 
        logo: file,
        logoPreview: e.target.result 
      })
      
      // Extract colors from image
      setIsExtracting(true)
      try {
        const colors = await extractColorsFromImage(e.target.result)
        updateFormData({ 
          extractedColors: colors,
          primaryColor: colors[0] || '#3B82F6',
          secondaryColor: colors[1] || '#1E40AF',
        })
      } catch (err) {
        console.error('Color extraction failed:', err)
      }
      setIsExtracting(false)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-lime bg-lime/5' 
            : formData.logoPreview 
              ? 'border-lime/30 bg-lime/5' 
              : 'border-cream/20 hover:border-cream/40'
        }`}
      >
        {formData.logoPreview ? (
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto relative">
              <Image 
                src={formData.logoPreview} 
                alt="Logo preview" 
                fill 
                className="object-contain rounded-xl"
              />
            </div>
            <p className="text-cream/60 text-sm">Logo uploaded</p>
            <button
              type="button"
              onClick={() => updateFormData({ logo: null, logoPreview: null, extractedColors: [] })}
              className="text-red-400 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-cream/5 rounded-2xl flex items-center justify-center">
              <HiCloudUpload className="text-3xl text-cream/40" />
            </div>
            <div>
              <p className="text-cream/80 font-medium">Drop your logo here</p>
              <p className="text-cream/40 text-sm">or click to browse</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Extracting indicator */}
      {isExtracting && (
        <div className="text-center text-cream/60 text-sm">
          <span className="inline-block animate-pulse">Extracting colors...</span>
        </div>
      )}

      {/* Extracted Colors Preview */}
      {formData.extractedColors.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-cream/60">Colors extracted from your logo:</p>
          <div className="flex gap-2">
            {formData.extractedColors.slice(0, 5).map((color, i) => (
              <div 
                key={i}
                className="w-10 h-10 rounded-lg border border-cream/10"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex-1 justify-center"
        >
          <HiArrowLeft />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="btn-primary flex-1 justify-center"
        >
          {formData.logoPreview ? 'Continue' : 'Skip for now'}
          <HiArrowRight />
        </button>
      </div>
    </div>
  )
}

// Step 3: Color Selection
function StepColors({ formData, updateFormData, onNext, onBack }) {
  const presetColors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', 
    '#F97316', '#EAB308', '#22C55E', '#14B8A6',
    '#06B6D4', '#6366F1', '#000000', '#FFFFFF',
  ]

  return (
    <div className="space-y-6">
      {/* Primary Color */}
      <div>
        <label className="block text-sm font-medium text-cream/80 mb-3">
          Primary Color
        </label>
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-12 h-12 rounded-xl border-2 border-cream/20"
            style={{ backgroundColor: formData.primaryColor }}
          />
          <input
            type="text"
            value={formData.primaryColor}
            onChange={(e) => updateFormData({ primaryColor: e.target.value })}
            className="flex-1 px-4 py-3 bg-dark-light border border-cream/10 rounded-xl text-cream font-mono text-sm focus:outline-none focus:border-lime/50"
          />
          <input
            type="color"
            value={formData.primaryColor}
            onChange={(e) => updateFormData({ primaryColor: e.target.value })}
            className="w-12 h-12 rounded-xl cursor-pointer bg-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(formData.extractedColors.length > 0 ? formData.extractedColors.slice(0, 6) : presetColors.slice(0, 6)).map((color, i) => (
            <button
              key={i}
              type="button"
              onClick={() => updateFormData({ primaryColor: color })}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                formData.primaryColor === color ? 'border-lime scale-110' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Secondary Color */}
      <div>
        <label className="block text-sm font-medium text-cream/80 mb-3">
          Secondary Color
        </label>
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-12 h-12 rounded-xl border-2 border-cream/20"
            style={{ backgroundColor: formData.secondaryColor }}
          />
          <input
            type="text"
            value={formData.secondaryColor}
            onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
            className="flex-1 px-4 py-3 bg-dark-light border border-cream/10 rounded-xl text-cream font-mono text-sm focus:outline-none focus:border-lime/50"
          />
          <input
            type="color"
            value={formData.secondaryColor}
            onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
            className="w-12 h-12 rounded-xl cursor-pointer bg-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(formData.extractedColors.length > 0 ? formData.extractedColors.slice(0, 6) : presetColors.slice(6, 12)).map((color, i) => (
            <button
              key={i}
              type="button"
              onClick={() => updateFormData({ secondaryColor: color })}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                formData.secondaryColor === color ? 'border-lime scale-110' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-6 bg-dark-light rounded-2xl border border-cream/10">
        <p className="text-sm text-cream/50 mb-3">Preview</p>
        <div className="flex items-center gap-3">
          {formData.logoPreview && (
            <div className="w-10 h-10 relative">
              <Image src={formData.logoPreview} alt="Logo" fill className="object-contain rounded" />
            </div>
          )}
          <span className="font-display font-bold text-cream">{formData.agencyName || 'Your Agency'}</span>
        </div>
        <div className="flex gap-3 mt-4">
          <button 
            className="px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: formData.primaryColor }}
          >
            Primary Button
          </button>
          <button 
            className="px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: formData.secondaryColor }}
          >
            Secondary Button
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex-1 justify-center"
        >
          <HiArrowLeft />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="btn-primary flex-1 justify-center"
        >
          Continue
          <HiArrowRight />
        </button>
      </div>
    </div>
  )
}

// Step 4: Payment
function StepPayment({ formData, onBack, setError, setIsLoading, isLoading }) {
  const handleStartTrial = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // 1. Create agency in database
      const createRes = await fetch('/api/agency/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          agencyName: formData.agencyName,
          primaryColor: formData.primaryColor,
          secondaryColor: formData.secondaryColor,
        }),
      })
      
      if (!createRes.ok) {
        const data = await createRes.json()
        throw new Error(data.error || 'Failed to create account')
      }
      
      const { agencyId } = await createRes.json()
      
      // 2. Upload logo if exists
      if (formData.logo) {
        const logoFormData = new FormData()
        logoFormData.append('logo', formData.logo)
        logoFormData.append('agencyId', agencyId)
        
        await fetch('/api/agency/upload-logo', {
          method: 'POST',
          body: logoFormData,
        })
      }
      
      // 3. Create Stripe checkout session
      const checkoutRes = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agencyId }),
      })
      
      if (!checkoutRes.ok) {
        throw new Error('Failed to create checkout session')
      }
      
      const { url } = await checkoutRes.json()
      
      // 4. Redirect to Stripe
      window.location.href = url
      
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Plan Summary */}
      <div className="p-6 bg-gradient-to-b from-dark-light to-dark-lighter border border-lime/20 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-cream/60">Plan</span>
          <span className="text-cream font-medium">Tapstack Pro</span>
        </div>
        <div className="flex items-baseline justify-between mb-6">
          <span className="text-4xl font-display font-bold text-cream">$99</span>
          <span className="text-cream/60">/month after trial</span>
        </div>
        
        <div className="space-y-3 pt-4 border-t border-cream/10">
          {[
            'Unlimited client websites',
            'Your custom branding',
            'AI website builder',
            'Built-in hosting & SSL',
            'Priority support',
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-cream/80">
              <HiCheck className="text-lime flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trial Info */}
      <div className="p-4 bg-lime/10 border border-lime/20 rounded-xl">
        <p className="text-lime text-sm font-medium">
          🎉 14-day free trial — No credit card required to start
        </p>
      </div>

      {/* Account Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-cream/50">Agency</span>
          <span className="text-cream">{formData.agencyName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-cream/50">Email</span>
          <span className="text-cream">{formData.email}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="btn-secondary flex-1 justify-center"
        >
          <HiArrowLeft />
          Back
        </button>
        <button
          type="button"
          onClick={handleStartTrial}
          disabled={isLoading}
          className="btn-primary flex-1 justify-center"
        >
          {isLoading ? (
            <span className="inline-block animate-spin">⏳</span>
          ) : (
            <>
              Start Free Trial
              <HiArrowRight />
            </>
          )}
        </button>
      </div>

      {/* Terms */}
      <p className="text-center text-cream/40 text-xs">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="text-cream/60 hover:underline">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-cream/60 hover:underline">Privacy Policy</Link>
      </p>
    </div>
  )
}

// Helper: Extract colors from image
async function extractColorsFromImage(imageSrc) {
  return new Promise((resolve) => {
    const img = document.createElement('img')
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const size = 150
      canvas.width = size
      canvas.height = size
      ctx.drawImage(img, 0, 0, size, size)
      
      const imageData = ctx.getImageData(0, 0, size, size).data
      const bgColor = detectBackgroundColor(ctx, size)
      
      const colorCounts = {}
      
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i]
        const g = imageData[i + 1]
        const b = imageData[i + 2]
        const a = imageData[i + 3]
        
        if (a < 128) continue
        
        // Skip background colors
        if (bgColor) {
          const dist = Math.sqrt(
            Math.pow(r - bgColor.r, 2) + 
            Math.pow(g - bgColor.g, 2) + 
            Math.pow(b - bgColor.b, 2)
          )
          if (dist < 50) continue
        }
        
        // Quantize
        const qr = Math.min(240, Math.floor(r / 16) * 16)
        const qg = Math.min(240, Math.floor(g / 16) * 16)
        const qb = Math.min(240, Math.floor(b / 16) * 16)
        const key = `${qr},${qg},${qb}`
        colorCounts[key] = (colorCounts[key] || 0) + 1
      }
      
      // Convert to HSL with hue
      const allColors = Object.entries(colorCounts)
        .map(([key, count]) => {
          const [r, g, b] = key.split(',').map(Number)
          const { h, s, l } = rgbToHsl(r, g, b)
          return { r, g, b, count, hue: h, saturation: s, lightness: l }
        })
        .filter(c => c.saturation > 0.15 && c.lightness > 0.12 && c.lightness < 0.88 && c.count > 15)
        .sort((a, b) => (b.saturation * Math.log(b.count + 1)) - (a.saturation * Math.log(a.count + 1)))
      
      // Deduplicate by hue - keep best color from each hue family
      const hueFamilies = [] // Each family is ~60 degrees of hue
      const selected = []
      
      for (const color of allColors) {
        // Check if we already have a color with similar hue
        const existingFamily = hueFamilies.find(h => {
          const diff = Math.abs(h - color.hue)
          return diff < 35 || diff > 325 // Within 35 degrees (wrap around for red)
        })
        
        if (!existingFamily && selected.length < 6) {
          selected.push(color)
          hueFamilies.push(color.hue)
        }
      }
      
      resolve(selected.map(c => rgbToHex(c.r, c.g, c.b)))
    }
    img.onerror = () => resolve([])
    img.src = imageSrc
  })
}

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
    h *= 360
  }
  return { h, s, l }
}

// Detect background color from image edges
function detectBackgroundColor(ctx, size) {
  const edgePixels = []
  
  // Sample from all 4 edges
  for (let i = 0; i < size; i += 5) {
    edgePixels.push(ctx.getImageData(i, 0, 1, 1).data) // Top
    edgePixels.push(ctx.getImageData(i, size - 1, 1, 1).data) // Bottom
    edgePixels.push(ctx.getImageData(0, i, 1, 1).data) // Left
    edgePixels.push(ctx.getImageData(size - 1, i, 1, 1).data) // Right
  }
  
  // Check for transparency - if mostly transparent, assume white bg
  const transparentCount = edgePixels.filter(p => p[3] < 128).length
  if (transparentCount > edgePixels.length * 0.5) {
    return { r: 255, g: 255, b: 255 }
  }
  
  // Average the opaque edge colors
  let r = 0, g = 0, b = 0, count = 0
  edgePixels.forEach(p => {
    if (p[3] >= 128) {
      r += p[0]
      g += p[1]
      b += p[2]
      count++
    }
  })
  
  if (count > 0) {
    return { 
      r: Math.round(r / count), 
      g: Math.round(g / count), 
      b: Math.round(b / count) 
    }
  }
  
  return { r: 255, g: 255, b: 255 }
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}