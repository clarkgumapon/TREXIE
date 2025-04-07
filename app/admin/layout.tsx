import { redirect } from "next/navigation"
import { Package, Settings, Users, LayoutDashboard, Gauge } from "lucide-react"
import Link from "next/link"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Add proper authentication check
  const isAuthenticated = true

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/admin/dashboard" className="mr-6 flex items-center space-x-2">
            <Gauge className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Fab & Fierce Admin
            </span>
          </Link>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Store
            </Link>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/products">
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </a>
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
} 