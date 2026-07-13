"use client"

import * as React from "react"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextGenerate } from "@/components/ui/text-generate"
import { GlareCard } from "@/components/ui/glare-card"
import DotGrid from "@/components/react-bits/dot-grid"
import { motion, useReducedMotion } from "motion/react"
import { PythonTerminal } from "@/components/interactive/python-terminal"
import { MicrobitSimulator } from "@/components/interactive/microbit-simulator"
import { OnshapeViewer } from "@/components/interactive/onshape-viewer"
import {
  ArrowDown,
  Code,
  Cube,
  Envelope,
  Phone,
  MapPin,
  MusicNote,
  Globe,
  Cpu,
} from "@phosphor-icons/react"
import Link from "next/link"

const pythonExercises = [
  {
    id: "session1",
    title: "Exercici 1: Introducció al Python",
    code: `# Benvingut a Python!
print("Hola, soc Pol-Martí!")

# Variables i tipus
nom = "Pol-Martí"
edat = 18
altura = 1.75

print(f"Em dic {nom}, tinc {edat} anys i soc {altura}m d'alçada")

# Llistes
habilitats = ["Python", "Onshape", "Micro:bit", "Disseny 3D"]
print(f"Les meves habilitats: {habilitats}")`,
  },
  {
    id: "session2",
    title: "Exercici 2: Diccionaris",
    code: `# Diccionaris
projecte = {
    "nom": "Space Invaders",
    "plataforma": "Micro:bit",
    "llenguatge": "MicroPython",
    "dies": 5
}

print(f"Projecte: {projecte['nom']}")
print(f"Plataforma: {projecte['plataforma']}")

# Iterar sobre un diccionari
for clau, valor in projecte.items():
    print(f"{clau}: {valor}")`,
  },
  {
    id: "session3",
    title: "Exercici 3: Funcions",
    code: `# Funcions
def salutacio(nom, salutacio="Hola"):
    """Funció per saludar"""
    return f"{salutacio}, {nom}!"

def calcular_mitjana(notes):
    """Calcula la mitjana de les notes"""
    return sum(notes) / len(notes)

# Provar les funcions
print(salutacio("Pol-Martí"))
print(salutacio("Món", "Bona dia"))

notes = [8.5, 9.0, 7.5, 8.0, 9.5]
mitjana = calcular_mitjana(notes)
print(f"La meva mitjana és: {mitjana:.2f}")`,
  },
  {
    id: "session4",
    title: "Exercici 4: Funcions II",
    code: `# Funcions avançades
def calcular_mitjana_ponderada(notes, pesos):
    """Calcula la mitjana ponderada"""
    total_pes = sum(pesos)
    suma_ponderada = sum(n * p for n, p in zip(notes, pesos))
    return suma_ponderada / total_pes

def estadistiques(notes):
    """Retorna estadístiques bàsiques"""
    return {
        "mitjana": sum(notes) / len(notes),
        "maxima": max(notes),
        "minima": min(notes),
        "total": len(notes)
    }

# Provar les funcions
notes = [8.5, 9.0, 7.5, 8.0, 9.5]
pesos = [1, 2, 1, 1, 2]

mitjana_ponderada = calcular_mitjana_ponderada(notes, pesos)
print(f"Mitjana ponderada: {mitjana_ponderada:.2f}")

estadistiques = estadistiques(notes)
print(f"Estadístiques: {estadistiques}")`,
  },
  {
    id: "session5",
    title: "Exercici 5: Errors",
    code: `# Gestió d'errors
def dividir(a, b):
    try:
        resultat = a / b
        return resultat
    except ZeroDivisionError:
        print("Error: No es pot dividir per zero!")
        return None
    except TypeError:
        print("Error: Tipus de dada incorrecte!")
        return None

# Provar la funció
print(f"10 / 3 = {dividir(10, 3):.2f}")
print(f"10 / 0 = {dividir(10, 0)}")
print(f"10 / 'a' = {dividir(10, 'a')}")`,
  },
  {
    id: "session6",
    title: "Exercici 6: Fitxers",
    code: `# Treballar amb fitxers (simulat)
# En un entorn real, faríem servir open()

# Simular lectures de fitxer
dades_projecte = """Nom: Space Invaders
Plataforma: Micro:bit
Llenguatge: MicroPython
Dies de desenvolupament: 5
Funcionalitats: Disparar, Moure, Puntuació"""

# Processar les dades
linies = dades_projecte.split('\\n')
for linia in linies:
    clau, valor = linia.split(': ')
    print(f"{clau}: {valor}")`,
  },
]

