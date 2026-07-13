"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, CircleNotch, Terminal, CheckCircle, Warning } from "@phosphor-icons/react"

interface PythonTerminalProps {
  initialCode?: string
  className?: string
}

const KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await",
  "break", "class", "continue", "def", "del", "elif", "else", "except",
  "finally", "for", "from", "global", "if", "import", "in", "is",
  "lambda", "nonlocal", "not", "or", "pass", "raise", "return",
  "try", "while", "with", "yield",
])

const BUILTINS = new Set([
  "print", "len", "range", "int", "str", "float", "list", "dict",
  "set", "tuple", "bool", "input", "open", "type", "isinstance",
  "enumerate", "zip", "map", "filter", "sorted", "reversed",
  "abs", "min", "max", "sum", "round", "any", "all",
])

function highlightPython(code: string): React.ReactNode[] {
  const lines = code.split("\n")
  return lines.map((line, lineIdx) => {
    const tokens: React.ReactNode[] = []
    let i = 0

    while (i < line.length) {
      // Comments
      if (line[i] === "#") {
        tokens.push(
          <span key={`${lineIdx}-c`} className="text-zinc-500 italic">
            {line.slice(i)}
          </span>
        )
        break
      }

      // Strings (double or single quote, or triple-quoted)
      if (line[i] === '"' || line[i] === "'") {
        const quote = line[i]
        const isTriple = line.slice(i, i + 3) === quote.repeat(3)
        const endQuote = isTriple ? quote.repeat(3) : quote
        const endIdx = line.indexOf(endQuote, i + (isTriple ? 3 : 1))
        const strEnd = endIdx === -1 ? line.length : endIdx + endQuote.length
        tokens.push(
          <span key={`${lineIdx}-s${i}`} className="text-emerald-400">
            {line.slice(i, strEnd)}
          </span>
        )
        i = strEnd
        continue
      }

      // Numbers
      if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>![]/.test(line[i - 1]))) {
        let j = i
        while (j < line.length && /[0-9._eExXbo]/.test(line[j])) j++
        tokens.push(
          <span key={`${lineIdx}-n${i}`} className="text-amber-400">
            {line.slice(i, j)}
          </span>
        )
        i = j
        continue
      }

      // Words (identifiers, keywords, builtins)
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i
        while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++
        const word = line.slice(i, j)

        if (KEYWORDS.has(word)) {
          tokens.push(
            <span key={`${lineIdx}-w${i}`} className="text-violet-400 font-medium">
              {word}
            </span>
          )
        } else if (BUILTINS.has(word)) {
          tokens.push(
            <span key={`${lineIdx}-w${i}`} className="text-sky-400">
              {word}
            </span>
          )
        } else if (j < line.length && line[j] === "(") {
          tokens.push(
            <span key={`${lineIdx}-w${i}`} className="text-amber-300">
              {word}
            </span>
          )
        } else {
          tokens.push(
            <span key={`${lineIdx}-w${i}`} className="text-zinc-200">
              {word}
            </span>
          )
        }
        i = j
        continue
      }

      // Operators
      if ("=+-*/<>!&|^~%".includes(line[i])) {
        tokens.push(
          <span key={`${lineIdx}-o${i}`} className="text-rose-400">
            {line[i]}
          </span>
        )
        i++
        continue
      }

      // Brackets / parens
      if ("()[]{}".includes(line[i])) {
        tokens.push(
          <span key={`${lineIdx}-b${i}`} className="text-zinc-400">
            {line[i]}
          </span>
        )
        i++
        continue
      }

      // self / cls
      if (line.slice(i, i + 4) === "self") {
        tokens.push(
          <span key={`${lineIdx}-sf${i}`} className="text-rose-300 italic">
            self
          </span>
        )
        i += 4
        continue
      }

      // Default
      tokens.push(
        <span key={`${lineIdx}-d${i}`} className="text-zinc-300">
          {line[i]}
        </span>
      )
      i++
    }

    return (
      <div key={lineIdx} className="flex">
        <span className="w-12 text-right pr-4 text-zinc-600 select-none shrink-0 text-xs leading-6">
          {lineIdx + 1}
        </span>
        <span className="flex-1 leading-6">{tokens}</span>
      </div>
    )
  })
}

