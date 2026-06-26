/* @ds-bundle: {"format":3,"namespace":"MinervaDesignSystem_5790c8","components":[{"name":"AchievementBadge","sourcePath":"components/app/AchievementBadge.jsx"},{"name":"Logo","sourcePath":"components/app/Logo.jsx"},{"name":"NavItem","sourcePath":"components/app/NavItem.jsx"},{"name":"PageHeader","sourcePath":"components/app/PageHeader.jsx"},{"name":"PomodoroDial","sourcePath":"components/app/PomodoroDial.jsx"},{"name":"PromoCard","sourcePath":"components/app/PromoCard.jsx"},{"name":"SectionTitle","sourcePath":"components/app/SectionTitle.jsx"},{"name":"Sidebar","sourcePath":"components/app/Sidebar.jsx"},{"name":"StatCard","sourcePath":"components/app/StatCard.jsx"},{"name":"TaskChip","sourcePath":"components/app/TaskChip.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"}],"sourceHashes":{"components/app/AchievementBadge.jsx":"b69feb1e4745","components/app/Logo.jsx":"52fbc27d741f","components/app/NavItem.jsx":"f86f8c3c3b0c","components/app/PageHeader.jsx":"c53694312cff","components/app/PomodoroDial.jsx":"ed8a0ad4ee0d","components/app/PromoCard.jsx":"e88a2a3a649d","components/app/SectionTitle.jsx":"7d1b5e59a15e","components/app/Sidebar.jsx":"d024eac421f1","components/app/StatCard.jsx":"3f67c5b08a9a","components/app/TaskChip.jsx":"0eb32a5e3773","components/core/Avatar.jsx":"0b9b5984fb25","components/core/Badge.jsx":"7eb5d8d6642b","components/core/Button.jsx":"2cdd38e8a709","components/core/Card.jsx":"8e82d2d5c328","components/core/Input.jsx":"5c43ca14c50a","components/core/ProgressBar.jsx":"3aa1fbf6a468","ui_kits/minerva-app/BadgesScreen.jsx":"9a3354a5d616","ui_kits/minerva-app/BudgetScreen.jsx":"96193b6eb70f","ui_kits/minerva-app/DashboardScreen.jsx":"6a060349cfca","ui_kits/minerva-app/PomodoroScreen.jsx":"4f6acde4b5bf","ui_kits/minerva-app/TasksScreen.jsx":"c34de5c87496","ui_kits/minerva-app/data.js":"b518745a6ee6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MinervaDesignSystem_5790c8 = window.MinervaDesignSystem_5790c8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/app/AchievementBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva AchievementBadge — a gamified medal for the Badges feature.
 * A chunky rounded-square coin with a glyph, a pixel label, and a
 * locked (greyed) / unlocked (colored) state.
 */
