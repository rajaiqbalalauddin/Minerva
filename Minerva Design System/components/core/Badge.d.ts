import React from "react";

export type BadgeTone = "orange" | "red" | "teal" | "blue" | "navy" | "grey";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "orange" */
  tone?: BadgeTone;
  /** Pastel-tint instead of solid fill. @default false */
  soft?: boolean;
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Minerva status pill — solid or soft, pixel label. */
export function Badge(props: BadgeProps): JSX.Element;
