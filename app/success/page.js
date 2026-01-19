'use client'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { FaSpinner, FaCheckCircle } from 'react-icons/fa'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('loading') // loading, success, error
  const [message, setMessage] = useState('Setting up your agency...')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setMessage('Invalid session. Please contact support.')
      return
    }

    const processSession = async () => {
      try {
        // Call API to get agency details from session
        const res = await fetch('/api/stripe/get-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to process session')
        }

        setStatus('success')
        setMessage('Redirecting to your dashboard...')

        // Determine redirect URL - use tapstack.dev subdomain
        let redirectUrl = `https://${data.slug}.tapstack.dev/agency/login?welcome=true`
        
        if (data.marketingDomain) {
          // Agency has custom domain
          redirectUrl = `https://${data.marketingDomain}/agency/login?welcome=true`
        }

        // Short delay to show success, then redirect
        setTimeout(() => {
          window.location.href = redirectUrl
        }, 2000)

      } catch (err) {
        console.error('Session processing error:', err)
        setStatus('error')
        setMessage(err.message || 'Something went wrong. Please contact support.')
      }
    }

    processSession()
  }, [sessionId])

  return (
    <div className="bg-dark-light border border-cream/10 rounded-2xl p-8">
      {status === 'loading' && (
        <>
          <FaSpinner className="animate-spin text-4xl text-lime mx-auto mb-4" />
          <h1 className="text-xl font-display font-bold text-cream mb-2">
            Setting Up Your Agency
          </h1>
          <p className="text-cream/60">{message}</p>
        </>
      )}

      {status === 'success' && (
        <>
          <FaCheckCircle className="text-5xl text-lime mx-auto mb-4" />
          <h1 className="text-xl font-display font-bold text-cream mb-2">
            Welcome to Tapstack! 🎉
          </h1>
          <p className="text-cream/60 mb-4">
            Your agency is ready. Redirecting you to your dashboard...
          </p>
          <div className="w-full bg-cream/10 rounded-full h-2">
            <div className="bg-lime h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-xl font-display font-bold text-cream mb-2">
            Something Went Wrong
          </h1>
          <p className="text-cream/60 mb-6">{message}</p>
          <a
            href="mailto:support@tapstack.dev"
            className="btn-primary inline-flex"
          >
            Contact Support
          </a>
        </>
      )}
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="bg-dark-light border border-cream/10 rounded-2xl p-8">
      <FaSpinner className="animate-spin text-4xl text-lime mx-auto mb-4" />
      <h1 className="text-xl font-display font-bold text-cream mb-2">
        Loading...
      </h1>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative w-12 h-12">
            <Image src="/logo.png" alt="Tapstack" fill className="object-contain" />
          </div>
          <span className="text-2xl font-display font-bold text-cream tracking-tight">
            Tapstack
          </span>
        </div>

        {/* Status Card - wrapped in Suspense */}
        <Suspense fallback={<LoadingFallback />}>
          <SuccessContent />
        </Suspense>

        {/* Help text */}
        <p className="text-cream/40 text-sm mt-6">
          Having trouble? Email us at support@tapstack.dev
        </p>
      </div>
    </div>
  )
}