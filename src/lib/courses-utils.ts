import { Course } from "@/types/course";

/** Pick the best course to continue — highest in-progress, not yet complete. */
export function getContinueCourse(courses: Course[]): Course | null {
  if (courses.length === 0) return null;

  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  if (inProgress.length > 0) {
    return inProgress.reduce((best, c) => (c.progress > best.progress ? c : best));
  }

  const notStarted = courses.find((c) => c.progress === 0);
  if (notStarted) return notStarted;

  return courses[0];
}
