"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  ClipboardList,
  TrendingUp,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useNav, type NavItem } from "@/context/NavContext";

const links: { label: NavItem; icon: typeof LayoutDashboard }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Courses", icon: BookOpen },
  { label: "Calendar", icon: Calendar },
  { label: "Assignments", icon: ClipboardList },
  { label: "Progress", icon: TrendingUp },
  { label: "Leaderboard", icon: Trophy },
  { label: "Settings", icon: Settings },
];

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const { active, setActive } = useNav();
  const [collapsed, setCollapsed] = useState(false);

  function handleClick(label: NavItem) {
    setActive(label);
    onNavigate?.();
  }

  return (
    <aside
      className={`
        flex h-full shrink-0 flex-col border-r border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl
        ${mobile ? "w-full" : "sticky top-0 hidden h-screen md:flex md:w-[4.5rem] lg:w-60"}
      `}
    >
      <header
        className={`flex items-center gap-3 p-4 ${mobile ? "" : "md:justify-center lg:justify-between"}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/25">
            <Flame size={20} className="text-white" fill="white" strokeWidth={1.5} />
          </div>
          {(mobile || !collapsed) && (
            <span className={`text-xl font-bold text-white ${mobile ? "" : "hidden lg:block"}`}>
              Learnify
            </span>
          )}
        </div>

        {!mobile && (
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((c) => !c)}
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white lg:flex"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </header>

      <nav className="flex flex-1 flex-col gap-0.5 px-2" aria-label="Main navigation">
        {links.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          const iconOnly = mobile ? false : collapsed;

          return (
            <button
              key={label}
              type="button"
              onClick={() => handleClick(label)}
              className={`
                relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm
                text-zinc-400 transition-colors hover:text-white
                ${mobile ? "" : iconOnly ? "md:justify-center lg:justify-center" : "md:justify-center lg:justify-start"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId={mobile ? "drawer-nav-active" : "sidebar-nav-active"}
                  className="absolute inset-0 rounded-xl bg-violet-600/15 ring-1 ring-violet-500/25"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              <Icon
                size={20}
                className={`relative z-10 shrink-0 ${isActive ? "text-violet-300" : ""}`}
              />
              {(mobile || !collapsed) && (
                <span className={`relative z-10 font-medium ${mobile ? "" : "hidden lg:block"}`}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <footer className={`mt-auto border-t border-zinc-800/80 p-4 ${mobile ? "" : "md:flex md:justify-center lg:block"}`}>
        <div className={`flex items-center gap-3 ${mobile ? "" : "md:flex-col lg:flex-row"}`}>
          <Image
            src="/avatar.png"
            alt="Ayush"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-violet-500/30"
          />
          {(mobile || !collapsed) && (
            <div className={`min-w-0 ${mobile ? "" : "hidden lg:block"}`}>
              <p className="truncate text-sm font-semibold text-white">Ayush</p>
              <p className="truncate text-xs text-zinc-500">bishnoiay299@gmail.com</p>
            </div>
          )}
        </div>
      </footer>
    </aside>
  );
}
