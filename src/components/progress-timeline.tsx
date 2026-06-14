import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EXERCISES, SECTIONS } from "@/exercises/registry"
import { getProgress, type Progress } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

type Map = Record<string, Progress>

const computeMap = (): Map =>
  Object.fromEntries(EXERCISES.map((e) => [e.id, getProgress(e.id)]))

/** Recalcula el estado de cada ejercicio ante cambios en localStorage. */
export function useProgressMap(): Map {
  const [map, setMap] = useState<Map>(computeMap)
  useEffect(() => {
    const update = () => setMap(computeMap())
    window.addEventListener("bbyt:change", update)
    window.addEventListener("bbyt:clear", update)
    window.addEventListener("storage", update)
    return () => {
      window.removeEventListener("bbyt:change", update)
      window.removeEventListener("bbyt:clear", update)
      window.removeEventListener("storage", update)
    }
  }, [])
  return map
}

/** Porcentaje de avance (completo = 1, parcial = 0,5). */
export function overallPercent(map: Map): number {
  const score = EXERCISES.reduce((acc, e) => {
    const s = map[e.id]
    return acc + (s === "complete" ? 1 : s === "partial" ? 0.5 : 0)
  }, 0)
  return Math.round((score / EXERCISES.length) * 100)
}

function StatusDot({
  status,
  current,
}: {
  status: Progress
  current: boolean
}) {
  const ring = current || status !== "empty"
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0">
      {current ? (
        <circle
          cx="10"
          cy="10"
          r="9"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
      ) : null}
      {/* base: tapa la línea de conexión */}
      <circle
        cx="10"
        cy="10"
        r="6"
        fill="var(--background)"
        stroke={ring ? "var(--primary)" : "var(--border)"}
        strokeWidth="1.5"
      />
      {status === "complete" ? (
        <circle cx="10" cy="10" r="6" fill="var(--primary)" />
      ) : null}
      {status === "partial" ? (
        <path d="M10 4 A6 6 0 0 0 10 16 Z" fill="var(--primary)" />
      ) : null}
    </svg>
  )
}

const STATUS_LABEL: Record<Progress, string> = {
  empty: "Sin empezar",
  partial: "En progreso",
  complete: "Completado",
}

export function ProgressTimeline({
  currentId,
  onSelect,
  onClose,
}: {
  currentId: string
  onSelect: (id: string) => void
  onClose: () => void
}) {
  const map = useProgressMap()
  const pct = overallPercent(map)

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <aside className="relative flex h-dvh w-full max-w-sm flex-col bg-background shadow-xl">
        <header className="flex items-center gap-3 border-b p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Tu progreso</p>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {pct}%
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cerrar"
            onClick={onClose}
          >
            <X />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {SECTIONS.map((section, si) => (
            <section key={section.id} className="mb-5 last:mb-0">
              <h3 className="mb-1 flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded bg-foreground font-mono text-[10px] font-bold text-background">
                  {si + 1}
                </span>
                <span className="label-caps text-muted-foreground">
                  {section.title}
                </span>
              </h3>
              <ul>
                {section.exercises.map((ex, ei) => {
                  const status = map[ex.id] ?? "empty"
                  const current = ex.id === currentId
                  const isFirst = ei === 0
                  const isLast = ei === section.exercises.length - 1
                  return (
                    <li key={ex.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(ex.id)}
                        className={cn(
                          "flex w-full items-stretch gap-3 rounded-md text-left transition-colors hover:bg-accent",
                          current && "bg-accent",
                        )}
                      >
                        {/* riel con línea de conexión */}
                        <span className="relative flex w-5 shrink-0 justify-center py-2">
                          <span
                            className={cn(
                              "absolute left-1/2 w-px -translate-x-1/2 bg-border",
                              isFirst ? "top-1/2" : "top-0",
                              isLast ? "bottom-1/2" : "bottom-0",
                            )}
                          />
                          <span className="relative z-10 flex items-center">
                            <StatusDot status={status} current={current} />
                          </span>
                        </span>
                        <span className="min-w-0 flex-1 py-2 pr-2">
                          <span
                            className={cn(
                              "block truncate text-sm",
                              current
                                ? "font-semibold"
                                : "font-medium",
                            )}
                          >
                            {ex.name}
                          </span>
                          <span
                            className={cn(
                              "block text-xs",
                              current
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          >
                            {current ? "Viendo ahora" : STATUS_LABEL[status]}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </aside>
    </div>
  )
}
