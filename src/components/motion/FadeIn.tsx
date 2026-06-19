"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./variants";

export default function FadeIn({
  children,
  className,
  id,
  delay = 0,
  standalone = false,
  /** Fade up when scrolled into view (for below-the-fold tiles). */
  inView = false,
  viewDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  standalone?: boolean;
  inView?: boolean;
  viewDelay?: number;
}) {
  if (inView) {
    return (
      <motion.div
        id={id}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -48px 0px" }}
        transition={{ delay: viewDelay }}
        className={className}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    );
  }

  if (standalone) {
    return (
      <motion.div
        id={id}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay }}
        className={className}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      variants={fadeUp}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
