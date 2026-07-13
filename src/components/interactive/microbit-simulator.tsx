"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GameController, ArrowClockwise, ArrowsOut, Download } from "@phosphor-icons/react"

interface MicrobitSimulatorProps {
  className?: string
}

export function MicrobitSimulator({ className }: MicrobitSimulatorProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hexUrl, setHexUrl] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    fetch("/microbit-flappy-bird.hex")
      .then((r) => r.text())
      .then((hex) => {
        const blob = new Blob([hex], { type: "text/plain" })
        setHexUrl(URL.createObjectURL(blob))
      })
      .catch(() => setIsLoading(false))
  }, [])

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

  const reloadSimulator = () => {
    setIsLoading(true)
    const iframe = document.querySelector("iframe[src*='simulator']") as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const simulatorUrl = hexUrl
    ? `https://microbit.org/code/?url=${encodeURIComponent(hexUrl)}`
    : "https://microbit.org/code/"

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-muted/50 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <GameController className="h-4 w-4" />
            Simulador Micro:bit — Flappy Bird
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={reloadSimulator}
            >
              <ArrowClockwise className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleFullscreen}
            >
              <ArrowsOut className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              asChild
            >
              <a href="/microbit-flappy-bird.hex" download="flappy-bird.hex">
                <Download className="h-4 w-4 mr-1" />
                Descarregar
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className={cn(
            "relative bg-zinc-900",
            isFullscreen && "min-h-screen flex items-center justify-center"
          )}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
              <div className="text-zinc-400 text-sm">Carregant simulador...</div>
            </div>
          )}
          <iframe
            src={hexUrl ? simulatorUrl : "https://microbit.org/code/"}
            className={cn(
              "w-full border-0",
              isFullscreen ? "h-[80vh] max-w-4xl" : "aspect-video"
            )}
            title="Simulador Micro:bit"
            sandbox="allow-scripts allow-same-origin allow-popups"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
