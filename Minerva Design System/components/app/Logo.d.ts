import React from "react";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo image URL. @default "../../assets/minerva-logo.png" */
  src?: string;
  /** Pill height px. @default 80 */
  height?: number;
}

/** Minerva wordmark on a white shadowed pill. */
export function Logo(props: LogoProps): JSX.Element;
