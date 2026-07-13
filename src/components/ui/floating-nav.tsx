"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
}

interface FloatingNavProps {
  items: NavItem[]
  className?: string
}

export function FloatingNav({ items, className }: FloatingNavProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            "fixed bottom-8 left-1/2 -translate-x-1/2 z-50",
            className
          )}
        >
          <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-2 shadow-lg backdrop-blur-md">
            {items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
