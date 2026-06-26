import React from "react";

export type BadgeMedalTone = "orange" | "teal" | "blue" | "red" | "navy";

/**
 * Minerva gamified achievement medal.
 * @startingPoint section="App" subtitle="Gamified achievement medal, locked/unlocked" viewport="160x180"
 */
export interface AchievementBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pixel label under the medal. */
  label: string;
  /** Emoji/char shown when unlocked. @default "★" */
  glyph?: React.ReactNode;
  /** Coin color. @default "orange" */
  tone?: BadgeMedalTone;
  /** Unlocked (colored) vs locked (grey + padlock). @default true */
  unlocked?: boolean;
  /** Small caption under the label. */
  caption?: string;
}

/**
 * Minerva gamified achievement medal.
 */
export function AchievementBadge(props: AchievementBadgeProps): JSX.Element;
