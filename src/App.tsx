import { useRef, useState, type ReactNode } from "react"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  ListChecks,
  Trash2,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ExerciseEyebrowProvider } from "@/components/exercise-card"
import { ProgressTimeline } from "@/components/progress-timeline"
import {
  clearAllData,
  exportData,
  importData,
  useLocalStorage,
} from "@/hooks/use-local-storage"
import { EXERCISES, SECTIONS } from "@/exercises/registry"

function sectionTitleFor(id: string): string {
  const s = SECTIONS.find((sec) => sec.exercises.some((e) => e.id === id))
  return s?.title ?? ""
}

function TopBar({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <header className="sticky top-0 z-30 -mx-4 mb-6 flex h-14 items-center justify-between gap-2 border-b border-border bg-background/85 px-4 backdrop-blur">
      {left}
      <div className="flex shrink-0 items-center gap-0.5">{right}</div>
    </header>
  )
}

export default function App() {
  // "" = menú; de lo contrario, id del ejercicio abierto.
  const [current, setCurrent] = useLocalStorage<string>("current", "")
  const fileInput = useRef<HTMLInputElement>(null)

  const index = EXERCISES.findIndex((e) => e.id === current)
  const exercise = index >= 0 ? EXERCISES[index] : null

  const handleClear = () => {
    if (confirm("¿Borrar todas tus respuestas? Esta acción no se puede deshacer.")) {
      clearAllData()
    }
  }

  const handleExport = () => {
    const json = JSON.stringify(exportData(), null, 2)
    const url = URL.createObjectURL(
      new Blob([json], { type: "application/json" }),
    )
    const a = document.createElement("a")
    const stamp = new Date().toISOString().slice(0, 10)
    a.href = url
    a.download = `buy-back-your-time-${stamp}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (!confirm("Importar reemplazará todas tus respuestas actuales. ¿Continuar?")) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importData(String(reader.result))
      } catch {
        alert("No se pudo importar: el archivo no es válido.")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-screen-md px-4 pb-10">
        {exercise ? (
          <DetailView
            index={index}
            onBack={() => setCurrent("")}
            onNavigate={(id) => setCurrent(id)}
          />
        ) : (
          <MenuView
            onOpen={(id) => setCurrent(id)}
            onExport={handleExport}
            onImport={() => fileInput.current?.click()}
            onClear={handleClear}
          />
        )}

        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={handleImportFile}
        />

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Basado en el workbook de “Buy Back Your Time” (Dan Martell).
        </footer>
      </div>
    </div>
  )
}

function MenuView({
  onOpen,
  onExport,
  onImport,
  onClear,
}: {
  onOpen: (id: string) => void
  onExport: () => void
  onImport: () => void
  onClear: () => void
}) {
  return (
    <>
      <TopBar
        left={
          <span className="font-display text-base font-bold tracking-tight">
            Buy Back Your Time
          </span>
        }
        right={
          <>
            <Button variant="ghost" size="icon" aria-label="Exportar" title="Exportar a JSON" onClick={onExport}>
              <Download />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Importar" title="Importar desde JSON" onClick={onImport}>
              <Upload />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Borrar todo" title="Borrar todo" onClick={onClear}>
              <Trash2 />
            </Button>
          </>
        }
      />

      <div className="mb-8">
        <p className="label-caps mb-2 text-primary">Workbook</p>
        <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight">
          Recuperá tu tiempo.
        </h1>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          Elegí un ejercicio para empezar. Tus respuestas se guardan en este
          dispositivo.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section, si) => (
          <section key={section.id}>
            <h2 className="mb-3 flex items-center gap-2.5">
              <span className="flex size-5 items-center justify-center rounded bg-foreground font-mono text-[11px] font-bold text-background">
                {si + 1}
              </span>
              <span className="label-caps text-foreground">
                {section.title}
              </span>
            </h2>
            <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
              {section.exercises.map((ex) => (
                <li key={ex.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(ex.id)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-sm font-semibold">
                        {ex.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {ex.blurb}
                      </span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

function DetailView({
  index,
  onBack,
  onNavigate,
}: {
  index: number
  onBack: () => void
  onNavigate: (id: string) => void
}) {
  const exercise = EXERCISES[index]
  const prev = index > 0 ? EXERCISES[index - 1] : null
  const next = index < EXERCISES.length - 1 ? EXERCISES[index + 1] : null
  const Component = exercise.component
  const [showProgress, setShowProgress] = useState(false)

  const eyebrow = `${sectionTitleFor(exercise.id)} · Ejercicio ${String(
    index + 1,
  ).padStart(2, "0")}`

  return (
    <>
      <TopBar
        left={
          <Button variant="ghost" size="sm" className="-ml-2" onClick={onBack}>
            <ArrowLeft />
            Ejercicios
          </Button>
        }
        right={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowProgress(true)}
          >
            <ListChecks />
            <span className="font-mono">
              {index + 1}/{EXERCISES.length}
            </span>
          </Button>
        }
      />

      {showProgress ? (
        <ProgressTimeline
          currentId={exercise.id}
          onSelect={(id) => {
            onNavigate(id)
            setShowProgress(false)
          }}
          onClose={() => setShowProgress(false)}
        />
      ) : null}

      <ExerciseEyebrowProvider value={eyebrow}>
        <Component />
      </ExerciseEyebrowProvider>

      <nav className="mt-6 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!prev}
          onClick={() => prev && onNavigate(prev.id)}
          className="flex-1"
        >
          <ChevronLeft />
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!next}
          onClick={() => next && onNavigate(next.id)}
          className="flex-1"
        >
          Siguiente
          <ChevronRight />
        </Button>
      </nav>
    </>
  )
}