function AchievementBadge({
  label,
  glyph = "★",
  tone = "orange",
  unlocked = true,
  caption,
  style = {},
  ...rest
}) {
  const tones = {
    orange: "var(--mv-orange)",
    teal: "var(--mv-teal)",
    blue: "var(--mv-blue)",
    red: "var(--mv-red)",
    navy: "var(--mv-navy)"
  };
  const fill = unlocked ? tones[tone] || tones.orange : "#cfd6db";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      width: 132,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 104,
      height: 104,
      borderRadius: 28,
      background: fill,
      boxShadow: unlocked ? "var(--shadow-pop)" : "var(--shadow-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--mv-white)",
      fontSize: 52,
      lineHeight: 1,
      position: "relative",
      filter: unlocked ? "none" : "grayscale(0.4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: unlocked ? 1 : 0.7
    }
  }, unlocked ? glyph : "🔒")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      lineHeight: 1,
      textAlign: "center",
      color: unlocked ? "var(--mv-navy)" : "var(--mv-grey)"
    }
  }, label), caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--mv-grey)",
      textAlign: "center"
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { AchievementBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/AchievementBadge.jsx", error: String((e && e.message) || e) }); }

// components/app/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva Logo — the MINERVA wordmark + runner mark on a white pill with
 * the brand hard shadow. Point `src` at assets/minerva-logo.png.
 */
function Logo({
  src = "../../assets/minerva-logo.png",
  height = 80,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--mv-white)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-pop)",
      padding: "8px 22px",
      height,
      boxSizing: "border-box",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "Minerva",
    style: {
      height: "72%",
      width: "auto",
      objectFit: "contain"
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/Logo.jsx", error: String((e && e.message) || e) }); }

// components/app/NavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva NavItem — a sidebar row. Active = orange filled block with
 * white Jaro label + hard shadow. Inactive = grey Jaro label, fills
 * navy-2 on hover.
 */
function NavItem({
  children,
  active = false,
  icon = null,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      textAlign: "center",
      justifyContent: "center",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-hero)",
      fontSize: "var(--type-nav)",
      padding: "16px 18px",
      borderRadius: "var(--radius-sm)",
      background: active ? "var(--mv-orange)" : hover ? "var(--mv-navy-2)" : "transparent",
      color: active ? "var(--mv-white)" : "var(--mv-grey)",
      boxShadow: active ? "var(--shadow-pop)" : "none",
      transition: "background 120ms ease, color 120ms ease",
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/app/PageHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva PageHeader — the orange pixel page title with the grey
 * Lexend-Deca date underneath. Optional right-aligned actions slot.
 */
function PageHeader({
  title,
  date,
  actions = null,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 24,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-display)",
      lineHeight: 1,
      color: "var(--mv-orange)",
      letterSpacing: "var(--tracking-display)"
    }
  }, title), date ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: "var(--font-meta)",
      fontWeight: 800,
      fontSize: "var(--type-lead)",
      color: "var(--mv-grey)",
      letterSpacing: "var(--tracking-meta)"
    }
  }, date) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, actions) : null);
}
Object.assign(__ds_scope, { PageHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/PageHeader.jsx", error: String((e && e.message) || e) }); }

// components/app/PomodoroDial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva PomodoroDial — a circular countdown ring with a big pixel
 * time readout in the center. `progress` (0–1) fills the ring;
 * `tone` colors it (orange = focus, teal = break).
 */
function PomodoroDial({
  time = "25:00",
  progress = 0,
  tone = "orange",
  label = "FOCUS",
  size = 320,
  style = {},
  ...rest
}) {
  const tones = {
    orange: "var(--mv-orange)",
    teal: "var(--mv-teal)",
    blue: "var(--mv-blue)"
  };
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const fill = tones[tone] || tones.orange;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      width: size,
      height: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      display: "block",
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "#e3e8ec",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: fill,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - Math.max(0, Math.min(1, progress))),
    style: {
      transition: "stroke-dashoffset 500ms linear"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--mv-grey)",
      letterSpacing: "2px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: size * 0.26,
      lineHeight: 1,
      color: "var(--mv-navy)"
    }
  }, time)));
}
Object.assign(__ds_scope, { PomodoroDial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/PomodoroDial.jsx", error: String((e && e.message) || e) }); }

// components/app/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva SectionTitle — black pixel (Jersey 10) heading used above
 * groups of cards ("Pending task", "Your badges").
 */
function SectionTitle({
  children,
  size = 40,
  color = "var(--mv-black)",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("h2", _extends({
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: size,
      lineHeight: 1,
      color,
      letterSpacing: "var(--tracking-display)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/app/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva StatCard — the blue finance/insight card: a centered pixel
 * caption, a big pixel value (often orange), and an optional footer
 * slot (button, chart, sparkline).
 */
function StatCard({
  caption,
  value,
  valueColor = "var(--mv-orange)",
  tone = "blue",
  footer = null,
  children,
  align = "center",
  style = {},
  ...rest
}) {
  const tones = {
    blue: "var(--mv-blue)",
    navy: "var(--mv-navy)",
    teal: "var(--mv-teal)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: tones[tone] || tones.blue,
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-pop)",
      padding: 24,
      color: "var(--mv-white)",
      display: "flex",
      flexDirection: "column",
      alignItems: align === "center" ? "center" : "flex-start",
      gap: 14,
      boxSizing: "border-box",
      ...style
    }
  }, rest), caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 32,
      lineHeight: 1,
      letterSpacing: "var(--tracking-display)"
    }
  }, caption) : null, value != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-stat)",
      lineHeight: 1,
      color: valueColor
    }
  }, value) : null, children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginTop: "auto"
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/app/TaskChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva TaskChip — a colored task block: pixel title + Lexend-Deca
 * time line, with the hard drop shadow. Tone is driven by urgency.
 */
