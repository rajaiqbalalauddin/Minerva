import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Pixel-font label above the field. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Style for the outer label wrapper. */
  wrapStyle?: React.CSSProperties;
}

/** Minerva text field — navy-bordered rounded input with soft inset shadow. */
export function Input(props: InputProps): JSX.Element;
