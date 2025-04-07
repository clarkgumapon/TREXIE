"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const items = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Products",
      href: "/admin/products",
    },
    {
      title: "Users",
      href: "/admin/users",
    },
  ]

  return (
    <nav className="flex items-center space-x-6">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          Trex Fashion Store
        </span>
      </Link>
      <div className="flex gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  )
} 