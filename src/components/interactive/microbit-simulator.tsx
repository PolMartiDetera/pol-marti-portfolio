"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface MicrobitSimulatorProps {
  className?: string
}

const MAKECODE_URL = "https://makecode.microbit.org/S25148-21398-20552-87081"

export function MicrobitSimulator({ className }: MicrobitSimulatorProps) {
  const [iframeLoaded, setIframeLoaded] = React.useState(false)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  return (
    <div className={cn("rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <span className="font-medium">Micro:bit v2</span>
          {iframeLoaded && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Simulatori actiu
            </span>
          )}
        </div>
        <div className="text-xs text-zinc-600">BBC micro:bit</div>
      </div>

      {/* MakeCode Simulator Iframe */}
      <div className="relative w-full bg-zinc-950">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="h-8 w-8 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin mx-auto" />
              <p className="text-zinc-500 text-sm">Carregant simulador...</p>
            </div>
          </div>
        )}
        <iframe
          src={MAKECODE_URL}
          title="MakeCode Micro:bit Simulator"
          className="w-full border-0"
          style={{ height: "480px" }}
          allow="accelerometer; gyroscope; magnetometer; autoplay; microphone"
          onLoad={() => setIframeLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-zinc-300 text-sm font-medium">Flappy Bird</p>
            <p className="text-zinc-500 text-xs">
              Joc desenvolupat amb MicroPython al MakeCode
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <a href={`${basePath}/microbit-flappy-bird.hex`} download="flappy-bird.hex">
                <Download className="h-4 w-4 mr-2" />
                .hex
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <a
                href={MAKECODE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Obrir MakeCode
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
