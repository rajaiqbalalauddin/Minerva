import React from "react";

export type TaskTone = "red" | "orange" | "teal" | "blue" | "navy";

/**
 * Minerva task block.
 * @startingPoint section="App" subtitle="Colored task block, pixel title + due time" viewport="380x140"
 */
export interface TaskChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pixel task title. */
  title: string;
  /** Due time / date line. */
  time?: string;
  /** Color by urgency. @default "red" */
  tone?: TaskTone;
  /** Dim + strike-through when completed. @default false */
  done?: boolean;
}

/**
 * Minerva task block — colored card with pixel title + due line.
 */
export function TaskChip(props: TaskChipProps): JSX.Element;
