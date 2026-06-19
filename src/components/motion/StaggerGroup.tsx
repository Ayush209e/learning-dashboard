"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { staggerContainer } from "./variants";

type StaggerGroupProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export default function StaggerGroup({
  children,
  className,
  ...props
}: StaggerGroupProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
