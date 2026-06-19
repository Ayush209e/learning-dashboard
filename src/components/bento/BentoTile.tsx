import { cn } from "@/lib/utils";

export type BentoSpan = "hero" | "activity" | "course" | "full";

export const bentoSpanClass: Record<BentoSpan, string> = {
  hero: "col-span-1 md:col-span-1 lg:col-span-7",
  activity: "col-span-1 md:col-span-1 lg:col-span-5",
  course: "col-span-1 sm:col-span-1 lg:col-span-3",
  full: "col-span-1 md:col-span-2 lg:col-span-12",
};

export default function BentoTile({
  span,
  className,
  children,
}: {
  span: BentoSpan;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(bentoSpanClass[span], className)}>{children}</div>;
}
