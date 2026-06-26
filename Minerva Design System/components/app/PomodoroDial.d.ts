import React from "react";

export type DialTone = "orange" | "teal" | "blue";

/**
 * Minerva pomodoro countdown ring.
 * @startingPoint section="App" subtitle="Circular pomodoro timer ring" viewport="360x360"
 */
export interface PomodoroDialProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Time readout, e.g. "25:00". @default "25:00" */
  time?: string;
  /** Ring fill 0–1. @default 0 */
  progress?: number;
  /** Ring color (orange focus / teal break). @default "orange" */
  tone?: DialTone;
  /** Mode label above the time. @default "FOCUS" */
  label?: string;
  /** Diameter px. @default 320 */
  size?: number;
}

/**
 * Minerva pomodoro countdown ring with a pixel time readout.
 */
export function PomodoroDial(props: PomodoroDialProps): JSX.Element;
