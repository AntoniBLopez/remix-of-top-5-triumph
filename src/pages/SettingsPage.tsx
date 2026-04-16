import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Trophy, MessageSquareHeart, ChevronRight, Send, Cookie, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { useCookieConsent } from "@/components/cookies/CookieConsentContext";
import { getDailyGoal, setDailyGoal } from "@/lib/smartReviewDaily";

const FEEDBACK_PROMPTS = [
  "¿Te está gustando la app? ¡Cuéntanos!",
  "¿Echas de menos algo en la app?",
  "¿Hay alguna mejora que te gustaría que tuviera la app?",
  "¿Qué es lo que más te gusta de la app?",
  "¿Qué cambiarías de la app si pudieras?",
  "¿Recomendarías la app a un amigo? ¿Por qué?",
  "¿Hay algo que te frustra al usar la app?",
  "¿Qué funcionalidad nueva te gustaría ver?",
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setShowPreferences } = useCookieConsent();
  const [xpEnabled, setXpEnabled] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [dailyGoal, setDailyGoalState] = useState<number>(() => getDailyGoal());

  const handleGoalChange = (val: number[]) => {
    const goal = val[0];
    setDailyGoalState(goal);
    setDailyGoal(goal);
  };

  const feedbackPrompt = useMemo(
    () => FEEDBACK_PROMPTS[Math.floor(Math.random() * FEEDBACK_PROMPTS.length)],
    []
  );

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    toast({ title: "¡Gracias por tu feedback!", description: "Tu opinión nos ayuda a mejorar 💚" });
    setFeedback("");
  };

  return (
    <div className="min-h-[100dvh] bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl items-center justify-center px-4 py-3">
          <h1 className="text-base font-bold text-foreground">Ajustes</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pt-6 space-y-6">
        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Suscripción</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              onClick={() =>
                toast({ title: "Próximamente", description: "La gestión de suscripción estará disponible pronto." })
              }
              className="flex w-full items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <CreditCard className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">Gestionar suscripción</p>
                <p className="text-xs text-muted-foreground">Plan gratuito</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* XP & Leagues */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Juego</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
                <Trophy className="h-4.5 w-4.5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">XP y Ligas</p>
                <p className="text-xs text-muted-foreground">Participa en el sistema de puntuación</p>
              </div>
              <Switch checked={xpEnabled} onCheckedChange={setXpEnabled} />
            </div>
          </div>
          {!xpEnabled && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 text-xs text-muted-foreground px-1"
            >
              No acumularás XP ni aparecerás en el ranking semanal.
            </motion.p>
          )}
        </motion.div>

        {/* Daily Goal — Smart Review */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.11 }}
        >
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Smart Review</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-4 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Meta diaria</p>
                  <p className="text-xs text-muted-foreground">Tarjetas a revisar cada día</p>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-extrabold text-primary tabular-nums">
                  {dailyGoal}
                </span>
              </div>
              <Slider
                value={[dailyGoal]}
                onValueChange={handleGoalChange}
                min={5}
                max={100}
                step={5}
                aria-label="Meta diaria de tarjetas"
              />
              <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                <span>5</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Privacidad</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setShowPreferences(true)}
              className="flex w-full items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Cookie className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">Gestionar cookies</p>
                <p className="text-xs text-muted-foreground">Configura tus preferencias de privacidad</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Feedback</h2>
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquareHeart className="h-4.5 w-4.5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground pt-1.5">{feedbackPrompt}</p>
            </div>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Escribe aquí tu opinión..."
              className="min-h-[100px] resize-none rounded-xl border-border bg-background text-sm"
            />
            <Button
              onClick={handleSendFeedback}
              disabled={!feedback.trim()}
              className="w-full gap-2 rounded-xl"
            >
              <Send className="h-4 w-4" />
              Enviar feedback
            </Button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
