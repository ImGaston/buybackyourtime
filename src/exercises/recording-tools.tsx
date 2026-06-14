import { ExerciseCard } from "@/components/exercise-card"
import { Checkbox } from "@/components/ui/checkbox"
import { useLocalStorage } from "@/hooks/use-local-storage"

const TOOLS = [
  { key: "loom", name: "Loom", why: "Graba pantalla, audio y video en Mac y PC.", url: "https://www.loom.com" },
  { key: "cloudapp", name: "CloudApp", why: "Graba y comparte fácil en Mac y PC.", url: "https://www.getcloudapp.com" },
  { key: "zoom", name: "Zoom", why: "Entrená equipos remotos y grabá la reunión.", url: "https://zoom.us" },
  { key: "iphone", name: "iPhone Video", why: "Grabá cualquier cosa y guardalo para procesar.", url: "https://support.apple.com/en-us/HT207935" },
  { key: "voxer", name: "Voxer", why: "Mensajes de voz cuando estás desconectado.", url: "https://www.voxer.com" },
] as const

type Data = Record<string, boolean>
const empty: Data = Object.fromEntries(TOOLS.map((t) => [t.key, false]))

export function RecordingTools() {
  const [data, setData] = useLocalStorage<Data>("recording-tools", empty)

  return (
    <ExerciseCard
      name="Recording Tools"
      description="Herramientas sugeridas para grabar procesos. Marcá las que ya usás."
    >
      <div className="space-y-2">
        {TOOLS.map((t) => (
          <div
            key={t.key}
            className="flex items-start gap-3 rounded-lg border p-3"
          >
            <Checkbox
              className="mt-1"
              checked={data[t.key] ?? false}
              onCheckedChange={(c) => setData({ ...data, [t.key]: c === true })}
            />
            <div className="min-w-0 flex-1">
              <a
                href={t.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                {t.name}
              </a>
              <p className="text-xs text-muted-foreground">{t.why}</p>
            </div>
          </div>
        ))}
      </div>
    </ExerciseCard>
  )
}
