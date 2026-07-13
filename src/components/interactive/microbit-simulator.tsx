"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GameController, ArrowClockwise, ArrowsOut, Download, Cpu } from "@phosphor-icons/react"

interface MicrobitSimulatorProps {
  className?: string
}

export function MicrobitSimulator({ className }: MicrobitSimulatorProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    if (!isFullscreen) {
      try {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } catch (error) {
        console.error("Fullscreen not supported:", error)
      }
    } else {
      try {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } catch (error) {
        console.error("Error exiting fullscreen:", error)
      }
    }
  }

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <Card className={cn("overflow-hidden border-zinc-800", className)}>
      <CardHeader className="bg-zinc-900 border-b border-zinc-800 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-zinc-200">
            <GameController className="h-4 w-4 text-emerald-400" />
            Simulador Micro:bit — Flappy Bird
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleFullscreen}
              className="h-7 text-xs text-zinc-400 hover:text-zinc-200"
            >
              <ArrowsOut className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="h-7 text-xs text-zinc-400 hover:text-zinc-200"
            >
              <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/microbit-flappy-bird.hex`} download="flappy-bird.hex">
                <Download className="h-3.5 w-3.5 mr-1" />
                Descarregar .hex
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className={cn(
            "relative bg-zinc-950",
            isFullscreen && "min-h-screen flex items-center justify-center"
          )}
        >
          {/* Simulated micro:bit LED display */}
          <div className="flex flex-col items-center justify-center py-12 gap-8">
            <div className="relative">
              <Cpu className="h-32 w-32 text-zinc-700" />
              {/* LED matrix simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1.5 p-4">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-3 h-3 rounded-sm",
                        i === 12 || i === 16 || i === 14 || i === 8 || i === 18 ? "bg-red-500/80" : "bg-zinc-800"
                      )}
                      style={{
                        animation: i === 12 ? "pulse 2s ease-in-out infinite" : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-zinc-400 text-sm">Flappy Bird — BBC Micro:bit</p>
              <p className="text-zinc-600 text-xs max-w-xs mx-auto">
                Descarrega el fitxer .hex i carrega&apos;l al teu Micro:bit o al MakeCode simulator
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/microbit-flappy-bird.hex`} download="flappy-bird.hex">
                    <Download className="h-4 w-4 mr-2" />
                    Descarregar .hex
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <a
                    href="https://makecode.microbit.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Obrir MakeCode
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      </CardContent>
    </Card>
  )
}
