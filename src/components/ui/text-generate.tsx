"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

interface TextGenerateProps {
  words: string
  className?: string
  filter?: boolean
  duration?: number
}

export function TextGenerate({
  words,
  className,
  filter = true,
  duration = 0.4,
}: TextGenerateProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const wordArray = words.split(" ")

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
    >
      {wordArray.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, filter: filter ? "blur(6px)" : "none" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{
            duration,
            delay: i * 0.06,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}{"\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  )
}
