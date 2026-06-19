import { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

/** Fade in + translate up — opacity & y only (no layout shift). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

/** Opacity-only fade — for swaps and crossfades. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const fadeUpExit: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export const springHover = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

/** Bento tile hover — scale only (assignment: ~1–2%). */
export const bentoTileHover = (scale = 1.02) => ({
  rest: { scale: 1 },
  hover: { scale, transition: springHover },
  tap: { scale: scale - 0.03, transition: springHover },
});

/** Opacity-only glow overlay — pairs with bentoTileHover on parent. */
export const bentoTileGlow: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
};

export const bentoIconHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: springHover },
};

export const activityGrid: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.018,
      delayChildren: 0.2,
    },
  },
};

export const activityCell: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 24 },
  },
};

export const activityWaveCell: Variants = {
  hidden: { opacity: 0, scale: 0.4, y: 6 },
  show: (i: number) => {
    const rows = 7;
    const col = Math.floor(i / rows);
    const row = i % rows;
    return {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 460,
        damping: 24,
        delay: 0.2 + col * 0.028 + row * 0.008,
      },
    };
  },
};

export const activityLegendItem: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};
