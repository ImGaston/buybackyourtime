import { DynamicList } from "@/components/dynamic-list"
import { ExerciseCard } from "@/components/exercise-card"
import { useLocalStorage } from "@/hooks/use-local-storage"

const QUADRANTS = [
  { key: "delegation", name: "Delegation", desc: "Bajo valor / baja energía. Delegá primero." },
  { key: "replacement", name: "Replacement", desc: "Bajo valor / alta energía. Reemplazate acá." },
  { key: "investment", name: "Investment", desc: "Alto valor / baja energía. Invertí en aprenderlo." },
  { key: "production", name: "Production", desc: "Alto valor / alta energía. Tu zona genial." },
] as const

type Data = Record<string, string[]>
const empty: Data = Object.fromEntries(QUADRANTS.map((q) => [q.key, []]))

export function DripQuadrant() {
  const [data, setData] = useLocalStorage<Data>("drip-quadrant", empty)

  return (
    <ExerciseCard
      name="The DRIP Quadrant"
      description="Clasificá tus tareas en los cuatro cuadrantes según el valor que generan y la energía que te dan."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {QUADRANTS.map((q) => (
          <div key={q.key} className="rounded-lg border p-3">
            <p className="text-sm font-medium">{q.name}</p>
            <p className="mb-2 text-xs text-muted-foreground">{q.desc}</p>
            <DynamicList
              items={data[q.key] ?? []}
              onChange={(v) => setData({ ...data, [q.key]: v })}
              placeholder="Tarea..."
            />
          </div>
        ))}
      </div>
    </ExerciseCard>
  )
}
