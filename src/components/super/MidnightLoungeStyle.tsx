import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Lock, Bell, CheckCircle2, Sparkles } from "lucide-react";
import { FEATURES, ALL_PLANS, PLAN_DETAILS, TRIAL_DAYS, type Step, type PlanId } from "./SuperSharedData";

interface Props { onClose: () => void }

const TIMELINE = [
  { icon: Lock, title: "Hoy", desc: "Desbloquea todo el contenido premium" },
  { icon: Bell, title: "Día 5", desc: "Te enviaremos un recordatorio amigable" },
  { icon: CheckCircle2, title: "Día 7", desc: "Se activa tu plan · Cancela cuando quieras" },
];

export default function MidnightLoungeStyle({ onClose }: Props) {
  const [step, setStep] = useState<Step>("compare");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [showAll, setShowAll] = useState(false);
  const plans = showAll ? ALL_PLANS : ALL_PLANS.slice(0, 2);
  const trial = TRIAL_DAYS[selectedPlan];

  return (
    <div className="min-h-full w-full text-white flex flex-col relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0f1628 0%, #141e3a 30%, #0d2a3a 60%, #0a2420 100%)" }}>
      {/* Ambient blurs */}
      <div className="pointer-events-none absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(200_80%_40%/0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute bottom-[-100px] left-[-50px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,hsl(160_70%_40%/0.06),transparent_60%)]" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
          <X className="h-4 w-4 text-white/40" />
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/20 px-3 py-1">
          <Crown className="h-3 w-3 text-amber-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Super</span>
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
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-medium text-amber-300/70">Experiencia premium</span>
                </div>
                <h1 className="text-3xl font-extrabold text-center mb-2 leading-tight">
                  Aprende sin límites
                </h1>
                <p className="text-sm text-white/40 mb-8 text-center">Compara lo que obtienes con Super</p>

                <div className="w-full rounded-2xl overflow-hidden mb-8 bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
                  <div className="grid grid-cols-[1fr_60px_60px] items-center px-5 py-3.5 bg-white/[0.03]">
                    <span />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/25 text-center">Free</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/80 text-center">Super</span>
                  </div>
                  {FEATURES.map((f, i) => (
                    <div key={f.name} className={`grid grid-cols-[1fr_60px_60px] items-center px-5 py-3 ${i < FEATURES.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
                      <span className="text-sm text-white/60">{f.name}</span>
                      <div className="flex justify-center">
                        {f.free ? <div className="h-5 w-5 rounded-full bg-white/5 flex items-center justify-center"><Check className="h-3 w-3 text-white/20" /></div> : <span className="text-white/10">—</span>}
                      </div>
                      <div className="flex justify-center">
                        <div className="h-5 w-5 rounded-full bg-amber-400/15 flex items-center justify-center">
                          <Check className="h-3 w-3 text-amber-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("reminder")} className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-4 font-extrabold text-sm text-[#1a1a2e] shadow-[0_4px_24px_hsl(40_90%_50%/0.25)] transition-all hover:shadow-[0_4px_32px_hsl(40_90%_50%/0.4)] active:scale-[0.98]">
                  Comenzar 7 días gratis
                </button>
              </>
            )}

            {step === "reminder" && (
              <>
                <div className="mb-1 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-medium text-amber-300/70">Sin sorpresas</span>
                </div>
                <h1 className="text-3xl font-extrabold text-center mb-2 leading-tight">
                  Te avisaremos a tiempo
                </h1>
                <p className="text-sm text-white/40 mb-8 text-center">Cancela antes del día 7 sin costo alguno</p>

                <div className="w-full rounded-2xl p-6 mb-8 bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
                  {TIMELINE.map((t, i) => (
                    <div key={t.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08]">
                          <t.icon className="h-4 w-4 text-amber-400" />
                        </div>
                        {i < TIMELINE.length - 1 && <div className="w-px flex-1 min-h-[28px] bg-gradient-to-b from-amber-400/15 to-transparent my-1.5" />}
                      </div>
                      <div className="pt-1.5 pb-3">
                        <p className="text-sm font-bold">{t.title}</p>
                        <p className="text-xs text-white/40 mt-0.5">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("plans")} className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-4 font-extrabold text-sm text-[#1a1a2e] shadow-[0_4px_24px_hsl(40_90%_50%/0.25)] transition-all hover:shadow-[0_4px_32px_hsl(40_90%_50%/0.4)] active:scale-[0.98]">
                  Continuar
                </button>
              </>
            )}

            {step === "plans" && (
              <>
                <h1 className="text-3xl font-extrabold text-center mb-1 leading-tight">
                  Elige tu plan
                </h1>
                <p className="text-sm text-white/40 mb-8 text-center">Después de tu prueba de {trial} días</p>

                <div className="w-full space-y-3 mb-5">
                  {plans.map((p) => {
                    const sel = selectedPlan === p.id;
                    return (
                      <button key={p.id} onClick={() => setSelectedPlan(p.id)} className={`relative w-full rounded-2xl border-2 p-4 text-left transition-all ${sel ? "border-amber-400/60 bg-amber-400/[0.06] shadow-[0_0_20px_hsl(40_90%_50%/0.08)]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"}`}>
                        {p.badge && (
                          <span className={`absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${sel ? "bg-amber-400 text-[#1a1a2e]" : "bg-white/10 text-white/40"}`}>
                            {p.badge}
                          </span>
                        )}
                        {sel && <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-amber-400 flex items-center justify-center shadow-md"><Check className="h-3.5 w-3.5 text-[#1a1a2e]" /></div>}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-bold text-base ${sel ? "text-white" : "text-white/60"}`}>{p.name}</p>
                            {p.duration && <p className="text-xs text-white/25 mt-0.5">{p.duration}</p>}
                          </div>
                          <p className={`font-bold text-sm ${sel ? "text-amber-300" : "text-white/30"}`}>{p.price}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[10px] text-white/20 text-center mb-6 max-w-xs">{PLAN_DETAILS[selectedPlan]}</p>

                <button onClick={onClose} className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-4 font-extrabold text-sm text-[#1a1a2e] shadow-[0_4px_24px_hsl(40_90%_50%/0.25)] transition-all hover:shadow-[0_4px_32px_hsl(40_90%_50%/0.4)] active:scale-[0.98]">
                  Comenzar prueba de {trial} días
                </button>

                {!showAll && (
                  <button onClick={() => setShowAll(true)} className="mt-3 text-xs font-medium text-white/25 hover:text-white/50 transition-colors">
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
          <div key={s} className={`rounded-full transition-all ${step === s ? "w-6 h-1.5 bg-amber-400" : "w-1.5 h-1.5 bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}
