import React from "react";

/**
 * Minerva navy app sidebar.
 * @startingPoint section="App" subtitle="Navy app sidebar: logo + nav + promo" viewport="280x900"
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Nav labels in order. @default ["Dashboard","Pomodoro","Tasks","Budget","Badges"] */
  items?: string[];
  /** Currently active label. @default "Dashboard" */
  active?: string;
  /** Called with the clicked label. */
  onNavigate?: (label: string) => void;
  /** Logo image URL passed to Logo. */
  logoSrc?: string;
  /** Show the bottom promo card. @default true */
  showPromo?: boolean;
}

/**
 * Minerva navy sidebar — logo, nav items, bottom promo card.
 */
export function Sidebar(props: SidebarProps): JSX.Element;
