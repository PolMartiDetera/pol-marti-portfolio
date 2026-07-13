"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SparklesProps {
  className?: string
  count?: number
  colors?: string[]
}

export function Sparkles({
  className,
  count = 50,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#fb7185"],
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string
      twinkleSpeed: number
      twinkleOffset: number

      constructor(w: number, h: number) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random()
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
        this.twinkleOffset = Math.random() * Math.PI * 2
      }

      draw(time: number) {
        if (!ctx) return
        const twinkle = Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = twinkle * 0.8
        ctx.fill()
        ctx.globalAlpha = 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (canvas) {
          if (this.x < 0) this.x = canvas.offsetWidth
          if (this.x > canvas.offsetWidth) this.x = 0
          if (this.y < 0) this.y = canvas.offsetHeight
          if (this.y > canvas.offsetHeight) this.y = 0
        }
      }
    }

    const init = () => {
      resize()
      particles = Array.from({ length: count }, () => new Particle(canvas.offsetWidth, canvas.offsetHeight))
    }

    let time = 0
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time++
      particles.forEach((p) => {
        p.update()
        p.draw(time)
      })
      animationId = requestAnimationFrame(animate)
    }

    init()
    animate()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [count, colors])

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
