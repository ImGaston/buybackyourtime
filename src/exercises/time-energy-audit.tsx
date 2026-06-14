import { Plus, X } from "lucide-react"

import { ExerciseCard } from "@/components/exercise-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

type Energy = "gave" | "took" | ""
type Row = { task: string; value: number; energy: Energy }
type Data = { week1: Row[]; week2: Row[] }
const empty: Data = { week1: [], week2: [] }
const newRow = (): Row => ({ task: "", value: 0, energy: "" })

function WeekTable({
  rows,
  onChange,
}: {
  rows: Row[]
  onChange: (rows: Row[]) => void
}) {
  const update = (i: number, patch: Partial<Row>) => {
    const next = rows.slice()
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }
  return (
    <div className="space-y-2">
      {rows.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          Sin tareas todavía.
        </p>
      ) : null}
      {rows.map((row, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-wrap items-center gap-2 rounded-md border border-border p-2 transition-colors",
            row.energy === "gave" && "border-primary/40 bg-primary/5",
            row.energy === "took" && "border-tertiary/50 bg-tertiary/5",
          )}
        >
          <Input
            className="min-w-[10rem] flex-1"
            value={row.task}
            placeholder="Tarea (incrementos de 15 min)"
            onChange={(e) => update(i, { task: e.target.value })}
          />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((v) => (
              <button
                key={v}
                type="button"
                aria-label={`Valor ${v}`}
                onClick={() => update(i, { value: row.value === v ? 0 : v })}
                className={cn(
                  "size-7 rounded-md border text-sm font-medium transition-colors",
                  row.value >= v
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent",
                )}
              >
                $
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              size="sm"
              variant={row.energy === "gave" ? "default" : "outline"}
              onClick={() =>
                update(i, { energy: row.energy === "gave" ? "" : "gave" })
              }
            >
              Dio
            </Button>
            <Button
              type="button"
              size="sm"
              variant={row.energy === "took" ? "destructive" : "outline"}
              onClick={() =>
                update(i, { energy: row.energy === "took" ? "" : "took" })
              }
            >
              Quitó
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Eliminar"
              onClick={() => onChange(rows.filter((_, j) => j !== i))}
            >
              <X />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...rows, newRow()])}
      >
        <Plus />
        Agregar tarea
      </Button>
    </div>
  )
}

export function TimeEnergyAudit() {
  const [data, setData] = useLocalStorage<Data>("time-energy-audit", empty)

  return (
    <ExerciseCard
      name="Time & Energy Audit"
      description="Registrá lo que hacés durante 2 semanas. Asigná de 1 a 4 signos $ (valor) y marcá si la tarea te dio o te quitó energía."
    >
      <div className="space-y-2">
        <p className="text-sm font-medium">Semana 1</p>
        <WeekTable
          rows={data.week1}
          onChange={(v) => setData({ ...data, week1: v })}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Semana 2</p>
        <WeekTable
          rows={data.week2}
          onChange={(v) => setData({ ...data, week2: v })}
        />
      </div>
    </ExerciseCard>
  )
}
