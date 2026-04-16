import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Clock, Sparkles, ArrowRight, Flame, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  getDailySmartReviewMetrics,
  type DailySmartReviewMetrics,
} from "@/lib/smartReviewDaily";
import { trackSmartReview } from "@/lib/smartReviewAnalytics";
import { getStats } from "@/lib/fsrs";

const SmartReviewHubCard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DailySmartReviewMetrics | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const m = getDailySmartReviewMetrics();
    setMetrics(m);
    setStreak(getStats().streak);
    void trackSmartReview("smart_review_daily_opened", {
      dueCount: m.dueCount,
      newCount: m.newAvailableToday,
      dailyGoal: m.dailyGoal,
      completedTodayBefore: m.completedToday,
    });
  }, []);

  if (!metrics) return null;

  const { dueCount, newAvailableToday, dailyGoal, completedToday, estimatedMinutes, goalReached } =
    metrics;
  const totalAvailable = dueCount + newAvailableToday;
  const progressPct = Math.min(100, Math.round((completedToday / dailyGoal) * 100));

  const ctaLabel =
    totalAvailable === 0
      ? goalReached
        ? "Ver resumen"
        : "Practicar libremente"
      : dueCount > 0
        ? "Empezar repaso"
        : "Aprender nuevas";

  const handleStart = () => {
    if (totalAvailable === 0 && !goalReached) {
      navigate("/games/conjugaciones");
      return;
    }
    navigate("/conjugations/review?mode=daily");
  };

  const handleAdjustGoal = () => navigate("/settings");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-5 shadow-lg md:p-6"
      aria-label="Smart Review diario"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Smart Review
            </p>
            <h2 className="text-lg font-extrabold text-foreground md:text-xl">Tu revisión de hoy</h2>
          </div>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 rounded-full bg-accent/20 px-2.5 py-1">
            <Flame className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-extrabold text-accent-foreground">{streak}</span>
          </div>
        )}
      </div>

      {/* KPIs */}
      <div className="relative mt-5 grid grid-cols-3 gap-2">
        <KPI label="Vencidas" value={dueCount} highlight={dueCount > 0} />
        <KPI label="Nuevas" value={newAvailableToday} />
        <KPI label="Meta" value={`${completedToday}/${dailyGoal}`} />
      </div>

      {/* Progress */}
      <div className="relative mt-4 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Progreso de hoy
          </span>
          <span className="text-[11px] font-bold text-primary">{progressPct}%</span>
        </div>
        <Progress value={progressPct} className="h-2 bg-muted" />
      </div>

      {/* Context */}
      <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
        {totalAvailable > 0 ? (
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            ~{estimatedMinutes} min · {totalAvailable} cards
          </span>
        ) : goalReached ? (
          <span className="flex items-center gap-1.5 text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Meta de hoy completada
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Hoy estás al día
          </span>
        )}
        <button
          onClick={handleAdjustGoal}
          className="text-[11px] font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          Ajustar meta
        </button>
      </div>

      {/* CTA */}
      <button
        onClick={handleStart}
        className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-extrabold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </button>

      {dueCount > 0 && newAvailableToday > 0 && (
        <p className="relative mt-2.5 text-center text-[11px] text-muted-foreground">
          Primero repasamos vencidas para no perder retención.
        </p>
      )}
    </motion.section>
  );
};

const KPI = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) => (
  <div
    className={`flex flex-col items-center gap-0.5 rounded-2xl border bg-background/60 px-2 py-3 backdrop-blur-sm ${
      highlight ? "border-primary/40" : "border-border/60"
    }`}
  >
    <span
      className={`text-xl font-extrabold leading-none md:text-2xl ${
        highlight ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </span>
    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
);

export default SmartReviewHubCard;
