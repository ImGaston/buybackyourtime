import { DynamicList } from "@/components/dynamic-list"
import { ExerciseCard } from "@/components/exercise-card"
import { useLocalStorage } from "@/hooks/use-local-storage"

const SQUARES = [
  { key: "team", name: "Team", desc: "Cómo se ve tu equipo ideal." },
  { key: "empire", name: "Empire", desc: "Tu portfolio / activos a 10x." },
  { key: "business", name: "One Business", desc: "Tu negocio principal a futuro." },
  { key: "lifestyle", name: "Lifestyle", desc: "Tu estilo de vida ideal." },
] as const

type Data = Record<string, string[]>
const empty: Data = Object.fromEntries(SQUARES.map((s) => [s.key, []]))

export function VisionMap() {
  const [data, setData] = useLocalStorage<Data>("vision-map", empty)

  return (
    <ExerciseCard
      name="The 10x Vision Map"
      description="Para cada cuadrante, listá 3 a 5 cosas que describan tu futuro ideal multiplicado por 10. Sé específico."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {SQUARES.map((s) => (
          <div key={s.key} className="rounded-lg border p-3">
            <p className="text-sm font-medium">{s.name}</p>
            <p className="mb-2 text-xs text-muted-foreground">{s.desc}</p>
            <DynamicList
              items={data[s.key] ?? []}
              onChange={(v) => setData({ ...data, [s.key]: v })}
              placeholder="..."
            />
          </div>
        ))}
      </div>
    </ExerciseCard>
  )
}
