// src/context/NavContext.jsx
// Why: the header avatar (open profile) and "+ Task" button appear on every
// screen. Rather than thread two callbacks through every page, screens pull them
// from here. App provides the real implementations.
import { createContext, useContext } from "react";

const NavContext = createContext({
  openProfile: () => {},
  goTasks: () => {},
});

export function NavProvider({ value, children }) {
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  return useContext(NavContext);
}
