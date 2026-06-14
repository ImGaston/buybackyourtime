import { Plus, X } from "lucide-react"

import { ExerciseCard } from "@/components/exercise-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Row = { task: string; member: string; outline: string }
type Data = Row[]
const empty: Data = []
const newRow = (): Row => ({ task: "", member: "", outline: "" })

export function CamcorderShotList() {
  const [rows, setRows] = useLocalStorage<Data>("camcorder-shot-list", empty)
  const update = (i: number, patch: Partial<Row>) => {
    const next = rows.slice()
    next[i] = { ...next[i], ...patch }
    setRows(next)
  }

  return (
    <ExerciseCard
      name="The Camcorder Shot List"
      description="Antes de delegar, grabate haciendo la tarea. Listá qué grabar, para quién y el guion de cada video."
    >
      <div className="space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Sin videos todavía.
          </p>
        ) : null}
        {rows.map((row, i) => (
          <div key={i} className="space-y-2 rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Input
                value={row.task}
                placeholder="Tarea a grabar"
                onChange={(e) => update(i, { task: e.target.value })}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Eliminar"
                onClick={() => setRows(rows.filter((_, j) => j !== i))}
              >
                <X />
              </Button>
            </div>
            <Input
              value={row.member}
              placeholder="Miembro del equipo"
              onChange={(e) => update(i, { member: e.target.value })}
            />
            <Textarea
              value={row.outline}
              placeholder="Guion / outline del video"
              onChange={(e) => update(i, { outline: e.target.value })}
            />
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setRows([...rows, newRow()])}
        >
          <Plus />
          Agregar video
        </Button>
      </div>
    </ExerciseCard>
  )
}
