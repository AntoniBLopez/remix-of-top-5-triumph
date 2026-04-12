import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Lock, Bell, CheckCircle2, Sparkles } from "lucide-react";
import { FEATURES, ALL_PLANS, PLAN_DETAILS, TRIAL_DAYS, type Step, type PlanId } from "./SuperSharedData";
import { useTheme } from "@/components/ThemeProvider";

interface Props { onClose: () => void }

const TIMELINE = [
  { icon: Lock, title: "Hoy", desc: "Desbloquea todo el contenido premium" },
  { icon: Bell, title: "Día 5", desc: "Te enviaremos un recordatorio amigable" },
  { icon: CheckCircle2, title: "Día 7", desc: "Se activa tu plan · Cancela cuando quieras" },
];

export default function MidnightLoungeStyle({ onClose }: Props) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [step, setStep] = useState<Step>("compare");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [showAll, setShowAll] = useState(false);
  const plans = showAll ? ALL_PLANS : ALL_PLANS.slice(0, 2);
  const trial = TRIAL_DAYS[selectedPlan];

  // Amber accents in both modes
  const accent = "text-orange-400";
  const accentSolid = "text-orange-400";
  const accentBg = "bg-orange-400";
  const accentBgLight = "bg-orange-400/15";
  const accentBorder = "border-orange-400";
  const accentText = "text-orange-300";
  const accentSubtle = "text-orange-300";

  return (
    <div
      className={`min-h-full w-full flex flex-col relative overflow-hidden text-white`}
      style={{ background: dark
        ? "linear-gradient(160deg, #0f1628 0%, #141e3a 30%, #0d2a3a 60%, #0a2420 100%)"
        : "linear-gradient(160deg, #1a8a7a 0%, #1b9e8a 25%, #2098a0 50%, #2584b0 75%, #2a6fa0 100%)"
      }}
    >
      {/* Ambient blurs */}
      <div className={`pointer-events-none absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full ${dark ? "bg-[radial-gradient(circle,hsl(200_80%_40%/0.08),transparent_60%)]" : "bg-[radial-gradient(circle,hsl(180_60%_70%/0.2),transparent_60%)]"}`} />
      <div className={`pointer-events-none absolute bottom-[-100px] left-[-50px] w-[300px] h-[300px] rounded-full ${dark ? "bg-[radial-gradient(circle,hsl(160_70%_40%/0.06),transparent_60%)]" : "bg-[radial-gradient(circle,hsl(200_60%_60%/0.15),transparent_60%)]"}`} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <button onClick={onClose} className="p-2 rounded-full transition-colors hover:bg-white/5">
          <X className="h-4 w-4 text-white/40" />
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-400/20 to-orange-500/10 border border-orange-400/20 px-3 py-1">
          <Crown className={`h-3 w-3 ${accentSolid}`} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${accentText}`}>Super</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md flex flex-col items-center"
          >
            {step === "compare" && (
              <>
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span className="text-xs font-medium text-orange-300">Experiencia premium</span>
                </div>
                <h1 className="text-3xl font-extrabold text-center mb-2 leading-tight">
                  Aprende sin límites
                </h1>
                <p className="text-sm mb-8 text-center text-white/60">Compara lo que obtienes con Super</p>

                <div className="w-full rounded-2xl overflow-hidden mb-8 backdrop-blur-md border bg-white/[0.04] border-white/[0.06]">
                  <div className="grid grid-cols-[1fr_60px_60px] items-center px-5 py-3.5 bg-white/[0.03]">
                    <span />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-center text-white/50">Free</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider text-center ${accent}`}>Super</span>
                  </div>
                  {FEATURES.map((f, i) => (
                    <div key={f.name} className={`grid grid-cols-[1fr_60px_60px] items-center px-5 py-3 ${i < FEATURES.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
                      <span className="text-sm text-white/80">{f.name}</span>
                      <div className="flex justify-center">
                        {f.free ? <div className="h-5 w-5 rounded-full flex items-center justify-center bg-white/10"><Check className="h-3 w-3 text-white/40" /></div> : <span className="text-white/20">—</span>}
                      </div>
                      <div className="flex justify-center">
                        <div className="h-5 w-5 rounded-full flex items-center justify-center bg-orange-400/25">
                          <Check className="h-3 w-3 text-orange-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("reminder")} className={`w-full rounded-2xl py-4 font-extrabold text-sm ${dark ? "text-black bg-gradient-to-r from-amber-400 to-amber-500" : "text-white bg-gradient-to-r from-orange-500 to-amber-500"} transition-all active:scale-[0.98] shadow-[0_4px_24px_hsl(40_90%_50%/0.25)] hover:shadow-[0_4px_32px_hsl(40_90%_50%/0.4)]`}>
                  Comenzar 7 días gratis
                </button>
              </>
            )}

            {step === "reminder" && (
              <>
                <div className="mb-1 flex items-center gap-2">
                  <Bell className={`h-4 w-4 ${accentSolid}`} />
                  <span className={`text-xs font-medium ${accentSubtle}`}>Sin sorpresas</span>
                </div>
                <h1 className="text-3xl font-extrabold text-center mb-2 leading-tight">
                  Te avisaremos a tiempo
                </h1>
                <p className="text-sm mb-8 text-center text-white/60">Cancela antes del día 7 sin costo alguno</p>

                <div className="w-full rounded-2xl p-6 mb-8 backdrop-blur-md border bg-white/[0.04] border-white/[0.06]">
                  {TIMELINE.map((t, i) => (
                    <div key={t.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/[0.08]">
                          <t.icon className={`h-4 w-4 ${accentSolid}`} />
                        </div>
                        {i < TIMELINE.length - 1 && <div className={`w-px flex-1 min-h-[28px] bg-gradient-to-b my-1.5 from-orange-400/15 to-transparent`} />}
                      </div>
                      <div className="pt-1.5 pb-3">
                        <p className="text-sm font-bold">{t.title}</p>
                        <p className="text-xs mt-0.5 text-white/60">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("plans")} className={`w-full rounded-2xl py-4 font-extrabold text-sm ${dark ? "text-black bg-gradient-to-r from-amber-400 to-amber-500" : "text-white bg-gradient-to-r from-orange-500 to-amber-500"} transition-all active:scale-[0.98] shadow-[0_4px_24px_hsl(40_90%_50%/0.25)] hover:shadow-[0_4px_32px_hsl(40_90%_50%/0.4)]`}>
                  Continuar
                </button>
              </>
            )}

            {step === "plans" && (
              <>
                <h1 className="text-3xl font-extrabold text-center mb-1 leading-tight">
                  Elige tu plan
                </h1>
                <p className="text-sm mb-8 text-center text-white/40">Después de tu prueba de {trial} días</p>

                <div className="w-full space-y-3 mb-5">
                  <AnimatePresence mode="popLayout">
                  {plans.map((p, i) => {
                    const sel = selectedPlan === p.id;
                    return (
                      <motion.button
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: sel ? 1.03 : 1, transition: { delay: i * 0.06, duration: 0.3 } }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedPlan(p.id)}
                        className={`relative w-full rounded-2xl border-2 text-left transition-colors duration-300 ${sel
                          ? "border-orange-400/60 bg-orange-400/[0.06] shadow-[0_0_25px_hsl(25_90%_50%/0.12)] p-5"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 p-4"
                        }`}
                      >
                        {p.badge && (
                          <span className="absolute -top-2.5 left-4 rounded-full bg-amber-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            {p.badge}
                          </span>
                        )}
                        <motion.div
                          initial={false}
                          animate={{ scale: sel ? 1 : 0, opacity: sel ? 1 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center shadow-md bg-amber-500"
                        >
                          <Check className="h-3.5 w-3.5 text-white" />
                        </motion.div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-bold transition-all duration-300 ${sel ? "text-base" : "text-sm text-white/60"}`}>{p.name}</p>
                             {p.duration && <p className="text-xs mt-0.5 text-white/50">{p.duration}</p>}
                          </div>
                          <p className={`font-bold transition-all duration-300 ${sel ? `text-base ${accentText}` : "text-sm text-white/50"}`}>{p.price}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                  </AnimatePresence>
                </div>

                <motion.p key={selectedPlan} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-center mb-6 max-w-xs text-white/60">{PLAN_DETAILS[selectedPlan]}</motion.p>

                <button onClick={onClose} className={`w-full rounded-2xl py-4 font-extrabold text-sm ${dark ? "text-black bg-gradient-to-r from-amber-400 to-amber-500" : "text-white bg-gradient-to-r from-orange-500 to-amber-500"} transition-all active:scale-[0.98] shadow-[0_4px_24px_hsl(40_90%_50%/0.25)] hover:shadow-[0_4px_32px_hsl(40_90%_50%/0.4)]`}>
                  Comenzar prueba de {trial} días
                </button>

                {!showAll && (
                  <button onClick={() => setShowAll(true)} className="mt-3 text-xs font-medium transition-colors text-white/40 hover:text-white/70">
                    Ver todos los planes
                  </button>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="relative z-10 flex items-center justify-center gap-2 pb-6">
        {(["compare", "reminder", "plans"] as Step[]).map((s) => (
          <div key={s} className={`rounded-full transition-all ${step === s ? "w-6 h-1.5 bg-amber-500" : "w-1.5 h-1.5 bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}
