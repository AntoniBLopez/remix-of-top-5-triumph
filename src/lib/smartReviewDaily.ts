/**
 * Smart Review daily metrics & budget.
 * Combines FSRS state + onboarding goal + per-day session tracking.
 */
import { getDueCards, getStats, getOnboardingData } from "@/lib/fsrs";

const COMPLETED_KEY = "smart_review_completed";
const DAILY_GOAL_OVERRIDE = "smart_review_daily_goal";
const DEFAULT_GOAL = 20;
const NEW_RATIO = 0.25; // 25% of dailyGoal can be new cards/day

export interface DailySmartReviewMetrics {
  dueCount: number;
  newAvailableToday: number;
  dailyGoal: number;
  completedToday: number;
  remainingToGoal: number;
  estimatedMinutes: number;
  goalReached: boolean;
  introducedToday: number;
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

interface CompletedData {
  date: string;
  count: number;
  introduced: number;
}

function loadCompleted(): CompletedData {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (!raw) return { date: todayStr(), count: 0, introduced: 0 };
    const parsed = JSON.parse(raw) as CompletedData;
    if (parsed.date !== todayStr()) return { date: todayStr(), count: 0, introduced: 0 };
    return parsed;
  } catch {
    return { date: todayStr(), count: 0, introduced: 0 };
  }
}

function saveCompleted(data: CompletedData) {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(data));
}

export function getDailyGoal(): number {
  const override = localStorage.getItem(DAILY_GOAL_OVERRIDE);
  if (override) {
    const n = parseInt(override, 10);
    if (!isNaN(n) && n > 0) return n;
  }
  const onboarding = getOnboardingData();
  return onboarding?.dailyGoal ?? DEFAULT_GOAL;
}

export function setDailyGoal(goal: number) {
  localStorage.setItem(DAILY_GOAL_OVERRIDE, String(Math.max(5, Math.min(200, goal))));
}

export function getMaxNewCardsPerDay(): number {
  return Math.max(2, Math.round(getDailyGoal() * NEW_RATIO));
}

/**
 * Increment completed-today counter. Returns the new count.
 * Should be called once per card reviewed in a Smart Review daily session.
 */
export function incrementCompletedToday(amount = 1, wasNew = false): number {
  const data = loadCompleted();
  data.count += amount;
  if (wasNew) data.introduced += amount;
  saveCompleted(data);
  return data.count;
}

export function getDailySmartReviewMetrics(): DailySmartReviewMetrics {
  const dueCards = getDueCards();
  const dueCount = dueCards.filter((c) => c.status !== "new").length;
  const newDue = dueCards.filter((c) => c.status === "new").length;
  const completed = loadCompleted();
  const dailyGoal = getDailyGoal();
  const maxNew = getMaxNewCardsPerDay();
  const remainingNewDaily = Math.max(0, maxNew - completed.introduced);
  const newAvailableToday = Math.min(newDue, remainingNewDaily);
  const remainingToGoal = Math.max(0, dailyGoal - completed.count);
  // Heuristic: ~10 seconds per card
  const remainingCards = Math.min(remainingToGoal, dueCount + newAvailableToday);
  const estimatedMinutes = Math.max(1, Math.round((remainingCards * 10) / 60));

  return {
    dueCount,
    newAvailableToday,
    dailyGoal,
    completedToday: completed.count,
    remainingToGoal,
    estimatedMinutes,
    goalReached: completed.count >= dailyGoal,
    introducedToday: completed.introduced,
  };
}

/**
 * Build daily session size: due first, then new up to remaining budget.
 */
export function getDailySessionSize(): number {
  const m = getDailySmartReviewMetrics();
  return Math.min(m.dueCount + m.newAvailableToday, Math.max(m.remainingToGoal, 5));
}

export function getStreak(): number {
  return getStats().streak;
}
