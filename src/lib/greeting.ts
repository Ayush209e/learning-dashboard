export function getTimeGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 5) return "Burning the midnight oil";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

export const DAILY_INSIGHTS = [
  "Consistency beats intensity — 20 minutes today beats 3 hours tomorrow.",
  "Your brain rewires with every lesson. Keep the streak alive.",
  "Teaching someone else is the fastest way to master a topic.",
  "Progress isn't linear. Plateaus mean you're leveling up.",
  "Focus on one course today. Depth > breadth.",
  "Every green square on your graph is a vote for future you.",
] as const;

export function getDailyInsight(date = new Date()) {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_INSIGHTS[dayOfYear % DAILY_INSIGHTS.length];
}

export function getLearnerLevel(streak: number) {
  if (streak >= 30) return { label: "Legend", tier: 5 };
  if (streak >= 21) return { label: "Master", tier: 4 };
  if (streak >= 14) return { label: "Scholar", tier: 3 };
  if (streak >= 7) return { label: "Explorer", tier: 2 };
  return { label: "Rookie", tier: 1 };
}
