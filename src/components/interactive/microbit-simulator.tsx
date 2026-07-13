"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Code2, Play } from "lucide-react"

interface MicrobitSimulatorProps {
  className?: string
}

const MAKECODE_URL = "https://makecode.microbit.org/S25148-21398-20552-87081"

const MICROBIT_CODE = `from microbit import *

# Flappy Bird - Micro:bit v2
bird_y = 2
score = 0
pipes = []
game_over = False

def draw_bird(y):
    display.set_pixel(1, y, 9)

def draw_pipes():
    for pipe in pipes:
        x, gap = pipe
        for row in range(5):
            if row != gap and row != gap + 1:
                display.set_pixel(x, row, 4)

def move_pipes():
    global pipes
    new_pipes = []
    for x, gap in pipes:
        if x > 0:
            new_pipes.append((x - 1, gap))
    pipes = new_pipes

def add_pipe():
    from random import randint
    gap = randint(1, 3)
    pipes.append((4, gap))

while not game_over:
    display.clear()
    draw_bird(bird_y)
    draw_pipes()
    
    if button_a.was_pressed():
        bird_y = max(0, bird_y - 1)
    if button_b.was_pressed():
        bird_y = min(4, bird_y + 1)
    
    move_pipes()
    
    if len(pipes) == 0 or pipes[-1][0] < 3:
        add_pipe()
    
    score += 1
    display.scroll(str(score), 80)
    sleep(200)

display.scroll("GAME OVER! Score: " + str(score))`

export function MicrobitSimulator({ className }: MicrobitSimulatorProps) {
  const [iframeLoaded, setIframeLoaded] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"simulator" | "code">("simulator")
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  return (
    <div className={cn("rounded-2xl overflow-hidden", className)}>
      {/* Gradient border wrapper */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-zinc-700/50 via-zinc-800/30 to-zinc-700/50">
        <div className="rounded-2xl bg-zinc-950 overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center justify-between border-b border-zinc-800/60">
            <div className="flex">
              <button
                onClick={() => setActiveTab("simulator")}
                className={cn(
                  "px-5 py-3 text-sm font-medium transition-colors relative",
                  activeTab === "simulator"
                    ? "text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <span className="flex items-center gap-2">
                  <Play className="h-3.5 w-3.5" />
                  Simulador
                </span>
                {activeTab === "simulator" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={cn(
                  "px-5 py-3 text-sm font-medium transition-colors relative",
                  activeTab === "code"
                    ? "text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <span className="flex items-center gap-2">
                  <Code2 className="h-3.5 w-3.5" />
                  Codi
                </span>
                {activeTab === "code" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 pr-4">
              {iframeLoaded && activeTab === "simulator" && (
                <span className="text-[11px] text-green-400/80 flex items-center gap-1.5 mr-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Actiu
                </span>
              )}
              <Button
                size="sm"
                variant="ghost"
                asChild
                className="h-7 px-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              >
                <a href={`${basePath}/microbit-flappy-bird.hex`} download="flappy-bird.hex">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  .hex
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                asChild
                className="h-7 px-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              >
                <a
                  href={MAKECODE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  MakeCode
                </a>
              </Button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "simulator" ? (
            <div className="relative w-full" style={{ minHeight: "480px" }}>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <div className="h-10 w-10 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin mx-auto" />
                    </div>
                    <p className="text-zinc-500 text-sm">Carregant simulador MakeCode...</p>
                    <p className="text-zinc-600 text-xs">Pot trigar uns segons</p>
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
          ) : (
            <div className="p-4 max-h-[480px] overflow-y-auto">
              <pre className="text-[13px] leading-relaxed font-mono text-zinc-300 whitespace-pre overflow-x-auto">
                <code>
                  {MICROBIT_CODE.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="select-none text-zinc-600 w-8 text-right pr-4 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className={cn(
                        line.startsWith("#") ? "text-zinc-500 italic" :
                        line.includes("def ") ? "text-purple-400" :
                        line.includes("while ") || line.includes("if ") || line.includes("for ") || line.includes("else:") ? "text-blue-400" :
                        line.includes("from ") || line.includes("import ") ? "text-pink-400" :
                        line.includes("display.") ? "text-amber-400" :
                        line.includes("button_") ? "text-green-400" :
                        "text-zinc-300"
                      )}>
                        {line}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
