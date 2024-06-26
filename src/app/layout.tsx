import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Container from '@/components/header/Container'
import Header from '@/components/header/Header'

import './globals.scss'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
  title: 'Justore интернет-магазин',
  description: 'Online shop Justore'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='/favicon.ico'
          sizes='any'
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
