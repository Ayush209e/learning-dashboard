export default function ActivityTileSkeleton() {
  return (
    <article className="tile activity-tile skeleton min-h-[280px] rounded-2xl lg:min-h-[300px] lg:rounded-3xl">
      <div className="flex flex-col gap-4 p-4 lg:p-5">
        <div className="flex gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-800/70" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 rounded bg-zinc-800/70" />
            <div className="h-3 w-24 rounded bg-zinc-800/60" />
            <div className="h-5 w-28 rounded-full bg-zinc-800/60" />
          </div>
        </div>
        <div className="min-h-[160px] flex-1 rounded-xl bg-zinc-900/80" />
      </div>
    </article>
  );
}
