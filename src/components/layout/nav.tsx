"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { List, X } from "@phosphor-icons/react"

const navItems = [
  { label: "Inici", href: "#inicio" },
  { label: "Qui Soc", href: "#about" },
  { label: "Robotica", href: "#robotics" },
  { label: "Python", href: "#python" },
  { label: "Micro:bit", href: "#microbit" },
  { label: "Contacte", href: "#contact" },
]

function smoothScrollTo(href: string) {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export function Nav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800"
          : "bg-zinc-950/60 backdrop-blur-sm"
      )}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Pol-Martí
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo(item.href)
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tancar menú" : "Obrir menú"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800">
          <ul className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(false)
                    smoothScrollTo(item.href)
                  }}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors block py-2 cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
