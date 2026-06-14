import { ExerciseCard } from "@/components/exercise-card"
import { InputField } from "@/components/field"
import { DynamicList } from "@/components/dynamic-list"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { insights: string[]; actions: string[] }
const empty: Data = { insights: ["", "", ""], actions: [] }

export function InsightsActions() {
  const [data, setData] = useLocalStorage<Data>("insights-actions", empty)
  const setInsight = (i: number) => (v: string) => {
    const next = data.insights.slice()
    next[i] = v
    setData({ ...data, insights: next })
  }

  return (
    <ExerciseCard
      name="Insights & Actions"
      description="Cerrá el workbook con tus conclusiones: los 3 insights más grandes y las acciones que vas a tomar ya."
    >
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <InputField
            key={i}
            label={`Insight ${i + 1}`}
            value={data.insights[i] ?? ""}
            onChange={setInsight(i)}
          />
        ))}
      </div>
      <DynamicList
        label="Acciones que puedo tomar ahora"
        items={data.actions}
        onChange={(v) => setData({ ...data, actions: v })}
        placeholder="Acción..."
      />
    </ExerciseCard>
  )
}
