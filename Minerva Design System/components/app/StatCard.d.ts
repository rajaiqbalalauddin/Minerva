import React from "react";

export type StatTone = "blue" | "navy" | "teal";

/**
 * Minerva finance/insight stat card.
 * @startingPoint section="App" subtitle="Finance stat card with big pixel value" viewport="360x300"
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pixel caption ("Balance :", "Spending"). */
  caption?: string;
  /** Big pixel value ("RM 6767.67"). */
  value?: React.ReactNode;
  /** Value color. @default orange */
  valueColor?: string;
  /** @default "blue" */
  tone?: StatTone;
  /** Footer slot pinned to bottom (button, chart). */
  footer?: React.ReactNode;
  /** "center" | "start". @default "center" */
  align?: "center" | "start";
  children?: React.ReactNode;
}

/**
 * Minerva finance/insight stat card.
 */
export function StatCard(props: StatCardProps): JSX.Element;
