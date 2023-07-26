import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BibleApi',
  description: 'Holy Bible API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/form">
            Form
          </Link>
          <Link href="/view-data">
            View Data
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