function TaskChip({
  title,
  time,
  tone = "red",
  done = false,
  onClick,
  style = {},
  ...rest
}) {
  const tones = {
    red: "var(--mv-red)",
    orange: "var(--mv-orange)",
    teal: "var(--mv-teal)",
    blue: "var(--mv-blue)",
    navy: "var(--mv-navy)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    style: {
      background: tones[tone] || tones.red,
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-pop)",
      padding: "16px 20px",
      color: "var(--mv-white)",
      cursor: onClick ? "pointer" : "default",
      opacity: done ? 0.55 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 32,
      lineHeight: 1,
      letterSpacing: "var(--tracking-display)",
      textDecoration: done ? "line-through" : "none"
    }
  }, title), time ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: "var(--font-meta)",
      fontWeight: 800,
      fontSize: 16,
      letterSpacing: "var(--tracking-meta)",
      color: "rgba(255,255,255,0.85)"
    }
  }, time) : null);
}
Object.assign(__ds_scope, { TaskChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/TaskChip.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva Avatar — round lilac avatar (matches the Figma "Generic
 * avatar"). Renders an image if `src` given, else initials, else the
 * default user glyph.
 */
function Avatar({
  src,
  name,
  size = 48,
  style = {},
  ...rest
}) {
  const initials = name ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
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
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || "avatar",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: size * 0.46,
      lineHeight: 1
    }
  }, initials) : /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size * 0.62,
    height: size * 0.62,
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.7-8 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.3-3.6-6-8-6Z"
  })));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva Badge — a small status pill. Solid (status colors) or soft
 * (pastel tint). Pixel label by default.
 */
function Badge({
  children,
  tone = "orange",
  soft = false,
  dot = false,
  style = {},
  ...rest
}) {
  const map = {
    orange: {
      solid: "var(--mv-orange)",
      soft: "var(--mv-orange-soft)",
      ink: "var(--mv-orange-deep)"
    },
    red: {
      solid: "var(--mv-red)",
      soft: "var(--mv-red-soft)",
      ink: "var(--mv-red-deep)"
    },
    teal: {
      solid: "var(--mv-teal)",
      soft: "var(--mv-teal-soft)",
      ink: "var(--mv-teal-deep)"
    },
    blue: {
      solid: "var(--mv-blue)",
      soft: "var(--mv-blue-soft)",
      ink: "var(--mv-blue-deep)"
    },
    navy: {
      solid: "var(--mv-navy)",
      soft: "#d7e0e6",
      ink: "var(--mv-navy)"
    },
    grey: {
      solid: "var(--mv-grey)",
      soft: "#e9edf0",
      ink: "#5b636b"
    }
  };
  const c = map[tone] || map.orange;
  const bg = soft ? c.soft : c.solid;
  const fg = soft ? c.ink : "var(--mv-white)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-display)",
      fontSize: 22,
      lineHeight: 1,
      letterSpacing: "var(--tracking-display)",
      color: fg,
      background: bg,
      borderRadius: 999,
      padding: "5px 14px",
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: fg,
      display: "inline-block"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva Button — chunky pixel-label button with the signature hard
 * drop shadow. Press squashes it down toward the shadow.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconRight = null,
  full = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const palettes = {
    primary: {
      bg: "var(--mv-orange)",
      fg: "var(--mv-white)",
      shadow: "var(--shadow-pop)"
    },
    dark: {
      bg: "var(--mv-black)",
      fg: "var(--mv-white)",
      shadow: "var(--shadow-lift)"
    },
    navy: {
      bg: "var(--mv-navy)",
      fg: "var(--mv-white)",
      shadow: "var(--shadow-pop)"
    },
    "orange-navy": {
      bg: "var(--mv-orange)",
      fg: "var(--mv-navy)",
      shadow: "var(--shadow-navy)"
    },
    blue: {
      bg: "var(--mv-blue)",
      fg: "var(--mv-white)",
      shadow: "var(--shadow-pop)"
    },
    ghost: {
      bg: "transparent",
      fg: "var(--mv-navy)",
      shadow: "none"
    }
  };
  const sizes = {
    sm: {
      fontSize: 24,
      padding: "4px 18px",
      radius: "var(--radius-sm)",
      gap: 8
    },
    md: {
      fontSize: 32,
      padding: "6px 26px",
      radius: "var(--radius-sm)",
      gap: 10
    },
    lg: {
      fontSize: 36,
      padding: "10px 34px",
      radius: "var(--radius-sm)",
      gap: 12
    }
  };
  const p = palettes[variant] || palettes.primary;
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      width: full ? "100%" : "auto",
      fontFamily: "var(--font-display)",
      fontSize: s.fontSize,
      lineHeight: 1,
      letterSpacing: "var(--tracking-display)",
      color: p.fg,
      background: p.bg,
      border: "none",
      borderRadius: s.radius,
      padding: s.padding,
      boxShadow: p.shadow,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "transform 90ms ease, box-shadow 90ms ease, background 120ms ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    },
    onMouseDown: e => {
      if (disabled) return;
      e.currentTarget.style.transform = "translate(3px, 5px)";
      e.currentTarget.style.boxShadow = "var(--shadow-soft)";
    },
    onMouseUp: e => {
      if (disabled) return;
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = p.shadow;
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = p.shadow;
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      fontSize: "0.8em"
    }
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, children), iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      fontSize: "0.8em"
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/app/PromoCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva PromoCard — the teal "speech-blob" upsell that sits at the
 * bottom of the sidebar. Pixel headline + Upgrade button.
 */
