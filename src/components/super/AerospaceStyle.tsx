import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Lock, Bell, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { FEATURES, ALL_PLANS, PLAN_DETAILS, TRIAL_DAYS, type Step, type PlanId } from "./SuperSharedData";
import { useTheme } from "@/components/ThemeProvider";

interface Props { onClose: () => void }

const TIMELINE = [
  { icon: Lock, title: "Hoy", desc: "Acceso completo desbloqueado" },
  { icon: Bell, title: "Día 5", desc: "Recordatorio antes de que expire" },
  { icon: CheckCircle2, title: "Día 7", desc: "Suscripción activa · Cancela cuando quieras" },
];

export default function AerospaceStyle({ onClose }: Props) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [step, setStep] = useState<Step>("compare");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [showAll, setShowAll] = useState(false);
  const plans = showAll ? ALL_PLANS : ALL_PLANS.slice(0, 2);
  const trial = TRIAL_DAYS[selectedPlan];

  return (
    <div className={`min-h-full w-full flex flex-col relative overflow-hidden ${dark ? "bg-[#0a0e17] text-white" : "bg-[#f0f6fa] text-gray-900"}`}>
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0" style={{
        opacity: dark ? 0.04 : 0.06,
        backgroundImage: `linear-gradient(hsl(180 60% ${dark ? "50%" : "40%"} / ${dark ? "0.3" : "0.2"}) 1px, transparent 1px), linear-gradient(90deg, hsl(180 60% ${dark ? "50%" : "40%"} / ${dark ? "0.3" : "0.2"}) 1px, transparent 1px)`,
        backgroundSize: "40px 40px"
      }} />
      
      {/* Glow */}
      <div className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] ${dark ? "bg-[radial-gradient(ellipse,hsl(180_70%_50%/0.12),transparent_70%)]" : "bg-[radial-gradient(ellipse,hsl(180_70%_50%/0.08),transparent_70%)]"}`} />

      {/* Header bar */}
      <div className={`relative z-10 flex items-center justify-between px-5 py-4 border-b ${dark ? "border-white/5" : "border-black/5"}`}>
        <button onClick={onClose} className={`p-1.5 rounded-lg transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
          <X className={`h-4 w-4 ${dark ? "text-white/50" : "text-gray-400"}`} />
        </button>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500">
          <Zap className="h-3 w-3" />
          SUPER
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-md flex flex-col items-center"
          >
            {step === "compare" && (
              <>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/80 mb-2">Sistema de acceso</h2>
                <h1 className="text-2xl font-bold text-center mb-8 tracking-tight">
                  Desbloquea el potencial<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-400">completo</span>
                </h1>

                <div className={`w-full rounded-xl overflow-hidden mb-8 backdrop-blur-sm border ${dark ? "border-white/10 bg-white/[0.02]" : "border-black/[0.06] bg-white/80"}`}>
                  <div className={`grid grid-cols-[1fr_56px_56px] items-center px-4 py-3 border-b ${dark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-black/[0.02]"}`}>
                    <span className={`font-mono text-[9px] uppercase tracking-widest ${dark ? "text-white/30" : "text-gray-400"}`}>Módulo</span>
                    <span className={`font-mono text-[9px] uppercase tracking-widest text-center ${dark ? "text-white/30" : "text-gray-400"}`}>Free</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-500 text-center">Super</span>
                  </div>
                  {FEATURES.map((f, i) => (
                    <div key={f.name} className={`grid grid-cols-[1fr_56px_56px] items-center px-4 py-3 ${i < FEATURES.length - 1 ? `border-b ${dark ? "border-white/5" : "border-black/5"}` : ""}`}>
                      <span className={`text-sm ${dark ? "text-white/70" : "text-gray-600"}`}>{f.name}</span>
                      <div className="flex justify-center">
                        {f.free ? <Check className={`h-3.5 w-3.5 ${dark ? "text-white/25" : "text-gray-300"}`} /> : <span className={`text-xs ${dark ? "text-white/10" : "text-gray-200"}`}>—</span>}
                      </div>
                      <div className="flex justify-center">
                        <Check className="h-3.5 w-3.5 text-cyan-500" />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("reminder")} className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 py-3.5 font-bold text-sm text-white transition-all hover:shadow-[0_0_30px_hsl(180_70%_50%/0.3)] active:scale-[0.98]">
                  Iniciar prueba gratuita
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </>
            )}

            {step === "reminder" && (
              <>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/80 mb-2">Cronograma</h2>
                <h1 className="text-2xl font-bold text-center mb-8 tracking-tight">
                  Te avisamos <span className="text-cyan-500">antes</span><br />de cualquier cargo
                </h1>

                <div className={`w-full rounded-xl p-5 mb-8 backdrop-blur-sm border ${dark ? "border-white/10 bg-white/[0.02]" : "border-black/[0.06] bg-white/80"}`}>
                  {TIMELINE.map((t, i) => (
                    <div key={t.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${dark ? "border-cyan-400/20 bg-cyan-400/5" : "border-cyan-500/20 bg-cyan-50"}`}>
                          <t.icon className="h-4 w-4 text-cyan-500" />
                        </div>
                        {i < TIMELINE.length - 1 && <div className="w-px flex-1 min-h-[28px] bg-gradient-to-b from-cyan-400/20 to-transparent my-1" />}
                      </div>
                      <div className="pt-1 pb-3">
                        <p className="text-sm font-bold font-mono tracking-wide">{t.title}</p>
                        <p className={`text-xs ${dark ? "text-white/50" : "text-gray-500"}`}>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("plans")} className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 py-3.5 font-bold text-sm text-white transition-all hover:shadow-[0_0_30px_hsl(180_70%_50%/0.3)] active:scale-[0.98]">
                  Continuar
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </>
            )}

            {step === "plans" && (
              <>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/80 mb-2">Seleccionar plan</h2>
                <h1 className="text-2xl font-bold text-center mb-8 tracking-tight">
                  Elige tu plan<br />
                  <span className={`text-lg font-normal ${dark ? "text-white/40" : "text-gray-400"}`}>tras {trial} días de prueba</span>
                </h1>

                <div className="w-full space-y-3 mb-5">
                  <AnimatePresence mode="popLayout">
                  {plans.map((p, i) => {
                    const sel = selectedPlan === p.id;
                    return (
                      <motion.button
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: sel ? 1.03 : 1, transition: { delay: i * 0.03, duration: 0.15 } }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedPlan(p.id)}
                        className={`relative w-full rounded-xl border text-left transition-colors duration-300 ${sel
                          ? dark
                            ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_25px_hsl(180_70%_50%/0.15)] p-5"
                            : "border-cyan-500 bg-cyan-50 shadow-[0_0_25px_hsl(180_70%_50%/0.12)] p-5"
                          : dark
                            ? "border-white/10 bg-white/[0.02] hover:border-white/20 p-4"
                            : "border-black/[0.08] bg-white/80 hover:border-black/15 p-4"
                        }`}
                      >
                        {p.badge && (
                          <span className="absolute -top-2.5 left-3 rounded-md px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest bg-cyan-500 text-white">
                            {p.badge}
                          </span>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-bold transition-all duration-300 ${sel ? "text-base" : `text-sm ${dark ? "text-white/70" : "text-gray-500"}`}`}>{p.name}</p>
                            {p.duration && <p className={`text-xs ${dark ? "text-white/30" : "text-gray-400"}`}>{p.duration}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <p className={`font-mono transition-all duration-300 ${sel ? "text-cyan-500 text-base font-bold" : `text-sm ${dark ? "text-white/40" : "text-gray-400"}`}`}>{p.price}</p>
                            <motion.div
                              initial={false}
                              animate={{ scale: sel ? 1 : 0, opacity: sel ? 1 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="h-5 w-5 rounded-full bg-cyan-500 flex items-center justify-center"
                            >
                              <Check className="h-3 w-3 text-white" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                  </AnimatePresence>
                </div>

                <motion.p key={selectedPlan} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`text-[10px] font-mono text-center mb-5 max-w-xs ${dark ? "text-white/40" : "text-gray-400"}`}>{PLAN_DETAILS[selectedPlan]}</motion.p>

                <button onClick={onClose} className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 py-3.5 font-bold text-sm text-white transition-all hover:shadow-[0_0_30px_hsl(180_70%_50%/0.3)] active:scale-[0.98]">
                  Comenzar prueba de {trial} días
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {!showAll && (
                  <button onClick={() => setShowAll(true)} className={`mt-3 font-mono text-[10px] uppercase tracking-widest transition-colors ${dark ? "text-white/30 hover:text-white/60" : "text-gray-400 hover:text-gray-600"}`}>
                    Ver todos los planes
                  </button>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step indicators */}
      <div className="relative z-10 flex items-center justify-center gap-2 pb-6">
        {(["compare", "reminder", "plans"] as Step[]).map((s) => (
          <div key={s} className={`h-1 rounded-full transition-all ${step === s ? "w-6 bg-cyan-500" : `w-2 ${dark ? "bg-white/10" : "bg-black/10"}`}`} />
        ))}
      </div>
    </div>
  );
}
