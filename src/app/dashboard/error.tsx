"use client";

import { motion } from "framer-motion";
import DashboardShell from "@/components/layout/DashboardShell";
import { springHover } from "@/components/motion/variants";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <DashboardShell>
      <section className="flex min-h-[50vh] items-center justify-center">
        <motion.article
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="tile max-w-md rounded-3xl p-8 text-center"
        >
          <h1 className="text-xl font-bold">Could not load dashboard</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Failed to fetch courses from Supabase.
          </p>
          <p className="mt-2 text-xs text-zinc-500">{error.message}</p>

          <motion.button
            type="button"
            onClick={reset}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springHover}
            className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-900"
          >
            Try again
          </motion.button>
        </motion.article>
      </section>
    </DashboardShell>
  );
}