function PromoCard({
  title = "Maximize\nYour\nProductivity",
  cta = "Upgrade",
  onUpgrade,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--mv-blue)",
      borderRadius: "var(--radius-blob)",
      boxShadow: "var(--shadow-soft)",
      padding: "18px 18px 22px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 44,
      lineHeight: 0.92,
      color: "var(--mv-white)",
      whiteSpace: "pre-line",
      marginBottom: 18
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "orange-navy",
    full: true,
    onClick: onUpgrade
  }, cta));
}
Object.assign(__ds_scope, { PromoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/PromoCard.jsx", error: String((e && e.message) || e) }); }

// components/app/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva Sidebar — the navy rail: logo pill, nav items, and the promo
 * "Maximize Your Productivity" card pinned to the bottom.
 */
function Sidebar({
  items = ["Dashboard", "Pomodoro", "Tasks", "Budget", "Badges"],
  active = "Dashboard",
  onNavigate = () => {},
  logoSrc,
  showPromo = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      width: "var(--sidebar-w)",
      minHeight: "100%",
      background: "var(--mv-navy)",
      boxShadow: "var(--shadow-inset)",
      display: "flex",
      flexDirection: "column",
      padding: "24px 24px 18px",
      boxSizing: "border-box",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    src: logoSrc,
    height: 80,
    style: {
      alignSelf: "stretch",
      justifyContent: "flex-start"
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      marginTop: 56
    }
  }, items.map(label => /*#__PURE__*/React.createElement(__ds_scope.NavItem, {
    key: label,
    active: label === active,
    onClick: () => onNavigate(label)
  }, label))), showPromo ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PromoCard, null)) : null);
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva Card — the base surface primitive. A rounded block with the
 * signature hard drop shadow. Tone picks the fill; the "blob" corner is
 * the brand's promo-card shape.
 */
