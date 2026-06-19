export default function CourseCardSkeleton() {
  return (
    <article className="tile skeleton min-h-[210px] rounded-2xl p-5 lg:col-span-3 lg:rounded-3xl lg:p-6">
      <div className="h-11 w-11 rounded-xl bg-zinc-800/70" />
      <div className="mt-4 h-5 w-3/4 rounded bg-zinc-800/70" />
      <div className="mt-8 h-2 rounded-full bg-zinc-800/70" />
    </article>
  );
}