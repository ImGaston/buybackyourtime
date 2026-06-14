import { ExerciseCard } from "@/components/exercise-card"
import { TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = {
  goal: string
  process: string
  systems: string
}
const empty: Data = { goal: "", process: "", systems: "" }

export function EmailGps() {
  const [data, setData] = useLocalStorage<Data>("email-gps", empty)
  const set = (k: keyof Data) => (v: string) => setData({ ...data, [k]: v })

  return (
    <ExerciseCard
      name="Email GPS System"
      description="Diseñá un sistema para que tu bandeja de entrada se procese sin vos: objetivo, proceso y herramientas."
    >
      <TextareaField
        label="Goal — ¿Qué querés lograr con tu email?"
        value={data.goal}
        onChange={set("goal")}
      />
      <TextareaField
        label="Process — Reglas / pasos para clasificar y responder"
        value={data.process}
        onChange={set("process")}
      />
      <TextareaField
        label="Systems — Filtros, plantillas y a quién delegás"
        value={data.systems}
        onChange={set("systems")}
      />
    </ExerciseCard>
  )
}
