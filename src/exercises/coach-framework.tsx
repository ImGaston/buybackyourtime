import { ExerciseCard } from "@/components/exercise-card"
import { TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { core: string; actual: string; change: string }
const empty: Data = { core: "", actual: "", change: "" }

export function CoachFramework() {
  const [data, setData] = useLocalStorage<Data>("coach-framework", empty)
  const set = (k: keyof Data) => (v: string) => setData({ ...data, [k]: v })

  return (
    <ExerciseCard
      name="The CO-A-CH Framework"
      description="Para coachear a tu equipo: enfocate en el problema de fondo, compartí una historia propia y enrolá el compromiso al cambio."
    >
      <TextareaField
        label="COre issue — El principio de fondo (no el caso puntual)"
        value={data.core}
        onChange={set("core")}
      />
      <TextareaField
        label="Actual story — Una historia personal y vulnerable sobre lo mismo"
        value={data.actual}
        onChange={set("actual")}
      />
      <TextareaField
        label="CHange — El compromiso al cambio (la decisión es de ellos)"
        value={data.change}
        onChange={set("change")}
      />
    </ExerciseCard>
  )
}
