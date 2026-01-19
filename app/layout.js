import './globals.css'

export const metadata = {
  title: 'Tapstack | Start Your Website Agency in Minutes',
  description: 'Launch your own white-label website business. No code. No experience. No problem. Sell websites under your brand and keep 100% of the revenue.',
  keywords: 'website agency, white label, website builder, start agency, sell websites, no code',
  openGraph: {
    title: 'Tapstack | Start Your Website Agency in Minutes',
    description: 'Launch your own white-label website business. No code. No experience. No problem.',
    type: 'website',
    locale: 'en_US',
    url: 'https://tapstack.dev',
    siteName: 'Tapstack',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tapstack | Start Your Website Agency in Minutes',
    description: 'Launch your own white-label website business. No code. No experience. No problem.',
  },
}

export const viewport = {
  themeColor: '#171515',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
