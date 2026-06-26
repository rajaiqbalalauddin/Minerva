import React from "react";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Orange pixel page title. */
  title: string;
  /** Grey date / subtitle line. */
  date?: string;
  /** Right-aligned action nodes (e.g. + Task button, Avatar). */
  actions?: React.ReactNode;
}

/** Minerva page header — orange pixel title + grey date, optional actions. */
export function PageHeader(props: PageHeaderProps): JSX.Element;
