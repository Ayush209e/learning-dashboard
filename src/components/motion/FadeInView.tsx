"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./variants";

const viewport = { once: true, amount: 0.2, margin: "0px 0px -48px 0px" as const };

export default function FadeInView({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
