"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function BackgroundBeams({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let beams: Beam[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Beam {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
      width: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.length = Math.random() * 200 + 100
        this.speed = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.3 + 0.1
        this.width = Math.random() * 2 + 0.5
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y + this.length)
        ctx.strokeStyle = `rgba(120, 119, 198, ${this.opacity})`
        ctx.lineWidth = this.width
        ctx.stroke()
      }

      update() {
        this.y += this.speed
        if (canvas && this.y > canvas.height) {
          this.y = -this.length
          this.x = Math.random() * canvas.width
        }
      }
    }

    const init = () => {
      resize()
      beams = Array.from({ length: 30 }, () => new Beam(canvas.width, canvas.height))
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      beams.forEach((beam) => {
        beam.update()
        beam.draw()
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
  }, [])

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  )
}