function Card({
  children,
  tone = "light",
  shadow = "pop",
  blob = false,
  pad = 24,
  style = {},
  ...rest
}) {
  const tones = {
    light: {
      bg: "var(--mv-white)",
      fg: "var(--mv-navy)"
    },
    navy: {
      bg: "var(--mv-navy)",
      fg: "var(--mv-white)"
    },
    blue: {
      bg: "var(--mv-blue)",
      fg: "var(--mv-white)"
    },
    teal: {
      bg: "var(--mv-teal)",
      fg: "var(--mv-white)"
    },
    orange: {
      bg: "var(--mv-orange)",
      fg: "var(--mv-white)"
    },
    red: {
      bg: "var(--mv-red)",
      fg: "var(--mv-white)"
    }
  };
  const shadows = {
    pop: "var(--shadow-pop)",
    lift: "var(--shadow-lift)",
    soft: "var(--shadow-soft)",
    none: "none"
  };
  const t = tones[tone] || tones.light;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: t.bg,
      color: t.fg,
      borderRadius: blob ? "var(--radius-blob)" : "var(--radius-md)",
      boxShadow: shadows[shadow] ?? shadows.pop,
      padding: pad,
      boxSizing: "border-box",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva Input — rounded field with a soft inset shadow on a light
 * surface. Body copy in Lexend; optional pixel label above.
 */
function Input({
  label,
  hint,
  icon,
  style = {},
  wrapStyle = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...wrapStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--mv-navy)",
      letterSpacing: "0.5px"
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--mv-white)",
      border: "2px solid var(--mv-navy)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 16px",
      boxShadow: "var(--shadow-soft)"
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--mv-grey)"
    }
  }, icon) : null, /*#__PURE__*/React.createElement("input", _extends({
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: 16,
      color: "var(--mv-navy)",
      minWidth: 0,
      ...style
    }
  }, rest))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--mv-grey)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Minerva ProgressBar — rounded track with a colored fill. Used for
 * budget usage, badge progress, pomodoro session progress.
 */
