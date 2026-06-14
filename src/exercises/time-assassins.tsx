import { ExerciseCard } from "@/components/exercise-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLocalStorage } from "@/hooks/use-local-storage"

const ASSASSINS = [
  { key: "staller", name: "The Staller", desc: "Dudás ante las decisiones grandes." },
  { key: "speed", name: "The Speed Demon", desc: "Decidís demasiado rápido (lo más fácil/barato)." },
  { key: "supervisor", name: "The Supervisor", desc: "No entrenás bien y terminás microgestionando." },
  { key: "saver", name: "The Saver", desc: "Acumulás dinero pero no lo invertís en crecer." },
  { key: "self", name: "The Self-Medicator", desc: "Recompensás éxito/escape con vicios." },
] as const

type Item = { checked: boolean; notes: string }
type Data = Record<string, Item>
const empty: Data = Object.fromEntries(
  ASSASSINS.map((a) => [a.key, { checked: false, notes: "" }]),
)

export function TimeAssassins() {
  const [data, setData] = useLocalStorage<Data>("time-assassins", empty)
  const update = (key: string, patch: Partial<Item>) =>
    setData({ ...data, [key]: { ...data[key], ...patch } })

  return (
    <ExerciseCard
      name="The 5 Time Assassins"
      description="Marcá con cuáles te identificás y anotá cómo aparecen en tu día a día."
    >
      <div className="space-y-5">
        {ASSASSINS.map((a) => {
          const item = data[a.key] ?? { checked: false, notes: "" }
          return (
            <div key={a.key} className="space-y-2 rounded-lg border p-3">
              <label className="flex items-start gap-2.5">
                <Checkbox
                  className="mt-0.5"
                  checked={item.checked}
                  onCheckedChange={(c) =>
                    update(a.key, { checked: c === true })
                  }
                />
                <span>
                  <span className="block text-sm font-medium">{a.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {a.desc}
                  </span>
                </span>
              </label>
              <div className="space-y-1.5">
                <Label className="block text-xs">Notas</Label>
                <Textarea
                  value={item.notes}
                  onChange={(e) => update(a.key, { notes: e.target.value })}
                  placeholder="¿Cómo se manifiesta en tu caso?"
                />
              </div>
            </div>
          )
        })}
      </div>
    </ExerciseCard>
  )
}
