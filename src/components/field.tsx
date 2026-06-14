import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type BaseProps = {
  label?: string
  hint?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

/** Campo de texto multilínea con etiqueta opcional. */
export function TextareaField({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: BaseProps & { rows?: number }) {
  return (
    <div className="space-y-1.5">
      {label ? <Label className="block">{label}</Label> : null}
      {hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
      <Textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

/** Campo de una línea con etiqueta opcional. */
export function InputField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = "text",
}: BaseProps & { type?: string }) {
  return (
    <div className="space-y-1.5">
      {label ? <Label className="block">{label}</Label> : null}
      {hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
