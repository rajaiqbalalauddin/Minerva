import React from "react";

export interface PromoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pixel headline (newlines preserved). @default "Maximize\nYour\nProductivity" */
  title?: string;
  /** Button label. @default "Upgrade" */
  cta?: string;
  onUpgrade?: () => void;
}

/** Minerva teal "speech-blob" upsell card with pixel headline + Upgrade button. */
export function PromoCard(props: PromoCardProps): JSX.Element;
