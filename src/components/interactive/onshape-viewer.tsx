"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cube, ArrowClockwise, ArrowsOut, Link } from "@phosphor-icons/react"

interface OnshapeViewerProps {
  modelUrl?: string
  documentUrl?: string
  title?: string
  className?: string
}

export function OnshapeViewer({
  modelUrl,
  documentUrl,
  title = "Model 3D",
  className,
}: OnshapeViewerProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const viewerRef = React.useRef<any>(null)

  // Toggle fullscreen
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

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Initialize model-viewer
  React.useEffect(() => {
    if (!modelUrl || !viewerRef.current) return

    const initViewer = async () => {
      try {
        // Dynamic import of model-viewer
        await import("@google/model-viewer")
        setIsLoading(false)
        setHasError(false)
      } catch (error) {
        console.error("Failed to load model-viewer:", error)
        setIsLoading(false)
        setHasError(true)
      }
    }

    initViewer()
  }, [modelUrl])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-muted/50 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Cube className="h-4 w-4" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {documentUrl && (
              <Button
                size="sm"
                variant="ghost"
                asChild
              >
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Link className="h-4 w-4 mr-1" />
                  Onshape
                </a>
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleFullscreen}
            >
              <ArrowsOut className="h-4 w-4" />
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
          {modelUrl && !hasError ? (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                  <div className="text-zinc-400 text-sm">Carregant model...</div>
                </div>
              )}
              <div
                ref={viewerRef}
                className={cn(
                  "w-full bg-zinc-900",
                  isFullscreen ? "h-[80vh] max-w-4xl" : "aspect-square"
                )}
              >
                {/* @ts-ignore - model-viewer is a custom element */}
                <model-viewer
                  src={modelUrl}
                  alt={title}
                  camera-controls
                  auto-rotate
                  rotation-per-second="30deg"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </>
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center text-zinc-400",
                isFullscreen ? "h-[80vh] max-w-4xl" : "aspect-square"
              )}
            >
              <Cube className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-sm mb-2">
                {hasError ? "Error carregant el model" : "Model no disponible"}
              </p>
              <p className="text-xs text-zinc-500 max-w-xs text-center">
                {documentUrl
                  ? "Fes clic a \"Onshape\" per veure el model al navegador"
                  : "Afegeix un model GLTF o link a Onshape"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
