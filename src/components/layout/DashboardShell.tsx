import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import DashboardBackground from "./DashboardBackground";
import { NavProvider } from "@/context/NavContext";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavProvider>
      <DashboardBackground />

      <div className="relative flex min-h-screen text-zinc-100">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <MobileNav />

          <main className="flex-1 px-4 py-5 pb-24 md:px-6 md:py-6 md:pb-6 lg:px-8 lg:py-7">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </NavProvider>
  );
}
