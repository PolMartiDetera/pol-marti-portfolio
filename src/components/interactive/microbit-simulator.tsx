"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface MicrobitSimulatorProps {
  className?: string
}

// Simple bird pattern for the LED display
const BIRD_LED = [
  0, 0, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 1, 1, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
]

export function MicrobitSimulator({ className }: MicrobitSimulatorProps) {
  const [hovered, setHovered] = React.useState(false)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  return (
    <div className={cn("rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <span className="font-medium">Micro:bit</span>
        </div>
        <div className="text-xs text-zinc-600">BBC micro:bit v2</div>
      </div>

      {/* Micro:bit Visual */}
      <div className="p-8 flex flex-col items-center gap-6">
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Micro:bit board shape */}
          <div className="w-52 bg-zinc-900 rounded-xl border border-zinc-700/50 p-4 relative">
            {/* Top connector pins */}
            <div className="flex gap-3 mb-4 justify-center">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-4 h-2 bg-zinc-700 rounded-sm" />
              ))}
            </div>

            {/* Main chip */}
            <div className="bg-zinc-800 rounded-lg p-3 mb-4">
              <div className="text-[10px] text-zinc-600 text-center font-mono">nRF52833</div>
            </div>

            {/* LED Grid */}
            <div className="grid grid-cols-5 gap-1.5 p-2 bg-zinc-950 rounded">
              {BIRD_LED.map((led, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-5 h-5 rounded-sm transition-all duration-300",
                    led
                      ? hovered
                        ? "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"
                        : "bg-red-500/70"
                      : "bg-zinc-800"
                  )}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4 px-2">
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-400">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-400">
                B
              </div>
            </div>

            {/* Bottom connector */}
            <div className="flex gap-2 mt-4 justify-center">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="w-3 h-2 bg-zinc-700 rounded-sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center space-y-1">
          <p className="text-zinc-300 text-sm font-medium">Flappy Bird</p>
          <p className="text-zinc-500 text-xs">
            Joc desenvolupat amb MicroPython
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            <a href={`${basePath}/microbit-flappy-bird.hex`} download="flappy-bird.hex">
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
              <ExternalLink className="h-4 w-4 mr-2" />
              Obrir MakeCode
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}