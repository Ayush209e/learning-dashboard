"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  TrendingUp,
  User,
  Menu,
  Bell,
  X,
} from "lucide-react";
import Image from "next/image";
import { useNav, type NavItem } from "@/context/NavContext";
import Sidebar from "./Sidebar";

const links: { label: NavItem; icon: typeof LayoutDashboard; short: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard, short: "Home" },
  { label: "My Courses", icon: BookOpen, short: "Courses" },
  { label: "Calendar", icon: Calendar, short: "Calendar" },
  { label: "Progress", icon: TrendingUp, short: "Progress" },
  { label: "Settings", icon: User, short: "Profile" },
];

export default function MobileNav() {
  const { active, setActive } = useNav();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-300"
        >
          <Menu size={22} />
        </button>

        <span className="text-sm font-bold text-white">Learnify</span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400"
          >
            <Bell size={20} />
          </button>
          <Image
            src="/avatar.png"
            alt="Profile"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-violet-500/30"
          />
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-72 md:hidden"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300"
              >
                <X size={16} />
              </button>
              <Sidebar mobile onNavigate={() => setDrawerOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800/80 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        <ul className="flex justify-around px-1 py-1.5">
          {links.map(({ label, icon: Icon, short }) => {
            const isActive = active === label;

            return (
              <li key={label}>
                <button
                  type="button"
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActive(label)}
                  className="relative flex min-w-[3.5rem] flex-col items-center gap-0.5 rounded-xl px-2 py-2"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-bottom-active"
                      className="absolute inset-0 rounded-xl bg-violet-600/15"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  <Icon
                    size={20}
                    className={`relative z-10 ${isActive ? "text-violet-300" : "text-zinc-500"}`}
                  />
                  <span
                    className={`relative z-10 text-[10px] font-medium ${isActive ? "text-violet-200" : "text-zinc-500"}`}
                  >
                    {short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
