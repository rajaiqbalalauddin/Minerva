import React from "react";

export type ProgressTone = "orange" | "teal" | "blue" | "red" | "navy";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  /** @default 100 */
  max?: number;
  /** Fill color. @default "orange" */
  tone?: ProgressTone;
  /** Track height px. @default 16 */
  height?: number;
  /** Show a pixel %% label on the right. @default false */
  showLabel?: boolean;
}

/** Minerva progress track — inset-shadow rail with a rounded colored fill. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
