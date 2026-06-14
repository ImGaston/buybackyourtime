import { useCallback, useEffect, useState } from "react"

export const STORAGE_PREFIX = "bbyt:"

/**
 * Persiste un valor en localStorage bajo la clave `bbyt:<key>`.
 * Lee el valor inicial de forma segura (tolera JSON inválido) y
 * reescribe en cada cambio. Sincroniza entre pestañas y responde a
 * un evento global "bbyt:clear" para volver al valor por defecto.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storageKey = STORAGE_PREFIX + key

  const read = useCallback((): T => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw === null ? defaultValue : (JSON.parse(raw) as T)
    } catch {
      return defaultValue
    }
  }, [storageKey, defaultValue])

  const [value, setValue] = useState<T>(read)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
      window.dispatchEvent(new Event("bbyt:change"))
    } catch {
      /* almacenamiento lleno o no disponible: se ignora en el MVP */
    }
  }, [storageKey, value])

  useEffect(() => {
    const onClear = () => setValue(read)
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) setValue(read)
    }
    window.addEventListener("bbyt:clear", onClear)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener("bbyt:clear", onClear)
      window.removeEventListener("storage", onStorage)
    }
  }, [read, storageKey])

  return [value, setValue] as const
}

/** Borra todos los datos del workbook y avisa a los componentes montados. */
export function clearAllData() {
  for (const k of Object.keys(localStorage)) {
    if (k.startsWith(STORAGE_PREFIX)) localStorage.removeItem(k)
  }
  window.dispatchEvent(new Event("bbyt:clear"))
}

export type Progress = "empty" | "partial" | "complete"

/** Cuenta los valores "cargados" (no vacíos) en cualquier estructura. */
function countFilled(value: unknown): number {
  if (value == null) return 0
  if (typeof value === "string") return value.trim() ? 1 : 0
  if (typeof value === "number") return value > 0 ? 1 : 0
  if (typeof value === "boolean") return value ? 1 : 0
  if (Array.isArray(value)) {
    return value.reduce<number>((acc, v) => acc + countFilled(v), 0)
  }
  if (typeof value === "object") {
    return Object.values(value).reduce<number>(
      (acc, v) => acc + countFilled(v),
      0,
    )
  }
  return 0
}

/**
 * Estado de un ejercicio según lo guardado:
 * - "empty": sin datos
 * - "partial": 1 a 3 cosas cargadas
 * - "complete": más de 3 cosas cargadas
 */
export function getProgress(id: string): Progress {
  let parsed: unknown
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + id)
    if (raw === null) return "empty"
    parsed = JSON.parse(raw)
  } catch {
    return "empty"
  }
  const count = countFilled(parsed)
  if (count === 0) return "empty"
  if (count > 3) return "complete"
  return "partial"
}

const EXPORT_VERSION = 1

/** Devuelve todas las respuestas del workbook como objeto serializable. */
export function exportData() {
  const data: Record<string, unknown> = {}
  for (const k of Object.keys(localStorage)) {
    if (!k.startsWith(STORAGE_PREFIX)) continue
    if (k === STORAGE_PREFIX + "active-tab") continue
    const key = k.slice(STORAGE_PREFIX.length)
    try {
      data[key] = JSON.parse(localStorage.getItem(k) as string)
    } catch {
      /* clave corrupta: se omite */
    }
  }
  return { version: EXPORT_VERSION, exportedAt: new Date().toISOString(), data }
}

/**
 * Importa respuestas desde el JSON exportado. Reemplaza todo lo guardado.
 * Lanza un error si el formato no es válido.
 */
export function importData(json: string) {
  const parsed = JSON.parse(json) as { data?: Record<string, unknown> }
  if (!parsed || typeof parsed !== "object" || typeof parsed.data !== "object") {
    throw new Error("Formato de archivo inválido.")
  }
  for (const k of Object.keys(localStorage)) {
    if (k.startsWith(STORAGE_PREFIX)) localStorage.removeItem(k)
  }
  for (const [key, value] of Object.entries(parsed.data)) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
  }
  window.dispatchEvent(new Event("bbyt:clear"))
}
