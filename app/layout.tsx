import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Khushal Mehta | AI Engineer",
  description: "Portfolio of Khushal Mehta, showcasing AI-centric projects and skills",
  generator: 'v0.dev',
  keywords: ["AI Engineer", "Machine Learning", "Portfolio", "Khushal Mehta", "Full Stack Developer"],
  authors: [{ name: "Khushal Mehta" }],
  creator: "Khushal Mehta",
  metadataBase: new URL('https://khushal-mehta.vercel.app'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Khushal Mehta | AI Engineer",
    description: "Portfolio of Khushal Mehta, showcasing AI-centric projects and skills",
    type: "website",
    locale: "en_US",
    images: ['/logo.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khushal Mehta | AI Engineer",
    description: "Portfolio of Khushal Mehta, showcasing AI-centric projects and skills",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#222831" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
