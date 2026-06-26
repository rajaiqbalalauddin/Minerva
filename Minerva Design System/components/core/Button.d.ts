import React from "react";

export type ButtonVariant = "primary" | "dark" | "navy" | "orange-navy" | "blue" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Minerva primary action button.
 * @startingPoint section="Core" subtitle="Pixel-label action button with hard 3D shadow" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  /** Icon node rendered before the label. */
  icon?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  /** Stretch to fill container width. @default false */
  full?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Minerva primary action button — pixel (Jersey 10) label on a chunky
 * hard-shadow block that squashes toward the shadow on press.
 */
export function Button(props: ButtonProps): JSX.Element;
