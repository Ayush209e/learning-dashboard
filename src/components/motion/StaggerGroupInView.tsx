"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { staggerContainer } from "./variants";

const viewport = { once: true, amount: 0.12, margin: "0px 0px -48px 0px" as const };

type StaggerGroupInViewProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

/** Stagger children when the group scrolls into view (for below-the-fold tiles). */
export default function StaggerGroupInView({
  children,
  className,
  ...props
}: StaggerGroupInViewProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
