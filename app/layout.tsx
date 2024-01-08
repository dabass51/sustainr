import type { Metadata } from 'next'
import { NextAuthProvider } from '@/provider/NextAuthProvider'
import { ThemeProvider } from "@/components/theme-provider"

import Header from '@/components/Header'
import Footer from '@/components/Footer' 
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sustainr',
  description: 'nice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <Header></Header>
              {children}
            <Footer></Footer>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
