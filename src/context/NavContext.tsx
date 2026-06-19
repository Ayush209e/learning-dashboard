"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type NavItem =
  | "Dashboard"
  | "My Courses"
  | "Calendar"
  | "Assignments"
  | "Progress"
  | "Leaderboard"
  | "Settings";

interface NavContextValue {
  active: NavItem;
  setActive: (item: NavItem) => void;
  scrollTo: (id: string) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [active, setActiveState] = useState<NavItem>("Dashboard");

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const setActive = useCallback(
    (item: NavItem) => {
      setActiveState(item);

      switch (item) {
        case "Dashboard":
          scrollTo("dashboard-top");
          break;
        case "My Courses":
          scrollTo("courses-section");
          break;
        case "Calendar":
          scrollTo("activity-section");
          break;
        case "Progress":
          scrollTo("streak-section");
          break;
        default:
          scrollTo("dashboard-top");
      }
    },
    [scrollTo]
  );

  return (
    <NavContext.Provider value={{ active, setActive, scrollTo }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
