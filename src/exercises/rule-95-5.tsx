import { DynamicList } from "@/components/dynamic-list"
import { ExerciseCard } from "@/components/exercise-card"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { ninetyFive: string[]; five: string[] }
const empty: Data = { ninetyFive: [], five: [] }

export function Rule9555() {
  const [data, setData] = useLocalStorage<Data>("rule-95-5", empty)

  return (
    <ExerciseCard
      name="The 95/5 Rule"
      description="Listá todo lo que hay que hacer en el mes (95%). Después copiá al otro lado lo que solo vos podés hacer y que mueve el negocio (5%)."
    >
      <DynamicList
        label="95% — Todo lo que hay que hacer"
        items={data.ninetyFive}
        onChange={(v) => setData({ ...data, ninetyFive: v })}
        placeholder="Tarea..."
      />
      <DynamicList
        label="5% — Solo vos podés hacerlo"
        items={data.five}
        onChange={(v) => setData({ ...data, five: v })}
        placeholder="Actividad clave..."
      />
    </ExerciseCard>
  )
}
