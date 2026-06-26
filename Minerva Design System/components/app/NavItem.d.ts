import React from "react";

export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Highlight as the current page (orange filled block). @default false */
  active?: boolean;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/** Minerva sidebar nav row — orange filled when active, grey Jaro label otherwise. */
export function NavItem(props: NavItemProps): JSX.Element;