function ProgressBar({
  value = 0,
  max = 100,
  tone = "orange",
  height = 16,
  showLabel = false,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fills = {
    orange: "var(--mv-orange)",
    teal: "var(--mv-teal)",
    blue: "var(--mv-blue)",
    red: "var(--mv-red)",
    navy: "var(--mv-navy)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height,
      background: "#e3e8ec",
      borderRadius: 999,
      overflow: "hidden",
      boxShadow: "var(--shadow-inset)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: fills[tone] || fills.orange,
      borderRadius: 999,
      transition: "width 300ms cubic-bezier(.34,1.4,.64,1)"
    }
  })), showLabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--mv-navy)",
      minWidth: 52,
      textAlign: "right"
    }
  }, Math.round(pct), "%") : null);
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/minerva-app/BadgesScreen.jsx
try { (() => {
/* Minerva — Badges screen. Achievement grid + progress summary. */
const MVBg = window.MinervaDesignSystem_5790c8;
function BadgesScreen({
  data
}) {
  const {
    PageHeader,
    Button,
    Avatar,
    AchievementBadge,
    Card,
    SectionTitle,
    ProgressBar,
    Badge
  } = MVBg;
  const unlocked = data.badges.filter(b => b.unlocked).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    title: "Badges",
    date: data.today,
    actions: /*#__PURE__*/React.createElement(Avatar, {
      name: data.user.name,
      size: 56
    })
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "navy",
    shadow: "lift",
    pad: 30,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 64,
      lineHeight: 1
    }
  }, "\uD83C\uDFC5"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-hero)",
      fontSize: 30,
      color: "#fff",
      marginBottom: 10
    }
  }, unlocked, " of ", data.badges.length, " badges earned"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: unlocked,
    max: data.badges.length,
    tone: "orange",
    height: 18,
    showLabel: true
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "orange-navy"
  }, "Share")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionTitle, {
    style: {
      marginBottom: 18
    }
  }, "Your badges"), /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    pad: 30
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 20,
      justifyItems: "center"
    }
  }, data.badges.map(b => /*#__PURE__*/React.createElement(AchievementBadge, {
    key: b.label,
    label: b.label,
    glyph: b.glyph,
    tone: b.tone,
    unlocked: b.unlocked,
    caption: b.caption
  }))))));
}
Object.assign(window, {
  BadgesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/minerva-app/BadgesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/minerva-app/BudgetScreen.jsx
try { (() => {
/* Minerva — Budget screen. Balance, category budgets with progress, add purchase. */
const MVB = window.MinervaDesignSystem_5790c8;
function BudgetScreen({
  data
}) {
  const {
    PageHeader,
    Button,
    Avatar,
    StatCard,
    Card,
    SectionTitle,
    ProgressBar,
    Badge
  } = MVB;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    title: "Budget",
    date: data.today,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "orange-navy"
    }, "Add purchase"), /*#__PURE__*/React.createElement(Avatar, {
      name: data.user.name,
      size: 56
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr 1fr",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    caption: "Balance :",
    value: data.balance,
    align: "center"
  }), /*#__PURE__*/React.createElement(StatCard, {
    caption: "This month",
    tone: "navy",
    value: "RM 760",
    align: "center",
    valueColor: "#fff"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "rgba(255,255,255,.85)"
    }
  }, "spent of RM 1,070 budget")), /*#__PURE__*/React.createElement(StatCard, {
    caption: "Saved",
    tone: "teal",
    value: "RM 310",
    align: "center",
    valueColor: "#fff"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "rgba(255,255,255,.9)"
    }
  }, "29% under budget \uD83C\uDF89"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionTitle, {
    style: {
      marginBottom: 18
    }
  }, "Categories"), /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    pad: 26,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, data.budget.map(b => {
    const pct = Math.round(b.spent / b.cap * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: b.label,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 28,
        color: "var(--mv-navy)"
      }
    }, b.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-meta)",
        fontWeight: 800,
        fontSize: 15,
        color: pct >= 95 ? "var(--mv-red)" : "var(--mv-grey)"
      }
    }, "RM ", b.spent, " / ", b.cap)), /*#__PURE__*/React.createElement(ProgressBar, {
      value: b.spent,
      max: b.cap,
      tone: pct >= 95 ? "red" : b.tone,
      height: 18
    }));
  }))));
}
Object.assign(window, {
  BudgetScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/minerva-app/BudgetScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/minerva-app/DashboardScreen.jsx
try { (() => {
/* Minerva — Dashboard screen. Replicates the Figma dashboard:
   hero greeting card, pending-task row, and the finance trio. */
const MV = window.MinervaDesignSystem_5790c8;
function Sparkline({
  data,
  stroke = "#fff",
  height = 130
}) {
  const w = 240;
  const max = Math.max(...data),
    min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * w;
    const y = height - (v - min) / (max - min || 1) * (height - 14) - 7;
    return [x, y];
  });
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = d + ` L ${w} ${height} L 0 ${height} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${height}`,
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "mvspark",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(2,48,71,0.55)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(2,48,71,0)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#mvspark)"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: stroke,
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
function DashboardScreen({
  data,
  onStartPomodoro,
  onAddTask,
  onGoBudget
}) {
  const {
    PageHeader,
    Button,
    Avatar,
    Card,
    SectionTitle,
    TaskChip,
    StatCard
  } = MV;
  const pending = data.tasks.filter(t => !t.done).slice(0, 4);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    title: "Dashboard",
    date: data.today,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-body)",
          fontWeight: 300
        }
      }, "+"),
      onClick: onAddTask
    }, "Task"), /*#__PURE__*/React.createElement(Avatar, {
      name: data.user.name,
      size: 56
    }))
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "navy",
    shadow: "lift",
    pad: 0,
    style: {
      position: "relative",
      overflow: "hidden",
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "36px 40px",
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-hero)",
      fontSize: 44,
      lineHeight: 1.1,
      color: "#fff",
      marginBottom: 22
    }
  }, "Hi ", data.user.name.split(" ")[0], ", ready for a study session?"), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u23F1"),
    onClick: onStartPomodoro
  }, "Start Pomodoro")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/study-hero.png",
    alt: "",
    style: {
      position: "absolute",
      right: 24,
      bottom: 0,
      height: "108%",
      width: "auto",
      objectFit: "contain",
      pointerEvents: "none"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionTitle, {
    style: {
      marginBottom: 16
    }
  }, "Pending task"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 18
    }
  }, pending.map(t => /*#__PURE__*/React.createElement(TaskChip, {
    key: t.id,
    title: t.title,
    time: t.time,
    tone: t.tone
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    caption: "Balance :",
    value: data.balance,
    align: "center",
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "orange-navy",
      full: true,
      onClick: onGoBudget
    }, "Add purchase")
  }), /*#__PURE__*/React.createElement(StatCard, {
    caption: "Spending",
    tone: "blue",
    align: "center",
    style: {
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    data: data.spendData
  }))), /*#__PURE__*/React.createElement(StatCard, {
    tone: "blue",
    align: "center",
    style: {
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 32,
      color: "#fff",
      textAlign: "center",
      lineHeight: 1.1
    }
  }, "Insight"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "rgba(255,255,255,.9)",
      textAlign: "center",
      marginTop: 10,
      lineHeight: 1.5
    }
  }, "You spent 18% more this week. Most of it went to ", /*#__PURE__*/React.createElement("b", null, "Fun"), "."))));
}
Object.assign(window, {
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/minerva-app/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/minerva-app/PomodoroScreen.jsx
try { (() => {
/* Minerva — Pomodoro screen. A working focus timer with the dial,
   start/pause/reset, focus/break modes and a session counter. */
const MVP = window.MinervaDesignSystem_5790c8;
function PomodoroScreen({
  data
}) {
  const {
    PageHeader,
    Button,
    Avatar,
    PomodoroDial,
    Card,
    Badge
  } = MVP;
  const DURATIONS = {
    FOCUS: 25 * 60,
    BREAK: 5 * 60
  };
  const [mode, setMode] = React.useState("FOCUS");
  const [remaining, setRemaining] = React.useState(DURATIONS.FOCUS);
  const [running, setRunning] = React.useState(false);
  const [sessions, setSessions] = React.useState(2);
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(id);
          setRunning(false);
          if (mode === "FOCUS") setSessions(s => s + 1);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);
  const total = DURATIONS[mode];
  const progress = 1 - remaining / total;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  function switchMode(m) {
    setMode(m);
    setRunning(false);
    setRemaining(DURATIONS[m]);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    title: "Pomodoro",
    date: data.today,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, null, "+ Task"), /*#__PURE__*/React.createElement(Avatar, {
      name: data.user.name,
      size: 56
    }))
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    pad: 36,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: mode === "FOCUS" ? "primary" : "ghost",
    size: "sm",
    onClick: () => switchMode("FOCUS")
  }, "Focus"), /*#__PURE__*/React.createElement(Button, {
    variant: mode === "BREAK" ? "blue" : "ghost",
    size: "sm",
    onClick: () => switchMode("BREAK")
  }, "Break")), /*#__PURE__*/React.createElement(PomodoroDial, {
    time: `${mm}:${ss}`,
    progress: progress,
    tone: mode === "FOCUS" ? "orange" : "teal",
    label: mode,
    size: 360
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: running ? "navy" : "primary",
    size: "lg",
    onClick: () => setRunning(r => !r)
  }, running ? "Pause" : remaining === 0 ? "Done" : "Start"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: () => switchMode(mode)
  }, "Reset")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "orange",
    dot: true
  }, sessions, " sessions today"), /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    soft: true
  }, "Streak 4 days"))));
}
Object.assign(window, {
  PomodoroScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/minerva-app/PomodoroScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/minerva-app/TasksScreen.jsx
try { (() => {
/* Minerva — Tasks screen. Add tasks, toggle done. */
const MVT = window.MinervaDesignSystem_5790c8;
function TasksScreen({
  data
}) {
  const {
    PageHeader,
    Button,
    Avatar,
    Input,
    SectionTitle,
    TaskChip,
    Badge
  } = MVT;
  const [tasks, setTasks] = React.useState(data.tasks);
  const [draft, setDraft] = React.useState("");
  function add() {
    const v = draft.trim();
    if (!v) return;
    setTasks(t => [{
      id: Date.now(),
      title: v,
      time: "Today",
      tone: "orange",
      done: false
    }, ...t]);
    setDraft("");
  }
  function toggle(id) {
    setTasks(t => t.map(x => x.id === id ? {
      ...x,
      done: !x.done
    } : x));
  }
  const open = tasks.filter(t => !t.done);
  const done = tasks.filter(t => t.done);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    title: "Tasks",
    date: data.today,
    actions: /*#__PURE__*/React.createElement(Avatar, {
      name: data.user.name,
      size: 56
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Add a new task\u2026",
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyDown: e => e.key === "Enter" && add()
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: add
  }, "Add")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "To do"), /*#__PURE__*/React.createElement(Badge, {
    tone: "red",
    soft: true
  }, open.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16
    }
  }, open.map(t => /*#__PURE__*/React.createElement(TaskChip, {
    key: t.id,
    title: t.title,
    time: t.time,
    tone: t.tone,
    onClick: () => toggle(t.id)
  })), open.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      color: "var(--mv-grey)"
    }
  }, "All done \u2014 nice work! \uD83C\uDF89"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    color: "var(--mv-grey)"
  }, "Completed"), /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    soft: true
  }, done.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16
    }
  }, done.map(t => /*#__PURE__*/React.createElement(TaskChip, {
    key: t.id,
    title: t.title,
    time: t.time,
    tone: "teal",
    done: true,
    onClick: () => toggle(t.id)
  })))));
}
Object.assign(window, {
  TasksScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/minerva-app/TasksScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/minerva-app/data.js
try { (() => {
// Minerva app — shared mock data for the UI kit. Plain script: sets window.MinervaData.
window.MinervaData = {
  user: {
    name: "Raja Kumar"
  },
  today: "Tuesday 23 June 2026",
  nav: ["Dashboard", "Pomodoro", "Tasks", "Budget", "Badges"],
  tasks: [{
    id: 1,
    title: "Walk the cat",
    time: "9.00 a.m , Today",
    tone: "red",
    done: false
  }, {
    id: 2,
    title: "Assignment",
    time: "7.00 a.m , Today",
    tone: "red",
    done: false
  }, {
    id: 3,
    title: "Gym",
    time: "12.00 p.m , Tomorrow",
    tone: "orange",
    done: false
  }, {
    id: 4,
    title: "Watch Anime",
    time: "9.00 a.m , 27 June",
    tone: "teal",
    done: false
  }, {
    id: 5,
    title: "Read 20 pages",
    time: "8.00 p.m , 28 June",
    tone: "teal",
    done: true
  }],
  balance: "RM 6767.67",
  spendData: [22, 30, 18, 42, 36, 58, 48, 70, 62, 88],
  budget: [{
    label: "Food",
    tone: "orange",
    spent: 320,
    cap: 500
  }, {
    label: "Transport",
    tone: "blue",
    spent: 140,
    cap: 200
  }, {
    label: "Books",
    tone: "teal",
    spent: 90,
    cap: 150
  }, {
    label: "Fun",
    tone: "red",
    spent: 210,
    cap: 220
  }],
  badges: [{
    label: "First Focus",
    glyph: "⚡",
    tone: "orange",
    unlocked: true,
    caption: "1 session"
  }, {
    label: "Focus x10",
    glyph: "🔥",
    tone: "orange",
    unlocked: true,
    caption: "10 sessions"
  }, {
    label: "Big Saver",
    glyph: "💰",
    tone: "teal",
    unlocked: true,
    caption: "Under budget"
  }, {
    label: "Task Master",
    glyph: "✅",
    tone: "blue",
    unlocked: true,
    caption: "50 tasks done"
  }, {
    label: "Night Owl",
    glyph: "🦉",
    tone: "navy",
    unlocked: false,
    caption: "Study after 11pm"
  }, {
    label: "Streak x30",
    glyph: "🏆",
    tone: "red",
    unlocked: false,
    caption: "30-day streak"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/minerva-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.AchievementBadge = __ds_scope.AchievementBadge;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.PageHeader = __ds_scope.PageHeader;

__ds_ns.PomodoroDial = __ds_scope.PomodoroDial;

__ds_ns.PromoCard = __ds_scope.PromoCard;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.TaskChip = __ds_scope.TaskChip;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

})();
