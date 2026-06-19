import DashboardShell from "@/components/layout/DashboardShell";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { getCourses } from "@/actions/courses";

const STUDENT = { name: "Ayush", streak: 12 };

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <DashboardShell>
      <DashboardContent
        courses={courses}
        name={STUDENT.name}
        streak={STUDENT.streak}
      />
    </DashboardShell>
  );
}
