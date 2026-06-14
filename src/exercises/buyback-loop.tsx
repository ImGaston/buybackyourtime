import { ExerciseCard } from "@/components/exercise-card"
import { TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { pain: string; audit: string; transfer: string; fill: string }
const empty: Data = { pain: "", audit: "", transfer: "", fill: "" }

export function BuybackLoop() {
  const [data, setData] = useLocalStorage<Data>("buyback-loop", empty)
  const set = (k: keyof Data) => (v: string) => setData({ ...data, [k]: v })

  return (
    <ExerciseCard
      name="The Buyback Loop"
      description="El ciclo para recomprar tu tiempo: detectá el dolor, audita, transferí y llená ese espacio con trabajo de alto valor."
    >
      <TextareaField
        label="Pain? — ¿Qué te genera dolor / drena tu energía?"
        value={data.pain}
        onChange={set("pain")}
      />
      <TextareaField
        label="Audit — ¿En qué se va tu tiempo?"
        value={data.audit}
        onChange={set("audit")}
      />
      <TextareaField
        label="Transfer — ¿Qué vas a delegar y a quién?"
        value={data.transfer}
        onChange={set("transfer")}
      />
      <TextareaField
        label="Fill — ¿Con qué llenás ese tiempo liberado?"
        value={data.fill}
        onChange={set("fill")}
      />
    </ExerciseCard>
  )
}
