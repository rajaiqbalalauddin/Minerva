import React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. Falls back to initials, then a generic user glyph. */
  src?: string;
  /** Used for initials + alt text. */
  name?: string;
  /** Diameter in px. @default 48 */
  size?: number;
}

/** Minerva round lilac avatar (image / initials / glyph). */
export function Avatar(props: AvatarProps): JSX.Element;
