"use client";

import { useMemo, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  activityLegendItem,
  activityWaveCell,
  springHover,
} from "@/components/motion/variants";
import {
  ACTIVITY_MONTHS,
  buildContributionCalendar,
  formatContributionLabel,
  WEEKDAY_LABELS,
} from "@/lib/activity-data";
import { cn } from "@/lib/utils";

function cellClass(level: number) {
  return `github-cell-${level}`;
}

export default function ActivityGithubGraph() {
  const calendar = useMemo(() => buildContributionCalendar(), []);

  let cellIndex = 0;

  return (
    <div className="github-graph-panel mt-4 flex flex-1 flex-col justify-center rounded-xl lg:mt-5">
      <div className="github-heatmap overflow-x-auto">
        <div className="inline-flex min-w-0 flex-col py-0.5">
          {/* Month labels — aligned to week columns like GitHub */}
          <div className="github-month-row">
            {calendar.monthLabels.map(({ weekIndex, label }) => (
              <span
                key={`${label}-${weekIndex}`}
                className="github-month-label text-[10px] font-normal text-[#7d8590]"
                style={{ "--week-index": weekIndex } as CSSProperties}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-2.5 sm:gap-3.5">
            {/* Weekday axis */}
            <div
              className="hidden shrink-0 sm:flex sm:flex-col sm:justify-around sm:py-px"
              aria-hidden
            >
              {WEEKDAY_LABELS.map((label, i) => (
                <span
                  key={i}
                  className="flex h-[10px] items-center text-[9px] leading-none text-[#7d8590] sm:h-[11px] sm:text-[10px]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Contribution grid — columns = weeks, rows = weekdays (Sun–Sat) */}
            <motion.div
              className="grid auto-cols-max grid-flow-col grid-rows-7 gap-[5px] sm:gap-1.5"
              initial="hidden"
              animate="show"
              role="img"
              aria-label={`GitHub-style contribution calendar for the last ${ACTIVITY_MONTHS} months`}
            >
              {calendar.weeks.map((week, weekIndex) =>
                week.map((cell, rowIndex) => {
                  const index = cellIndex++;
                  const tooltip = formatContributionLabel(cell);

                  return (
                    <motion.div
                      key={`${weekIndex}-${rowIndex}`}
                      custom={index}
                      variants={activityWaveCell}
                      title={tooltip || undefined}
                      whileHover={
                        cell.inRange
                          ? { scale: 1.18, y: -1, transition: springHover }
                          : undefined
                      }
                      className={cn(
                        "github-cell h-[10px] w-[10px] rounded-[2px] sm:h-[11px] sm:w-[11px]",
                        cellClass(cell.level),
                        cell.inRange && cell.level === 4 && "github-cell-pulse",
                        !cell.inRange && "github-cell-outside pointer-events-none opacity-40"
                      )}
                    />
                  );
                })
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Less / More legend */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.35 }}
        className="mt-5 flex items-center justify-end gap-2.5 px-1 pb-1 pt-1 text-[10px] text-[#7d8590] sm:mt-6"
      >
        <span>Less</span>
        <motion.div
          className="flex items-center gap-[3px] sm:gap-1"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.9 } },
          }}
        >
          {[0, 1, 2, 3, 4].map((level) => (
            <motion.div
              key={level}
              variants={activityLegendItem}
              className={cn(
                "github-cell h-[10px] w-[10px] rounded-[2px] sm:h-2.5 sm:w-2.5",
                cellClass(level)
              )}
            />
          ))}
        </motion.div>
        <span>More</span>
      </motion.div>
    </div>
  );
}
