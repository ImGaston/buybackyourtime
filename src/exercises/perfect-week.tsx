import { DynamicList } from "@/components/dynamic-list"
import { ExerciseCard } from "@/components/exercise-card"
import { TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { ingredients: string[]; notes: string }
const empty: Data = { ingredients: [], notes: "" }

export function PerfectWeek() {
  const [data, setData] = useLocalStorage<Data>("perfect-week", empty)

  return (
    <ExerciseCard
      name="Your Perfect Week"
      description="Listá los 'ingredientes' —todo lo que querés que pase— que harían de tu semana la ideal. Después ubicalos en tu calendario."
    >
      <DynamicList
        label="Ingredients"
        hint="Trabajo profundo, gimnasio, familia, hobbies, descanso..."
        items={data.ingredients}
        onChange={(v) => setData({ ...data, ingredients: v })}
        placeholder="Ingrediente..."
      />
      <TextareaField
        label="Cómo los distribuís en la semana"
        value={data.notes}
        onChange={(v) => setData({ ...data, notes: v })}
      />
    </ExerciseCard>
  )
}
