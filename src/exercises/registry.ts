import type { ComponentType } from "react"

import { PainLine } from "./pain-line"
import { TimeAssassins } from "./time-assassins"
import { BuybackLoop } from "./buyback-loop"
import { BuybackRate } from "./buyback-rate"
import { Rule9555 } from "./rule-95-5"
import { DripQuadrant } from "./drip-quadrant"
import { TimeEnergyAudit } from "./time-energy-audit"
import { ReplacementLadder } from "./replacement-ladder"
import { EmailGps } from "./email-gps"
import { CamcorderShotList } from "./camcorder-shot-list"
import { RecordingTools } from "./recording-tools"
import { PerfectWeek } from "./perfect-week"
import { Rule131 } from "./rule-1-3-1"
import { CoachFramework } from "./coach-framework"
import { VisionMap } from "./vision-map"
import { GrowthScorecard } from "./growth-scorecard"
import { PreloadedYear } from "./preloaded-year"
import { InsightsActions } from "./insights-actions"

export type Exercise = {
  /** id estable, usado para navegar y como clave de storage. */
  id: string
  /** nombre completo (en inglés, término del libro). */
  name: string
  /** descripción corta en español para el menú. */
  blurb: string
  component: ComponentType
}

export type Section = {
  id: string
  title: string
  exercises: Exercise[]
}

/** Ejercicios agrupados por fase del libro. */
export const SECTIONS: Section[] = [
  {
    id: "diagnostico",
    title: "Diagnóstico",
    exercises: [
      {
        id: "pain-line",
        name: "The Pain Line",
        blurb: "Identificá dónde estás en la línea del dolor.",
        component: PainLine,
      },
      {
        id: "time-assassins",
        name: "The 5 Time Assassins",
        blurb: "Reconocé qué hábitos te roban tiempo.",
        component: TimeAssassins,
      },
      {
        id: "buyback-loop",
        name: "The Buyback Loop",
        blurb: "El ciclo: dolor, auditar, transferir, llenar.",
        component: BuybackLoop,
      },
      {
        id: "buyback-rate",
        name: "The Buy Back Rate",
        blurb: "Calculá tu valor por hora para delegar.",
        component: BuybackRate,
      },
    ],
  },
  {
    id: "auditoria",
    title: "Auditoría",
    exercises: [
      {
        id: "rule-95-5",
        name: "The 95/5 Rule",
        blurb: "Separá lo que solo vos podés hacer.",
        component: Rule9555,
      },
      {
        id: "drip-quadrant",
        name: "The DRIP Quadrant",
        blurb: "Clasificá tareas por valor y energía.",
        component: DripQuadrant,
      },
      {
        id: "time-energy-audit",
        name: "Time & Energy Audit",
        blurb: "Registrá 2 semanas: valor y energía.",
        component: TimeEnergyAudit,
      },
    ],
  },
  {
    id: "transferir",
    title: "Transferir",
    exercises: [
      {
        id: "replacement-ladder",
        name: "The Replacement Ladder",
        blurb: "El orden para reemplazarte paso a paso.",
        component: ReplacementLadder,
      },
      {
        id: "email-gps",
        name: "Email GPS System",
        blurb: "Un sistema para que tu inbox se procese solo.",
        component: EmailGps,
      },
      {
        id: "camcorder-shot-list",
        name: "The Camcorder Shot List",
        blurb: "Grabá procesos antes de delegar.",
        component: CamcorderShotList,
      },
      {
        id: "recording-tools",
        name: "Recording Tools",
        blurb: "Herramientas para grabar procesos.",
        component: RecordingTools,
      },
      {
        id: "perfect-week",
        name: "Your Perfect Week",
        blurb: "Diseñá tu semana ideal.",
        component: PerfectWeek,
      },
    ],
  },
  {
    id: "liderar",
    title: "Liderar y escalar",
    exercises: [
      {
        id: "rule-1-3-1",
        name: "The 1-3-1 Rule",
        blurb: "Enseñá a tu equipo a traer soluciones.",
        component: Rule131,
      },
      {
        id: "coach-framework",
        name: "The CO-A-CH Framework",
        blurb: "Coacheá enfocándote en el fondo.",
        component: CoachFramework,
      },
      {
        id: "vision-map",
        name: "The 10x Vision Map",
        blurb: "Imaginá tu futuro multiplicado por 10.",
        component: VisionMap,
      },
      {
        id: "growth-scorecard",
        name: "Growth Tactic Scorecard",
        blurb: "Puntuá y priorizá tácticas de crecimiento.",
        component: GrowthScorecard,
      },
      {
        id: "preloaded-year",
        name: "The Preloaded Year",
        blurb: "Pre-agendá primero lo importante del año.",
        component: PreloadedYear,
      },
    ],
  },
  {
    id: "cierre",
    title: "Cierre",
    exercises: [
      {
        id: "insights-actions",
        name: "Insights & Actions",
        blurb: "Tus conclusiones y próximas acciones.",
        component: InsightsActions,
      },
    ],
  },
]

/** Lista plana en orden, para navegación Anterior/Siguiente y lookup por id. */
export const EXERCISES: Exercise[] = SECTIONS.flatMap((s) => s.exercises)
