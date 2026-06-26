export function PageHeader({ title, date, actions = null, style = {}, ...rest }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 24,
        ...style,
      }}
      {...rest}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "var(--type-display)",
            lineHeight: 1,
            color: "var(--mv-orange)",
            letterSpacing: "var(--tracking-display)",
          }}
        >
          {title}
        </h1>
        {date ? (
          <div
            style={{
              marginTop: 6,
              fontFamily: "var(--font-meta)",
              fontWeight: 800,
              fontSize: "var(--type-lead)",
              color: "var(--mv-grey)",
              letterSpacing: "var(--tracking-meta)",
            }}
          >
            {date}
          </div>
        ) : null}
      </div>
      {actions ? <div style={{ display: "flex", alignItems: "center", gap: 16 }}>{actions}</div> : null}
    </header>
  );
}
