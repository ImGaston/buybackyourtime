import { createContext, useContext, type ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"

/** Eyebrow (ej. "DIAGNÓSTICO · EJERCICIO 01") inyectado por la vista detalle. */
const EyebrowContext = createContext<string | null>(null)

export function ExerciseEyebrowProvider({
  value,
  children,
}: {
  value: string | null
  children: ReactNode
}) {
  return (
    <EyebrowContext.Provider value={value}>{children}</EyebrowContext.Provider>
  )
}

type ExerciseCardProps = {
  /** Nombre del ejercicio (en inglés, término del libro). */
  name: string
  /** Instrucción / descripción breve en español. */
  description?: string
  children: ReactNode
}

export function ExerciseCard({
  name,
  description,
  children,
}: ExerciseCardProps) {
  const eyebrow = useContext(EyebrowContext)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {eyebrow ? (
          <p className="label-caps text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight">
          {name}
        </h1>
        {description ? (
          <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      <Card>
        <CardContent className="space-y-4 p-5">{children}</CardContent>
      </Card>
    </div>
  )
}
