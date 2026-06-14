import { DynamicList } from "@/components/dynamic-list"
import { ExerciseCard } from "@/components/exercise-card"
import { TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { challenge: string; options: string[]; suggestion: string }
const empty: Data = { challenge: "", options: ["", "", ""], suggestion: "" }

export function Rule131() {
  const [data, setData] = useLocalStorage<Data>("rule-1-3-1", empty)

  return (
    <ExerciseCard
      name="The 1-3-1 Rule"
      description="Quien te trae un problema debe traer: 1 desafío, 3 opciones viables y 1 recomendación. Practicalo con un caso real."
    >
      <TextareaField
        label="1 · Challenge — El problema"
        value={data.challenge}
        onChange={(v) => setData({ ...data, challenge: v })}
      />
      <DynamicList
        label="3 · Viable Options — Opciones posibles"
        items={data.options}
        onChange={(v) => setData({ ...data, options: v })}
        placeholder="Opción..."
      />
      <TextareaField
        label="1 · Suggestion — Tu recomendación"
        value={data.suggestion}
        onChange={(v) => setData({ ...data, suggestion: v })}
      />
    </ExerciseCard>
  )
}
