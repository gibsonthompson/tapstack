'use client'
import { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function LoginPage() {
  useEffect(() => {
    // Redirect to rocket-solutions agency login
    window.location.href = 'https://gorocketsolutions.com/agency/login'
  }, [])

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <FaSpinner className="animate-spin text-4xl text-lime mx-auto mb-4" />
        <p className="text-cream/60">Redirecting to login...</p>
      </div>
    </div>
  )
}
