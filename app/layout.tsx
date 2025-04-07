import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Montserrat, Cormorant } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { StoreProvider } from "@/components/providers"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Fab & Fierce Fashion Store",
  description: "Modern Filipino Fashion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${cormorant.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <StoreProvider>
            <SiteHeader />
            <main>{children}</main>
            <Toaster position="bottom-right" />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'