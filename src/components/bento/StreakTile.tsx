"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import BentoTileMotion from "@/components/motion/BentoTileMotion";
import CountUp from "@/components/motion/CountUp";
import { getTimeGreeting } from "@/lib/greeting";

interface StreakTileProps {
  name: string;
  streak: number;
}

export default function StreakTile({ name, streak }: StreakTileProps) {
  const greeting = getTimeGreeting();
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(streak / 30, 1);
  const size = 112;

  return (
    <BentoTileMotion
      glow="nebula"
      hoverScale={1.01}
      className="nebula-tile top-tile flex items-center rounded-2xl px-5 py-5 lg:rounded-3xl lg:px-6 lg:py-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-violet-500/10 blur-2xl"
      />
      <div aria-hidden className="hero-sparkles pointer-events-none absolute inset-0" />

      <div className="flex w-full items-center justify-between gap-4 py-1 lg:py-2">
        <header className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-violet-400/70 lg:text-xs">
            {greeting}
          </p>
          <h1 className="mt-1 truncate text-base font-bold lg:text-lg">
            <span className="text-white">Welcome back, </span>
            <span className="gradient-text">{name}</span>
            <span className="text-white">! </span>
            <motion.span
              aria-hidden
              className="inline-block origin-bottom-right"
              animate={{ rotate: [0, 14, -8, 10, 0] }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
            >
              👋
            </motion.span>
          </h1>
          <p className="mt-1.5 truncate text-xs text-zinc-400 lg:text-sm">
            Here&apos;s what&apos;s happening with your learning today.
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5">
            <Flame size={15} className="shrink-0 text-orange-400" fill="currentColor" />
            <CountUp
              value={streak}
              delay={0.2}
              className="text-2xl font-bold leading-none text-white"
            />
            <span className="text-sm text-zinc-400">day streak</span>
          </p>
        </header>

        <figure
          className="relative m-0 flex shrink-0 items-center justify-center"
          style={{ width: size, height: size }}
          aria-label={`${streak} day learning streak`}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
            aria-hidden
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="7"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#streakRing)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - progress) }}
              transition={{ duration: 1.3, ease: "easeOut", delay: 0.15 }}
            />
            <defs>
              <linearGradient id="streakRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-rose-500 to-violet-600 shadow-lg shadow-orange-500/30"
            aria-hidden
          >
            <Flame size={22} className="text-white" strokeWidth={2} fill="currentColor" />
          </motion.div>
        </figure>
      </div>
    </BentoTileMotion>
  );
}
