export const ACTIVITY_MONTHS = 6;

/** @deprecated use ACTIVITY_MONTHS */
export const ACTIVITY_DAYS = ACTIVITY_MONTHS * 30;

/** GitHub uses Sunday as the first row (0 = Sun … 6 = Sat). */
export const GITHUB_WEEK_START = 0;

export const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface DayContribution {
  date: string;
  level: ContributionLevel;
  count: number;
}

export interface CalendarCell {
  date: Date;
  inRange: boolean;
  level: ContributionLevel;
  count: number;
}

export interface MonthLabel {
  weekIndex: number;
  label: string;
}

export interface ContributionCalendar {
  weeks: CalendarCell[][];
  numWeeks: number;
  monthLabels: MonthLabel[];
  startDate: Date;
  endDate: Date;
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return startOfDay(d);
}

function toIsoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function levelFromCount(count: number): ContributionLevel {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

/** Deterministic mock counts — stable per calendar date, biased toward active days. */
function mockCountForDate(date: Date): number {
  const seed =
    date.getDate() * 13 + date.getMonth() * 31 + (date.getFullYear() % 100) * 7;
  const roll = (seed * 11 + date.getDay() * 5) % 100;

  // ~8% rest days — keeps the graph mostly green
  if (roll < 8) return 0;

  const bucket = (seed * 5 + roll) % 100;
  if (bucket < 12) return 2;
  if (bucket < 28) return 4;
  if (bucket < 48) return 6;
  if (bucket < 68) return 9;
  if (bucket < 85) return 12;
  return 14;
}

export function getActivityRange(endDate = new Date()): { startDate: Date; endDate: Date } {
  const end = startOfDay(endDate);
  const start = new Date(end);
  start.setMonth(start.getMonth() - ACTIVITY_MONTHS);
  start.setDate(start.getDate() + 1);
  return { startDate: startOfDay(start), endDate: end };
}

export function getDayContributions(referenceDate = new Date()): DayContribution[] {
  const { startDate, endDate: rangeEnd } = getActivityRange(referenceDate);
  const days: DayContribution[] = [];

  for (let cursor = new Date(startDate); cursor <= rangeEnd; cursor = addDays(cursor, 1)) {
    const count = mockCountForDate(cursor);
    days.push({
      date: toIsoDate(cursor),
      level: levelFromCount(count),
      count,
    });
  }

  return days;
}

function startOfWeek(date: Date, weekStart = GITHUB_WEEK_START) {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = (day - weekStart + 7) % 7;
  return addDays(d, -diff);
}

function endOfWeek(date: Date, weekStart = GITHUB_WEEK_START) {
  const start = startOfWeek(date, weekStart);
  return addDays(start, 6);
}

function buildContributionMap(endDate = new Date()) {
  const map = new Map<string, DayContribution>();
  for (const entry of getDayContributions(endDate)) {
    map.set(entry.date, entry);
  }
  return map;
}

function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short" });
}

function getMonthLabels(weeks: CalendarCell[][]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  const labeledMonths = new Set<string>();

  weeks.forEach((column, weekIndex) => {
    const firstOfMonth = column.find((cell) => cell.inRange && cell.date.getDate() === 1);
    if (!firstOfMonth) return;

    const monthKey = `${firstOfMonth.date.getFullYear()}-${firstOfMonth.date.getMonth()}`;
    if (labeledMonths.has(monthKey)) return;

    labeledMonths.add(monthKey);
    labels.push({ weekIndex, label: formatMonth(firstOfMonth.date) });
  });

  const firstWeekIndex = weeks.findIndex((column) => column.some((cell) => cell.inRange));
  if (firstWeekIndex >= 0) {
    const leadDate = weeks[firstWeekIndex].find((cell) => cell.inRange)!.date;
    const monthKey = `${leadDate.getFullYear()}-${leadDate.getMonth()}`;
    if (!labeledMonths.has(monthKey)) {
      labels.unshift({ weekIndex: firstWeekIndex, label: formatMonth(leadDate) });
    }
  }

  return labels.sort((a, b) => a.weekIndex - b.weekIndex);
}

export function buildContributionCalendar(endDate = new Date()): ContributionCalendar {
  const { startDate, endDate: rangeEnd } = getActivityRange(endDate);
  const gridStart = startOfWeek(startDate);
  const gridEnd = endOfWeek(rangeEnd);
  const contributionMap = buildContributionMap(endDate);

  const totalDays =
    Math.floor((gridEnd.getTime() - gridStart.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  const numWeeks = Math.ceil(totalDays / 7);

  const weeks: CalendarCell[][] = [];

  for (let weekIndex = 0; weekIndex < numWeeks; weekIndex++) {
    const column: CalendarCell[] = [];

    for (let row = 0; row < 7; row++) {
      const date = addDays(gridStart, weekIndex * 7 + row);
      const inRange = date >= startDate && date <= rangeEnd;
      const entry = contributionMap.get(toIsoDate(date));
      const count = inRange ? (entry?.count ?? 0) : 0;
      const level = inRange ? (entry?.level ?? 0) : 0;

      column.push({ date, inRange, level, count });
    }

    weeks.push(column);
  }

  const monthLabels = getMonthLabels(weeks);

  return {
    weeks,
    numWeeks,
    monthLabels,
    startDate,
    endDate: rangeEnd,
  };
}

export function getTotalContributions(days = getDayContributions()) {
  return days.reduce((sum, d) => sum + d.count, 0);
}

export function getActiveDayCount(days = getDayContributions()) {
  return days.filter((d) => d.count > 0).length;
}

export function getBestDay(days = getDayContributions()) {
  return days.reduce((best, d) => (d.count > best.count ? d : best), days[0]);
}

export function formatContributionLabel(cell: CalendarCell) {
  const weekday = cell.date.toLocaleDateString("en-US", { weekday: "long" });
  const formatted = cell.date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!cell.inRange) return "";
  if (cell.count === 0) return `No contributions on ${weekday}, ${formatted}.`;
  if (cell.count === 1) return `1 contribution on ${weekday}, ${formatted}.`;
  return `${cell.count} contributions on ${weekday}, ${formatted}.`;
}

/** @deprecated use buildContributionCalendar */
export function getGithubContributionCells() {
  const { weeks } = buildContributionCalendar();
  return weeks.flatMap((column) => column.map((cell) => cell.level));
}

/** @deprecated use buildContributionCalendar */
export function getDayForCellIndex(index: number): number | null {
  const { weeks } = buildContributionCalendar();
  const flat = weeks.flatMap((column) => column);
  const cell = flat[index];
  if (!cell?.inRange) return null;
  return cell.date.getDate();
}

/** @deprecated use buildContributionCalendar */
export function getContributionForDay(day: number, days = getDayContributions()) {
  return days.find((d) => new Date(d.date).getDate() === day) ?? null;
}

/** @deprecated use getTotalContributions */
export function getContributionCount(cells: number[]) {
  return cells.filter((level) => level > 0).length;
}
