import React from "react";

export type CardTone = "light" | "navy" | "blue" | "teal" | "orange" | "red";
export type CardShadow = "pop" | "lift" | "soft" | "none";

/**
 * Minerva surface card.
 * @startingPoint section="Core" subtitle="Rounded surface with hard 3D shadow" viewport="700x240"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fill color. @default "light" */
  tone?: CardTone;
  /** Hard-shadow depth. @default "pop" */
  shadow?: CardShadow;
  /** Use the brand "speech-blob" corner (sharp bottom-left). @default false */
  blob?: boolean;
  /** Padding in px. @default 24 */
  pad?: number;
  children?: React.ReactNode;
}

/**
 * Minerva surface card — rounded block with the signature hard drop shadow.
 */
export function Card(props: CardProps): JSX.Element;
