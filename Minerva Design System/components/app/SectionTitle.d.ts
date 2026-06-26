import React from "react";

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Font size px. @default 40 */
  size?: number;
  /** Text color. @default black */
  color?: string;
  children?: React.ReactNode;
}

/** Minerva pixel section heading (Jersey 10). */
export function SectionTitle(props: SectionTitleProps): JSX.Element;
