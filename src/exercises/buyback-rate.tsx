import { ExerciseCard } from "@/components/exercise-card"
import { InputField, TextareaField } from "@/components/field"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Data = { income: string; notes: string }
const empty: Data = { income: "", notes: "" }

const currency = (n: number) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })

export function BuybackRate() {
  const [data, setData] = useLocalStorage<Data>("buyback-rate", empty)
  const income = Number(data.income.replace(/[^0-9.]/g, ""))
  const valid = Number.isFinite(income) && income > 0
  const hourly = valid ? income / 2000 : 0
  const rate = hourly / 4

  return (
    <ExerciseCard
      name="The Buy Back Rate Formula"
      description="Tu Buy Back Rate ≈ (ingreso anual ÷ 2000 horas) ÷ 4. Por debajo de ese valor por hora, conviene delegar la tarea."
    >
      <InputField
        label="Ingreso anual (USD)"
        hint="Usá profit, salario o gastos según tu caso."
        type="text"
        value={data.income}
        onChange={(v) => setData({ ...data, income: v })}
        placeholder="Ej: 500000"
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <p className="text-xs text-muted-foreground">Valor por hora (÷2000)</p>
          <p className="text-lg font-semibold">
            {valid ? currency(hourly) : "—"}
          </p>
        </div>
        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">Buy Back Rate (÷4)</p>
          <p className="text-lg font-semibold">
            {valid ? currency(rate) : "—"}
          </p>
        </div>
      </div>

      <TextareaField
        label="Tareas a delegar por debajo de este valor"
        value={data.notes}
        onChange={(v) => setData({ ...data, notes: v })}
      />
    </ExerciseCard>
  )
}
