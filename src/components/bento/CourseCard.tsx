"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import BentoTileMotion from "@/components/motion/BentoTileMotion";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { bentoIconHover, fadeUpExit } from "@/components/motion/variants";
import { Course } from "@/types/course";

const barColors = [
  "from-sky-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-blue-600 to-indigo-500",
  "from-emerald-400 to-green-500",
];

interface CourseCardProps {
  course: Course;
  index?: number;
  isPointer?: boolean;
  onPointer?: () => void;
}

export default function CourseCard({
  course,
  index = 0,
  isPointer = false,
  onPointer,
}: CourseCardProps) {
  const bar = barColors[index % barColors.length];
  const total = 16;
  const completed = Math.max(1, Math.round((course.progress / 100) * total));
  const isNearComplete = course.progress >= 80;
  const isComplete = course.progress >= 100;

  return (
    <BentoTileMotion
      role="button"
      tabIndex={0}
      onClick={onPointer}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPointer?.();
        }
      }}
      hoverScale={1.02}
      glow="violet"
      glowOpacity={isPointer ? 1 : undefined}
      aria-label={`${course.title}, ${course.progress}% complete${isPointer ? ", selected course" : ""}`}
      aria-pressed={isPointer}
      className={`tile flex h-full min-h-[210px] cursor-pointer flex-col rounded-2xl p-5 lg:rounded-3xl lg:p-6 ${
        isPointer ? "ring-1 ring-violet-400/40" : ""
      }`}
    >
      <AnimatePresence>
        {isPointer && (
          <motion.span
            key="pointer-badge"
            variants={fadeUpExit}
            initial="hidden"
            animate="show"
            exit="exit"
            className="course-pointer-badge absolute left-4 top-4 z-20 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
          >
            <motion.span
              animate={{ x: [0, 3, 0], y: [0, -2, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <MousePointer2 size={11} />
            </motion.span>
            Continue here
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isNearComplete || isComplete) && !isPointer && (
          <motion.span
            key="milestone-badge"
            variants={fadeUpExit}
            initial="hidden"
            animate="show"
            exit="exit"
            className={`absolute right-4 top-4 z-20 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              isComplete ? "milestone-badge-complete" : "milestone-badge-near"
            }`}
          >
            {isComplete ? "Completed ✦" : "Almost there!"}
          </motion.span>
        )}
      </AnimatePresence>

      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] grain-texture" />

      <div className="flex flex-1 flex-col">
        <motion.div
          variants={bentoIconHover}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-inner"
        >
          <DynamicIcon name={course.icon_name} className="text-blue-300" />
        </motion.div>

        <h3 className="mt-3 line-clamp-2 flex-1 text-sm font-semibold leading-snug text-white lg:text-base">
          {course.title}
        </h3>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs lg:text-sm">
            <span className="text-zinc-400">Progress</span>
            <span className="font-semibold tabular-nums text-zinc-100">{course.progress}%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800/80 ring-1 ring-white/5 lg:h-2">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: course.progress / 100, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 + index * 0.04 }}
              style={{ transformOrigin: "left" }}
              className={`h-full w-full rounded-full bg-gradient-to-r ${bar} shadow-sm`}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              {completed} / {total} lessons completed
            </p>
          </div>
        </div>
      </div>

      <motion.span
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.2 } },
        }}
        className="absolute bottom-5 right-5 flex items-center gap-0.5 text-[10px] font-medium text-violet-400 lg:bottom-6 lg:right-6"
        aria-hidden
      >
        Open
        <ArrowUpRight size={12} />
      </motion.span>
    </BentoTileMotion>
  );
}
