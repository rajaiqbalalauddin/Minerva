import React from "react";

/**
 * Minerva Avatar — round lilac avatar (matches the Figma "Generic
 * avatar"). Renders an image if `src` given, else initials, else the
 * default user glyph.
 */
export function Avatar({ src, name, size = 48, style = {}, ...rest }) {
  const initials = name
    ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : null;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        background: "var(--mv-lilac)",
        color: "var(--mv-lilac-ink)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flex: "none",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name || "avatar"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : initials ? (
        <span style={{ fontFamily: "var(--font-display)", fontSize: size * 0.46, lineHeight: 1 }}>{initials}</span>
      ) : (
        <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="currentColor" aria-hidden="true">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.7-8 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.3-3.6-6-8-6Z" />
        </svg>
      )}
    </div>
  );
}
