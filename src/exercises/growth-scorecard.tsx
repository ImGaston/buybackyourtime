import { ExerciseCard } from "@/components/exercise-card"
import { Input } from "@/components/ui/input"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

type Row = { tactic: string; impact: number; confidence: number; ease: number }
type Data = Row[]
const newRow = (): Row => ({ tactic: "", impact: 0, confidence: 0, ease: 0 })
const empty: Data = Array.from({ length: 5 }, newRow)

const clamp = (n: number) => Math.max(0, Math.min(10, n))

function ScoreInput({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) {
  return (
    <Input
      type="number"
      min={0}
      max={10}
      className="w-16 text-center"
      value={value || ""}
      onChange={(e) => onChange(clamp(Number(e.target.value)))}
    />
  )
}

export function GrowthScorecard() {
  const [rows, setRows] = useLocalStorage<Data>("growth-scorecard", empty)
  const update = (i: number, patch: Partial<Row>) => {
    const next = rows.slice()
    next[i] = { ...next[i], ...patch }
    setRows(next)
  }

  return (
    <ExerciseCard
      name="Growth Tactic Scorecard"
      description="Listá 5 tácticas de crecimiento y puntuá cada una de 1 a 10 en Impacto, Confianza y Facilidad. El total te ordena las prioridades."
    >
      <div className="space-y-3">
        <div className="hidden grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 px-1 text-xs font-medium text-muted-foreground sm:grid">
          <span>Táctica</span>
          <span className="w-16 text-center">Impact</span>
          <span className="w-16 text-center">Conf.</span>
          <span className="w-16 text-center">Ease</span>
          <span className="w-12 text-center">Total</span>
        </div>
        {rows.map((row, i) => {
          const total = row.impact + row.confidence + row.ease
          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 rounded-lg border p-2 sm:border-0 sm:p-1"
            >
              <Input
                className="col-span-5 sm:col-span-1"
                value={row.tactic}
                placeholder={`Táctica ${i + 1}`}
                onChange={(e) => update(i, { tactic: e.target.value })}
              />
              <ScoreInput
                value={row.impact}
                onChange={(n) => update(i, { impact: n })}
              />
              <ScoreInput
                value={row.confidence}
                onChange={(n) => update(i, { confidence: n })}
              />
              <ScoreInput
                value={row.ease}
                onChange={(n) => update(i, { ease: n })}
              />
              <span
                className={cn(
                  "w-12 text-center text-sm font-semibold",
                  total >= 24 && "text-green-600",
                )}
              >
                {total}
              </span>
            </div>
          )
        })}
      </div>
    </ExerciseCard>
  )
}
