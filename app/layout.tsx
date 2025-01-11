import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Physician Compensation Management',
  description: 'Comprehensive physician compensation and productivity tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}