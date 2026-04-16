import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, PenLine, Sun, Moon, Flame, Gamepad2, Crown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import BottomNav from "@/components/BottomNav";
import SuperUpgradeDialog from "@/components/SuperUpgradeDialog";
import SmartReviewHubCard from "@/components/SmartReviewHubCard";
import DailyStreakPopup from "@/components/DailyStreakPopup";
const MOCK_STREAK = 7;

const MODES = [
  {
    id: "vocabulario",
    label: "Vocabulario",
    desc: "Aprende y repasa palabras en alemán con juegos interactivos",
    emoji: "📚",
    icon: BookOpen,
    route: "/games/vocabulario",
  },
  {
    id: "conjugaciones",
    label: "Conjugaciones",
    desc: "Practica las conjugaciones verbales en alemán con ejercicios",
    emoji: "✏️",
    icon: PenLine,
    route: "/games/conjugaciones",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showSuper, setShowSuper] = useState(false);
  const [showStreak, setShowStreak] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            <span className="text-base font-bold text-foreground md:text-lg">SpanischMitBelu</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSuper(true)}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-500 transition-all hover:scale-105 active:scale-95"
            >
              <Crown className="h-3 w-3" />
              Super
            </button>
            <button
              onClick={() => setShowStreak(true)}
              className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 transition-all hover:scale-105 hover:bg-accent/25 active:scale-95"
              aria-label="Ver racha diaria"
            >
              <Flame className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold text-accent-foreground">{MOCK_STREAK}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 pb-8 pt-6 md:px-6 md:pt-10 space-y-8">
        {/* Smart Review Hub — daily plan */}
        <SmartReviewHubCard />

        {/* Free practice section */}
        <div>
          <div className="mb-5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Práctica libre
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-foreground md:text-2xl">
              ¿Qué quieres practicar?
            </h2>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Juegos sin afectar tu plan diario
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {MODES.map(({ id, label, desc, emoji, route }) => (
            <button
              key={id}
              onClick={() => navigate(route)}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg active:scale-[0.98] md:p-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-4xl md:h-20 md:w-20 md:text-5xl">
                {emoji}
              </div>
              <div>
                <p className="text-lg font-extrabold text-foreground md:text-xl">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{desc}</p>
              </div>
            </button>
          ))}
          </div>
        </div>
      </div>

      <BottomNav />
      <SuperUpgradeDialog open={showSuper} onClose={() => setShowSuper(false)} />
    </div>
  );
};

export default HomePage;
