# Buy Back Your Time · Workbook

App mobile-first para completar los ejercicios del workbook de *Buy Back Your Time*
(Dan Martell). Las respuestas se guardan en `localStorage` (MVP, sin backend) y se
pueden exportar/importar como JSON.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 + componentes estilo shadcn/ui
- Sistema de diseño **Efficient Growth** (ver [`DESIGN.md`](DESIGN.md))

## Funcionalidades

- 18 ejercicios agrupados en 5 fases (Diagnóstico, Auditoría, Transferir, Liderar, Cierre).
- Navegación menú → detalle con Anterior/Siguiente.
- Timeline de progreso: estado por ejercicio (sin empezar / en progreso / completado).
- Exportar e importar todas las respuestas en JSON.

## Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # build de producción
```
