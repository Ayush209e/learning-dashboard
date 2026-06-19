"use client";

import { motion } from "framer-motion";
import { Activity, ChevronDown } from "lucide-react";
import BentoTileMotion from "@/components/motion/BentoTileMotion";
import CountUp from "@/components/motion/CountUp";
import ActivityGithubGraph from "@/components/bento/ActivityGithubGraph";
import { springHover } from "@/components/motion/variants";
import { ACTIVITY_MONTHS, getDayContributions, getTotalContributions } from "@/lib/activity-data";

const totalContributions = getTotalContributions(getDayContributions());

export default function ActivityTile() {
  return (
    <BentoTileMotion
      glow="green"
      hoverScale={1.01}
      className="tile activity-tile flex h-full flex-col rounded-2xl px-4 py-3.5 lg:rounded-3xl lg:px-5 lg:py-4"
    >
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
              className="activity-header-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl lg:h-10 lg:w-10"
            >
              <Activity size={18} className="text-black" strokeWidth={2.5} />
            </motion.div>

            <div className="min-w-0 flex-1">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.12 }}
                className="text-base font-bold text-white lg:text-lg"
              >
                Your Activity
              </motion.h2>
              <p className="mt-1 text-xs text-zinc-400 lg:text-sm">Last {ACTIVITY_MONTHS} months</p>
              <div className="mt-2">
                <span className="activity-stat-pill inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium lg:text-xs">
                  <CountUp value={totalContributions} delay={0.3} duration={0.9} />
                  <span>contributions</span>
                </span>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={springHover}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-zinc-700/80 bg-zinc-900/60 px-2.5 py-1 text-[10px] text-zinc-300"
          >
            {ACTIVITY_MONTHS} Months
            <ChevronDown size={12} />
          </motion.button>
        </div>

        <ActivityGithubGraph />
      </div>
    </BentoTileMotion>
  );
}
