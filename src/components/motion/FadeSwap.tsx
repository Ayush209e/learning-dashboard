"use client";

import { AnimatePresence, motion } from "framer-motion";
import { fadeUpExit } from "./variants";

export default function FadeSwap({
  swapKey,
  children,
  className,
}: {
  swapKey: string | number | null;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={swapKey ?? "empty"}
        variants={fadeUpExit}
        initial="hidden"
        animate="show"
        exit="exit"
        className={className}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
