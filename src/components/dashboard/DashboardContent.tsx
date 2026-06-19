"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Course } from "@/types/course";
import { getContinueCourse } from "@/lib/courses-utils";
import BentoGrid from "@/components/bento/BentoGrid";
import { bentoSpanClass } from "@/components/bento/BentoTile";
import DailyFocusStrip from "@/components/bento/DailyFocusStrip";
import StreakTile from "@/components/bento/StreakTile";
import ActivityTile from "@/components/bento/ActivityTile";
import CourseCard from "@/components/bento/CourseCard";
import StaggerGroup from "@/components/motion/StaggerGroup";
import FadeIn from "@/components/motion/FadeIn";
import { fadeUpExit, springHover } from "@/components/motion/variants";
import { cn } from "@/lib/utils";

interface Props {
  courses: Course[];
  name: string;
  streak: number;
}

export default function DashboardContent({ courses, name, streak }: Props) {
  const continueCourse = useMemo(() => getContinueCourse(courses), [courses]);
  const [pointerId, setPointerId] = useState<string | null>(null);

  const activePointerId = pointerId ?? continueCourse?.id ?? null;
  const pointerCourse = courses.find((c) => c.id === activePointerId);

  return (
    <>
      <section aria-label="Dashboard overview" className="mb-4 lg:mb-5">
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <FadeIn id="streak-section" className={cn(bentoSpanClass.hero, "h-full")}>
            <StreakTile name={name} streak={streak} />
          </FadeIn>

          <FadeIn id="activity-section" className={cn(bentoSpanClass.activity, "h-full")}>
            <ActivityTile />
          </FadeIn>

          <FadeIn className={bentoSpanClass.full}>
            <DailyFocusStrip streak={streak} />
          </FadeIn>

          <FadeIn id="courses-section" className={bentoSpanClass.full}>
            <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white md:text-xl">Your Courses</h2>
                <div className="mt-0.5 min-h-[1rem]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activePointerId ?? "default"}
                      variants={fadeUpExit}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="text-xs text-zinc-500"
                    >
                      {pointerCourse
                        ? `Pointer set on "${pointerCourse.title}" — click a card to move it`
                        : "Pick up where you left off"}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springHover}
                className="text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                View all →
              </motion.button>
            </header>
          </FadeIn>
        </StaggerGroup>
      </section>

      <section aria-label="Your courses">
        {courses.length > 0 ? (
          <BentoGrid>
            {courses.map((course, index) => (
              <FadeIn
                key={course.id}
                inView
                viewDelay={index * 0.08}
                className={bentoSpanClass.course}
              >
                <CourseCard
                  course={course}
                  index={index}
                  isPointer={course.id === activePointerId}
                  onPointer={() => setPointerId(course.id)}
                />
              </FadeIn>
            ))}
          </BentoGrid>
        ) : (
          <FadeIn inView className={bentoSpanClass.full}>
            <article className="tile rounded-3xl border border-dashed border-zinc-700 p-10 text-center">
              <h3 className="font-semibold text-white">No courses yet</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Seed your Supabase <code>courses</code> table with 3–4 rows (see README).
              </p>
            </article>
          </FadeIn>
        )}
      </section>
    </>
  );
}
