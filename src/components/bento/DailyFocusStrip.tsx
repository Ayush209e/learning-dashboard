"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import BentoTileMotion from "@/components/motion/BentoTileMotion";
import { getDailyInsight, getLearnerLevel } from "@/lib/greeting";

interface DailyFocusStripProps {
  streak: number;
}

export default function DailyFocusStrip({ streak }: DailyFocusStripProps) {
  const [index, setIndex] = useState(0);
  const insights = useMemo(
    () => [
      getDailyInsight(),
      "Ship one lesson before noon — momentum compounds.",
      "Review notes from yesterday while they're fresh.",
    ],
    []
  );
  const level = getLearnerLevel(streak);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % insights.length);
    }, 5000);
    return () => clearInterval(id);
  }, [insights.length]);

  return (
    <BentoTileMotion
      glow="violet"
      hoverScale={1.01}
      className="focus-strip rounded-2xl px-4 py-3.5 lg:rounded-3xl lg:px-5 lg:py-4"
    >
      <div aria-hidden className="focus-strip-shimmer pointer-events-none absolute inset-0" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 ring-1 ring-violet-400/25"
          >
            <Sparkles size={18} className="text-violet-300" />
          </motion.div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400/80 lg:text-xs">
              Today&apos;s focus
            </p>
            <div className="relative mt-1 min-h-10 overflow-hidden sm:min-h-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="text-sm leading-snug text-zinc-200 lg:text-base"
                >
                  {insights[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
          <span className="level-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
            <Zap size={13} className="text-amber-400" fill="currentColor" />
            <span className="text-zinc-200">Lvl {level.tier}</span>
            <span className="text-zinc-500">·</span>
            <span className="gradient-text font-semibold">{level.label}</span>
          </span>
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
        </div>
      </div>
    </BentoTileMotion>
  );
}
