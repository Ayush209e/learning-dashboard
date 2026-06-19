"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { bentoTileGlow, bentoTileHover } from "./variants";
import { cn } from "@/lib/utils";

type GlowTone = "violet" | "green" | "nebula";

const glowToneClass: Record<GlowTone, string> = {
  violet:
    "bg-gradient-to-br from-violet-500/14 via-fuchsia-500/5 to-transparent shadow-[0_0_40px_rgba(139,92,246,0.14)] ring-1 ring-inset ring-violet-400/25",
  green:
    "bg-gradient-to-br from-emerald-500/12 to-transparent shadow-[0_0_36px_rgba(57,211,83,0.1)] ring-1 ring-inset ring-emerald-400/20",
  nebula:
    "bg-gradient-to-br from-violet-500/18 via-blue-500/8 to-transparent shadow-[0_0_48px_rgba(139,92,246,0.12)] ring-1 ring-inset ring-violet-300/30",
};

interface BentoTileMotionProps extends HTMLMotionProps<"article"> {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  glow?: GlowTone;
  /** Always-visible glow layer (e.g. course pointer). Opacity 0–1. */
  glowOpacity?: number;
}

export default function BentoTileMotion({
  children,
  className,
  hoverScale = 1.02,
  glow = "violet",
  glowOpacity,
  ...props
}: BentoTileMotionProps) {
  return (
    <motion.article
      variants={bentoTileHover(hoverScale)}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <motion.div
        aria-hidden
        variants={bentoTileGlow}
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", glowToneClass[glow])}
      />

      {glowOpacity !== undefined && glowOpacity > 0 && (
        <motion.div
          aria-hidden
          animate={{ opacity: glowOpacity }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit]",
            glowToneClass[glow]
          )}
        />
      )}

      <div className="relative z-10 flex min-h-full flex-col justify-center">{children}</div>
    </motion.article>
  );
}
