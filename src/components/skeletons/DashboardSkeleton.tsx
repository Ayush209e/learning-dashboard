import BentoGrid from "@/components/bento/BentoGrid";
import BentoTile from "@/components/bento/BentoTile";
import ActivityTileSkeleton from "@/components/skeletons/ActivityTileSkeleton";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";

export default function DashboardSkeleton() {
  return (
    <section aria-label="Loading dashboard" className="space-y-5 lg:space-y-6">
      <BentoGrid aria-label="Loading overview">
        <BentoTile span="hero">
          <article className="nebula-tile top-tile skeleton rounded-2xl lg:rounded-3xl" />
        </BentoTile>
        <BentoTile span="activity">
          <ActivityTileSkeleton />
        </BentoTile>
      </BentoGrid>

      <article className="focus-strip skeleton h-[72px] rounded-2xl lg:rounded-3xl" />

      <section aria-label="Loading courses">
        <div className="skeleton mb-4 h-7 w-40 rounded-lg" />
        <BentoGrid>
          {Array.from({ length: 4 }).map((_, i) => (
            <BentoTile key={i} span="course">
              <CourseCardSkeleton />
            </BentoTile>
          ))}
        </BentoGrid>
      </section>
    </section>
  );
}
