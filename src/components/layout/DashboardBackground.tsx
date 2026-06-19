import FloatingOrbs from "@/components/layout/FloatingOrbs";

export default function DashboardBackground() {
  return (
    <>
      <div className="dashboard-bg" aria-hidden />
      <FloatingOrbs />
      <div className="grain" aria-hidden />
    </>
  );
}
