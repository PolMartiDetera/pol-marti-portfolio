"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Gamepad2 } from "lucide-react"

interface MicrobitSimulatorProps {
  className?: string
}

// Pre-computed LED patterns for the Flappy Bird animation
const BIRD_FRAMES = [
  // Frame 1 - wings up
  [1, 0, 0, 0, 0,  0, 0, 1, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0],
  // Frame 2 - wings mid
  [0, 0, 0, 0, 0,  0, 0, 1, 0, 0,  0, 0, 1, 1, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0],
  // Frame 3 - wings down
  [0, 0, 0, 0, 0,  0, 0, 1, 0, 0,  0, 0, 0, 0, 0,  0, 0, 1, 0, 0,  0, 0, 0, 0, 0],
]

const PIPE_FRAMES = [
  // Pipe at column 3-4, rows 0-1 and 3-4 (gap at row 2)
  [0, 0, 0, 1, 1,  0, 0, 0, 1, 1,  0, 0, 0, 0, 0,  0, 0, 0, 1, 1,  0, 0, 0, 1, 1],
  // Pipe moves left
  [0, 0, 1, 1, 0,  0, 0, 1, 1, 0,  0, 0, 0, 0, 0,  0, 0, 1, 1, 0,  0, 0, 1, 1, 0],
]

export function MicrobitSimulator({ className }: MicrobitSimulatorProps) {
  const [frame, setFrame] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  // LED state: 25 LEDs, 1 = lit, 0 = off
  const getLeds = React.useCallback(() => {
    if (gameOver) {
      // Show "X" pattern for game over
      return [1,0,0,0,1, 0,1,0,1,0, 0,0,1,0,0, 0,1,0,1,0, 1,0,0,0,1]
    }
    if (!isRunning) {
      // Idle: show bird in center
      return [0,0,0,0,0, 0,0,1,0,0, 0,0,1,1,0, 0,0,0,0,0, 0,0,0,0,0]
    }
    // Combine bird frame with pipe
    const bird = BIRD_FRAMES[frame % BIRD_FRAMES.length]
    const pipe = PIPE_FRAMES[Math.floor(frame / 3) % PIPE_FRAMES.length]
    return bird.map((b, i) => Math.max(b, pipe[i]))
  }, [frame, isRunning, gameOver])

  const leds = getLeds()

  const startGame = () => {
    setIsRunning(true)
    setGameOver(false)
    setScore(0)
    setFrame(0)
  }

  const stopGame = () => {
    setIsRunning(false)
    setGameOver(true)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setFrame(prev => {
          if (prev >= 20) {
            stopGame()
            return prev
          }
          if (prev > 0 && prev % 5 === 0) {
            setScore(s => s + 1)
          }
          return prev + 1
        })
      }, 400)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  return (
    <div className={cn("rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <Gamepad2 className="h-4 w-4 text-emerald-400" />
          <span className="font-medium">Simulador Micro:bit</span>
        </div>
        {isRunning && (
          <div className="text-xs text-zinc-500 font-mono">
            Puntuació: {score}
          </div>
        )}
      </div>

      {/* LED Matrix */}
      <div className="p-6 flex flex-col items-center gap-6">
        <div className="relative">
          {/* Micro:bit outline */}
          <div className="w-48 h-48 bg-zinc-900 rounded-lg border border-zinc-700/50 flex items-center justify-center relative">
            {/* PCB traces decoration */}
            <div className="absolute inset-2 border border-zinc-800/30 rounded" />
            
            {/* LED Grid */}
            <div className="grid grid-cols-5 gap-2 p-3">
              {leds.map((led, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-6 h-6 rounded-sm transition-all duration-150",
                    led ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-zinc-800"
                  )}
                />
              ))}
            </div>

            {/* Button A */}
            <button
              onClick={() => isRunning && setScore(s => s + 1)}
              className="absolute left-2 bottom-1/4 w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500 transition-colors flex items-center justify-center text-xs text-zinc-400"
              aria-label="Button A"
            >
              A
            </button>

            {/* Button B */}
            <button
              onClick={() => isRunning && setFrame(f => f + 2)}
              className="absolute right-2 bottom-1/4 w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500 transition-colors flex items-center justify-center text-xs text-zinc-400"
              aria-label="Button B"
            >
              B
            </button>

            {/* LED indicator */}
            <div className={cn(
              "absolute top-3 right-3 w-2 h-2 rounded-full transition-colors",
              isRunning ? "bg-green-500" : gameOver ? "bg-red-500" : "bg-zinc-600"
            )} />
          </div>
        </div>

        {/* Game info */}
        <div className="text-center space-y-2">
          <p className="text-zinc-400 text-sm">Flappy Bird — BBC Micro:bit</p>
          <p className="text-zinc-600 text-xs">
            {isRunning 
              ? "Fes clic a A o B per controlar l\'ocell"
              : gameOver 
                ? `Joc acabat! Puntuació: ${score}`
                : "Descarrega el fitxer .hex i carrega\'l al teu Micro:bit"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!isRunning ? (
            <Button
              size="sm"
              onClick={startGame}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {gameOver ? "Tornar a Jugar" : "Iniciar Simulació"}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="destructive"
              onClick={stopGame}
            >
              Aturar
            </Button>
          )}
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
              MakeCode
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}