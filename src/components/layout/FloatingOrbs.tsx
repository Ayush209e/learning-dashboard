"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 320, x: "12%", y: "18%", color: "rgba(139, 92, 246, 0.18)", duration: 22 },
  { size: 260, x: "78%", y: "12%", color: "rgba(59, 130, 246, 0.14)", duration: 26 },
  { size: 200, x: "65%", y: "72%", color: "rgba(236, 72, 153, 0.1)", duration: 20 },
  { size: 180, x: "28%", y: "80%", color: "rgba(16, 185, 129, 0.09)", duration: 24 },
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            x: [0, 28, -18, 0],
            y: [0, -22, 14, 0],
            scale: [1, 1.08, 0.94, 1],
            opacity: [0.6, 0.85, 0.55, 0.6],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
