import DashboardShell from "@/components/layout/DashboardShell";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

export default function Loading() {
  return (
    <DashboardShell>
      <DashboardSkeleton />
    </DashboardShell>
  );
}
