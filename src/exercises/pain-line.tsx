import { ExerciseCard } from "@/components/exercise-card"
import { TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { current: string; stall: string; sabotage: string; sell: string }
const empty: Data = { current: "", stall: "", sabotage: "", sell: "" }

export function PainLine() {
  const [data, setData] = useLocalStorage<Data>("pain-line", empty)
  const set = (k: keyof Data) => (v: string) => setData({ ...data, [k]: v })

  return (
    <ExerciseCard
      name="The Pain Line"
      description="A medida que crece el negocio aparece la 'línea del dolor'. Identificá dónde estás hoy y cómo se manifiesta cada reacción."
    >
      <TextareaField
        label="¿Dónde te ubicás hoy?"
        hint="Tu nivel de facturación / dolor actual."
        value={data.current}
        onChange={set("current")}
        placeholder="Ej: $500k, sintiendo mucha carga operativa..."
      />
      <TextareaField
        label="Stall — decidís NO crecer"
        value={data.stall}
        onChange={set("stall")}
      />
      <TextareaField
        label="Sabotage — decisiones que frenan tu crecimiento"
        value={data.sabotage}
        onChange={set("sabotage")}
      />
      <TextareaField
        label="Sell — querés salir a cualquier costo"
        value={data.sell}
        onChange={set("sell")}
      />
    </ExerciseCard>
  )
}
