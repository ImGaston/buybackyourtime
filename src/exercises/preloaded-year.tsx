import { Plus, X } from "lucide-react"

import { ExerciseCard } from "@/components/exercise-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Event = { date: string; title: string }
type Data = Event[]
const empty: Data = []
const newEvent = (): Event => ({ date: "", title: "" })

export function PreloadedYear() {
  const [events, setEvents] = useLocalStorage<Data>("preloaded-year", empty)
  const update = (i: number, patch: Partial<Event>) => {
    const next = events.slice()
    next[i] = { ...next[i], ...patch }
    setEvents(next)
  }
  const sorted = events
    .map((e, i) => ({ e, i }))
    .sort((a, b) => (a.e.date || "~").localeCompare(b.e.date || "~"))

  return (
    <ExerciseCard
      name="The Preloaded Year"
      description="Pre-agendá primero lo importante del año (vacaciones, eventos, retiros, cumpleaños) antes de que el trabajo llene tu calendario."
    >
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Sin eventos todavía.
          </p>
        ) : null}
        {sorted.map(({ e, i }) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              type="date"
              className="w-[9.5rem] shrink-0"
              value={e.date}
              onChange={(ev) => update(i, { date: ev.target.value })}
            />
            <Input
              value={e.title}
              placeholder="Evento a pre-agendar"
              onChange={(ev) => update(i, { title: ev.target.value })}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Eliminar"
              onClick={() => setEvents(events.filter((_, j) => j !== i))}
            >
              <X />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setEvents([...events, newEvent()])}
        >
          <Plus />
          Agregar evento
        </Button>
      </div>
    </ExerciseCard>
  )
}