export function PythonTerminal({ initialCode = 'print("Hola, món!")', className }: PythonTerminalProps) {
  const [code, setCode] = React.useState(initialCode)
  const [output, setOutput] = React.useState<string[]>([])
  const [isRunning, setIsRunning] = React.useState(false)
  const [pyodide, setPyodide] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [cursorVisible, setCursorVisible] = React.useState(true)
  const [activeLine, setActiveLine] = React.useState(0)
  const terminalRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const highlightedRef = React.useRef<HTMLDivElement>(null)

  // Cursor blink
  React.useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [])

  // Initialize Pyodide
  React.useEffect(() => {
    const initPyodide = async () => {
      try {
        const pyodideInstance = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        })
        setPyodide(pyodideInstance)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load Pyodide:", error)
        setIsLoading(false)
      }
    }

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"
    script.async = true
    script.onload = initPyodide
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Track active line from cursor position
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    const pos = e.target.selectionStart
    const linesBefore = e.target.value.substring(0, pos).split("\n")
    setActiveLine(linesBefore.length - 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const ta = textareaRef.current
      if (!ta) return
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newCode = code.substring(0, start) + "    " + code.substring(end)
      setCode(newCode)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4
      })
    }
    if (e.key === "Enter") {
      e.preventDefault()
      const ta = textareaRef.current
      if (!ta) return
      const start = ta.selectionStart
      const before = code.substring(0, start)
      const after = code.substring(ta.selectionEnd)
      const currentLine = before.split("\n").pop() || ""
      const indent = currentLine.match(/^\s*/)?.[0] || ""
      const lastChar = before.trim().slice(-1)
      let extra = ""
      if (lastChar === ":" || lastChar === "{" || lastChar === "(" || lastChar === "[") {
        extra = "    "
      }
      const insertion = "\n" + indent + extra
      const newCode = before + insertion + after
      setCode(newCode)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + insertion.length
      })
    }
  }

  // Sync scroll between textarea and highlight overlay
  const handleScroll = () => {
    const ta = textareaRef.current
    const hl = highlightedRef.current
    if (ta && hl) {
      hl.scrollTop = ta.scrollTop
      hl.scrollLeft = ta.scrollLeft
    }
  }

  // Run Python code
  const runCode = async () => {
    if (!pyodide || isRunning) return
    setIsRunning(true)
    setOutput([])

    try {
      pyodide.runPython(`
import sys
from io import StringIO
stdout = StringIO()
stderr = StringIO()
sys.stdout = stdout
sys.stderr = stderr
      `)
      pyodide.runPython(code)
      const stdout = pyodide.runPython("stdout.getvalue()")
      const stderr = pyodide.runPython("stderr.getvalue()")
      pyodide.runPython("sys.stdout = sys.__stdout__")
      pyodide.runPython("sys.stderr = sys.__stderr__")

      const newOutput: string[] = []
      if (stdout) newOutput.push(...stdout.split("\n").filter(Boolean))
      if (stderr) newOutput.push(...stderr.split("\n").filter(Boolean))
      setOutput(newOutput.length > 0 ? newOutput : ["(sense sortida)"])
    } catch (error: any) {
      setOutput([`Error: ${error.message}`])
    } finally {
      setIsRunning(false)
    }
  }

  const clearOutput = () => setOutput([])

  React.useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const highlighted = highlightPython(code)

  return (
    <Card className={cn("overflow-hidden border-zinc-800", className)}>
      {/* Tab bar */}
      <div className="flex items-center justify-between bg-zinc-900 border-b border-zinc-800 px-4 py-0">
        <div className="flex items-center gap-0">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b-2 border-emerald-500 text-sm text-zinc-200 bg-zinc-800/50">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            main.py
          </div>
        </div>
        <div className="flex items-center gap-1.5 py-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={clearOutput}
            disabled={isRunning}
            className="h-7 text-xs text-zinc-400 hover:text-zinc-200"
          >
            Netejar
          </Button>
          <Button
            size="sm"
            onClick={runCode}
            disabled={isLoading || isRunning}
            className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            {isRunning ? (
              <CircleNotch className="h-3.5 w-3.5 animate-spin mr-1" />
            ) : (
              <Play className="h-3.5 w-3.5 mr-1" weight="fill" />
            )}
            Executar
          </Button>
        </div>
      </div>

      <CardContent className="p-0">
        {/* Code Editor with line numbers + syntax highlight */}
        <div className="relative bg-zinc-950 h-56 overflow-hidden">
          {/* Syntax highlight layer (behind) */}
          <div
            ref={highlightedRef}
            className="absolute inset-0 overflow-hidden pointer-events-none font-mono text-sm p-4 whitespace-pre overflow-x-auto"
            style={{ tabSize: 4 }}
          >
            {highlighted.map((line, i) => (
              <div key={i} className={cn(
                "h-6 flex items-center",
                i === activeLine && "bg-zinc-800/60 -mx-4 px-4 border-l-2 border-emerald-500"
              )}>
                {line}
              </div>
            ))}
            {/* Breathing cursor */}
            <span
              className="absolute w-0.5 h-5 bg-emerald-400 transition-opacity duration-100"
              style={{
                opacity: cursorVisible ? 1 : 0,
                top: `${activeLine * 24 + 16}px`,
                left: `${(code.split("\n")[activeLine]?.length || 0) * 9.6 + 48 + 16}px`,
              }}
            />
          </div>

          {/* Transparent textarea (on top, for input) */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            onClick={(e) => {
              const ta = e.currentTarget
              const pos = ta.selectionStart
              const linesBefore = code.substring(0, pos).split("\n")
              setActiveLine(linesBefore.length - 1)
            }}
            className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-transparent caret-transparent resize-none focus:outline-none focus:ring-0"
            style={{ tabSize: 4 }}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
          />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between bg-zinc-900 border-t border-zinc-800 px-4 py-1 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span>Python 3.x</span>
            <span>·</span>
            <span>Ln {activeLine + 1}</span>
          </div>
          <div className="flex items-center gap-3">
            {isRunning && (
              <span className="flex items-center gap-1 text-amber-400">
                <CircleNotch className="h-3 w-3 animate-spin" />
                Executant...
              </span>
            )}
            {!isLoading && !isRunning && (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="h-3 w-3" />
                Preparat
              </span>
            )}
          </div>
        </div>

        {/* Output Terminal */}
        <div
          ref={terminalRef}
          className="h-40 overflow-auto bg-zinc-950 border-t border-zinc-800 p-4 font-mono text-sm"
        >
          {isLoading ? (
            <div className="text-zinc-400 flex items-center gap-2">
              <CircleNotch className="h-4 w-4 animate-spin text-amber-400" />
              <span className="text-zinc-500">Carregant Python...</span>
            </div>
          ) : output.length === 0 ? (
            <div className="text-zinc-600 flex items-center gap-2">
              <span className="text-emerald-500">&gt;&gt;&gt;</span>
              <span>Fes clic a &quot;Executar&quot; per veure la sortida...</span>
              <span className={cn("inline-block w-2 h-4 bg-emerald-500", cursorVisible ? "opacity-100" : "opacity-0")} />
            </div>
          ) : (
            output.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "whitespace-pre-wrap flex items-start gap-2",
                  line.startsWith("Error:") ? "text-rose-400" : "text-emerald-300"
                )}
              >
                {line.startsWith("Error:") ? (
                  <Warning className="h-4 w-4 mt-0.5 shrink-0 text-rose-500" />
                ) : (
                  <span className="text-emerald-600 select-none shrink-0">▸</span>
                )}
                <span>{line}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
