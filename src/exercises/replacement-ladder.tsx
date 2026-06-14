import { ExerciseCard } from "@/components/exercise-card"
import { InputField, TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

const RUNGS = [
  { key: "admin", name: "Administrative", desc: "Asistente / tareas administrativas." },
  { key: "delivery", name: "Delivery", desc: "Quien ejecuta y entrega el producto/servicio." },
  { key: "marketing", name: "Marketing", desc: "Generación de demanda y contenido." },
  { key: "sales", name: "Sales", desc: "Quien cierra ventas." },
  { key: "leadership", name: "Leadership", desc: "Líderes que dirigen equipos." },
] as const

type Item = { who: string; notes: string }
type Data = Record<string, Item>
const empty: Data = Object.fromEntries(
  RUNGS.map((r) => [r.key, { who: "", notes: "" }]),
)

export function ReplacementLadder() {
  const [data, setData] = useLocalStorage<Data>("replacement-ladder", empty)
  const update = (key: string, patch: Partial<Item>) =>
    setData({ ...data, [key]: { ...data[key], ...patch } })

  return (
    <ExerciseCard
      name="The Replacement Ladder"
      description="El orden recomendado para reemplazarte. Para cada peldaño anotá a quién contratar y qué delegar."
    >
      <div className="space-y-4">
        {RUNGS.map((r, idx) => {
          const item = data[r.key] ?? { who: "", notes: "" }
          return (
            <div key={r.key} className="rounded-lg border p-3 space-y-3">
              <div>
                <p className="text-sm font-medium">
                  {idx + 1}. {r.name}
                </p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <InputField
                label="¿A quién contratar?"
                value={item.who}
                onChange={(v) => update(r.key, { who: v })}
                placeholder="Nombre / rol / fecha objetivo"
              />
              <TextareaField
                label="¿Qué delegar?"
                value={item.notes}
                onChange={(v) => update(r.key, { notes: v })}
              />
            </div>
          )
        })}
      </div>
    </ExerciseCard>
  )
}