export default function Home() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <Nav />
      <main className="flex-1 relative z-10">
        {/* Background effect - always behind content */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <DotGrid
            dotSize={2}
            gap={22}
            baseColor="#333333"
            activeColor="#ffffff"
            proximity={150}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Hero Section */}
        <section id="inicio" className="min-h-[100dvh] flex items-center relative overflow-hidden z-10">
          
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Badge variant="secondary" className="mb-6 bg-zinc-800 text-zinc-300 border-zinc-700">
                  Batxillerat Tecnològic
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold tracking-tight mb-6">
                  <TextGenerate words="Pol-Martí de Tera" />
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-lg">
                  Estudiant apassionat per la robòtica, programació i disseny 3D. 
                  Creant solucions tecnològiques amb impacte real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link href="#robotics">
                      Veure Feina
                      <ArrowDown className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#contact">
                      Contactar
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="aspect-square relative rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/profile.png`}
                    alt="Pol-Martí de Tera"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="h-3 w-3 rounded-full bg-blue-500/50" />
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <div className="h-2 w-2 rounded-full bg-green-500/50" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <SectionWrapper id="about" className="bg-zinc-900 relative z-10">
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="mb-6">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/profile.png`}
                    alt="Pol-Martí de Tera"
                    className="w-32 h-32 rounded-full object-cover border-4 border-zinc-700"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6">
                  Qui Soc Jo?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Em dic Pol-Martí de Tera i actualment estic cursant 1r de Batxillerat. 
                    Tinc un gran interès per tot el que està relacionat amb la tecnologia, 
                    especialment en àrees com la robòtica.
                  </p>
                  <p>
                    M&apos;agrada explorar com funcionen les màquines i sistemes automatitzats 
                    i m&apos;atrau la idea de crear solucions innovadores mitjançant la 
                    programació i la mecànica. També toco la bateria, una altra forma de 
                    combinar la meva passió pel ritme i la coordinació.
                  </p>
                  <p>
                    Compto amb el nivell C1 d&apos;anglès, cosa que em facilita l&apos;accés 
                    a recursos internacionals per aprendre més sobre els avanços tecnològics.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Idiomes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Català (Natiu)</Badge>
                    <Badge>Español (Natiu)</Badge>
                    <Badge>Anglès (C1)</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MusicNote className="h-5 w-5" />
                    Interessos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Robòtica</Badge>
                    <Badge variant="secondary">Programació</Badge>
                    <Badge variant="secondary">Disseny 3D</Badge>
                    <Badge variant="secondary">Bateria</Badge>
                    <Badge variant="secondary">Música</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-sm text-muted-foreground">Sessions Python</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-sm text-muted-foreground">Activitats Onshape</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-sm text-muted-foreground">Projecte Micro:bit</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-sm text-muted-foreground">Documental</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Robotics Section */}
        <SectionWrapper id="robotics" className="relative z-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
                Robotica
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                El meu viatge en el món de la robòtica i la tecnologia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlareCard>
                  <Card className="group hover:shadow-lg transition-shadow border-0 bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                      <Code className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle className="font-heading">Programació</CardTitle>
                    <CardDescription>
                      Python, MicroPython i desenvolupament de software
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Sessió introductòria, diccionaris, funcions, gestió d&apos;errors i fitxers. 
                      Desenvolupament del joc Space Invaders amb Micro:bit.
                    </p>
                  </CardContent>
                </Card>
              </GlareCard>

              <GlareCard>
                  <Card className="group hover:shadow-lg transition-shadow border-0 bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                      <Cube className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle className="font-heading">Disseny 3D</CardTitle>
                    <CardDescription>
                      Onshape i modelatge de peces mecàniques
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      7 activitats de disseny 3D amb Onshape, des de peces simples 
                      fins a muntatges complets amb restriccions i referències.
                    </p>
                  </CardContent>
                </Card>
              </GlareCard>

              <GlareCard>
                  <Card className="group hover:shadow-lg transition-shadow border-0 bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">
                      <Cpu className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle className="font-heading">Micro:bit</CardTitle>
                    <CardDescription>
                      Programació de microcontroladors i projectes pràctics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Projecte Space Invaders amb Micro:bit, utilitzant sensors, 
                      LED matrix i programació en MicroPython.
                    </p>
                  </CardContent>
                </Card>
              </GlareCard>
            </div>
          </div>
        </SectionWrapper>

        {/* Python Section with Terminal */}
        <SectionWrapper id="python" className="bg-zinc-900 relative z-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
                Exercicis Python
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                En aquesta secció trobaràs les activitats i projectes realitzats amb Python 
                durant l&apos;assignatura de Robòtica de 1r de Batxillerat.
              </p>
            </div>

            <Tabs defaultValue="session1" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                {pythonExercises.map((exercise, index) => (
                  <TabsTrigger key={exercise.id} value={exercise.id} className="text-xs">
                    Sessió {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {pythonExercises.map((exercise) => (
                <TabsContent key={exercise.id} value={exercise.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{exercise.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        Activitat pràctica amb conceptes de programació en Python.
                      </p>
                      <Badge variant="outline">Python</Badge>
                    </div>
                    <PythonTerminal initialCode={exercise.code} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </SectionWrapper>

        {/* Micro:bit Section */}
        <SectionWrapper id="microbit" className="relative z-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
                  Space Invaders
                </h2>
                <p className="text-muted-foreground mb-6">
                  En aquest projecte vaig desenvolupar un joc inspirat en el joc 
                  &quot;Space Invaders (Atari)&quot; utilitzant Micro:bit. A més, vaig tenir 
                  l&apos;oportunitat de presentar-lo a alumnes de 1r d&apos;ESO, explicant el 
                  funcionament i el procés de creació. Aquesta experiència em va permetre 
                  millorar les meves habilitats comunicatives i transmetre el meu interès 
                  per la tecnologia a un públic més jove.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">MicroPython</Badge>
                  <Badge variant="secondary">Micro:bit</Badge>
                  <Badge variant="secondary">Jocs</Badge>
                  <Badge variant="secondary">Hardware</Badge>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <p>Control amb botons esquerre i dret</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <p>Matriu de LEDs 5x5 per al display</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <p>Efectes de so amb buzzer integrat</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <p>Sistema de puntuació i vides</p>
                  </div>
                </div>
              </div>

              <MicrobitSimulator />
            </div>
          </div>
        </SectionWrapper>

        {/* Onshape Section */}
        <SectionWrapper id="onshape" className="bg-zinc-900 relative z-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
                Disseny 3D amb Onshape
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                7 activitats de modelatge 3D amb restriccions i referències
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Part Studio 1.gltf`, title: "Introduction to Part Design (I)", desc: "Primers passos en el disseny de peces", url: "https://cad.onshape.com/documents/147e11be3417fb12ca1e8132/w/ec9e39150a7fbe121b52e40e/e/6e1c71b7d6a313868abe2986" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Part Studio 1(1).gltf`, title: "Exercici 2D", desc: "Disseny 2D sense tutorial", url: "https://cad.onshape.com/documents/1bce89b7d569fddf5cf6aeed/w/2c0713355403b35d29d4dd8d/e/c73fa9588d0ec33d3cdf5ea6" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Part Studio 1(2).gltf`, title: "Introduction to Part Design (II)", desc: "Continuació del disseny de peces", url: "https://cad.onshape.com/documents/a0463daa10896162769a254d/w/c07082787c55b5519a73f02c/e/7b1b02229c7fd636d5c5724d" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Part Studio 1(3).gltf`, title: "Consolidació del Sketch 2D", desc: "Pràctica avançada de sketch 2D", url: "https://cad.onshape.com/documents/237fc1f4595ae42daf5a5733/w/25a9a47faa2d577075b9c2fd/e/7c79ed78bf44bc1767307761" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Part Studio 1(4).gltf`, title: "Consolidació de les eines 3D", desc: "Domini de les eines de modelatge 3D", url: "https://cad.onshape.com/documents/4b4fd3fb816296ff5257a42a/w/b49ae40cd8d12df6c36f0257/e/f285e4532598f75506b95b48" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Funel - Funel.gltf`, title: "Dissenya una Cadira", desc: "Projecte de disseny de mobiliari", url: "https://cad.onshape.com/documents/50e1c1726cbf5002e6638327/w/ee4e97aeec3e0abf2c7dbd45/e/3738323109a8a8aa60a7216f" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Gear Cover.gltf`, title: "Peces d'enginyeria", desc: "Disseny de peces mecàniques complexes", url: "https://cad.onshape.com/documents/810a02e0df4c5b31d441432c/w/137cf80c5c8d61474a6fdcf3/e/7bfa94b7ee689529edd24f6c" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Reflector.gltf`, title: "Reflector", desc: "Disseny de component óptic", url: "" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Part Studio 1(5).gltf`, title: "Activitat Extra", desc: "Activitat addicional de pràctica", url: "" },
                { model: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/Part Studio 1(6).gltf`, title: "Projecte Final", desc: "Projecte final de disseny 3D", url: "" },
              ].map((activity, i) => (
                <Card key={i} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    <CardDescription>{activity.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OnshapeViewer
                      modelUrl={activity.model}
                      documentUrl={activity.url || undefined}
                      title={activity.title}
                      className="aspect-square"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Contact Section */}
        <SectionWrapper id="contact" className="relative z-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
                Contacte
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                T&apos;interessa treballar junts o tens alguna pregunta?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="text-center bg-background">
                <CardContent className="pt-6">
                  <Envelope className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-1">Email</h3>
                  <a
                    href="mailto:pdeterapujol@gmail.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    pdeterapujol@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center bg-background">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-1">Telèfon</h3>
                  <a
                    href="tel:644992072"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    644 992 072
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center bg-background">
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-1">Ubicació</h3>
                  <p className="text-sm text-muted-foreground">
                    Tera, Espanya
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
