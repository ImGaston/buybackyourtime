import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DynamicListProps = {
  label?: string
  hint?: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
  addLabel?: string
}

/** Lista editable de texto: agregar, editar y eliminar filas. */
export function DynamicList({
  label,
  hint,
  items,
  onChange,
  placeholder,
  addLabel = "Agregar",
}: DynamicListProps) {
  const update = (index: number, value: string) => {
    const next = items.slice()
    next[index] = value
    onChange(next)
  }
  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }
  const add = () => onChange([...items, ""])

  return (
    <div className="space-y-2">
      {label ? <Label className="block">{label}</Label> : null}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Sin elementos todavía.
          </p>
        ) : null}
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Eliminar"
              onClick={() => remove(i)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus />
        {addLabel}
      </Button>
    </div>
  )
}
