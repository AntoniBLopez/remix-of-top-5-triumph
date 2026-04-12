import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Lock, Bell, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { FEATURES, ALL_PLANS, PLAN_DETAILS, TRIAL_DAYS, type Step, type PlanId } from "./SuperSharedData";

interface Props { onClose: () => void }

const TIMELINE = [
  { icon: Lock, title: "Hoy", desc: "Acceso completo desbloqueado" },
  { icon: Bell, title: "Día 5", desc: "Recordatorio antes de que expire" },
  { icon: CheckCircle2, title: "Día 7", desc: "Suscripción activa · Cancela cuando quieras" },
];

export default function AerospaceStyle({ onClose }: Props) {
  const [step, setStep] = useState<Step>("compare");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [showAll, setShowAll] = useState(false);
  const plans = showAll ? ALL_PLANS : ALL_PLANS.slice(0, 2);
  const trial = TRIAL_DAYS[selectedPlan];

  return (
    <div className="min-h-full w-full bg-[#0a0e17] text-white flex flex-col relative overflow-hidden">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(hsl(180 60% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(180 60% 50% / 0.3) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      
      {/* Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,hsl(180_70%_50%/0.12),transparent_70%)]" />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/5">
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
          <X className="h-4 w-4 text-white/50" />
        </button>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
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
            transition={{ duration: 0.3 }}
            className="w-full max-w-md flex flex-col items-center"
          >
            {step === "compare" && (
              <>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/80 mb-2">Sistema de acceso</h2>
                <h1 className="text-2xl font-bold text-center mb-8 tracking-tight">
                  Desbloquea el potencial<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">completo</span>
                </h1>

                <div className="w-full border border-white/10 rounded-xl overflow-hidden mb-8 backdrop-blur-sm">
                  <div className="grid grid-cols-[1fr_56px_56px] items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">Módulo</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 text-center">Free</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 text-center">Super</span>
                  </div>
                  {FEATURES.map((f, i) => (
                    <div key={f.name} className={`grid grid-cols-[1fr_56px_56px] items-center px-4 py-3 ${i < FEATURES.length - 1 ? "border-b border-white/5" : ""}`}>
                      <span className="text-sm text-white/70">{f.name}</span>
                      <div className="flex justify-center">
                        {f.free ? <Check className="h-3.5 w-3.5 text-white/25" /> : <span className="text-white/10 text-xs">—</span>}
                      </div>
                      <div className="flex justify-center">
                        <Check className="h-3.5 w-3.5 text-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("reminder")} className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 py-3.5 font-bold text-sm text-[#0a0e17] transition-all hover:shadow-[0_0_30px_hsl(180_70%_50%/0.3)] active:scale-[0.98]">
                  Iniciar prueba gratuita
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </>
            )}

            {step === "reminder" && (
              <>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/80 mb-2">Cronograma</h2>
                <h1 className="text-2xl font-bold text-center mb-8 tracking-tight">
                  Te avisamos <span className="text-cyan-400">antes</span><br />de cualquier cargo
                </h1>

                <div className="w-full border border-white/10 rounded-xl p-5 mb-8 backdrop-blur-sm bg-white/[0.02]">
                  {TIMELINE.map((t, i) => (
                    <div key={t.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/5">
                          <t.icon className="h-4 w-4 text-cyan-400" />
                        </div>
                        {i < TIMELINE.length - 1 && <div className="w-px flex-1 min-h-[28px] bg-gradient-to-b from-cyan-400/20 to-transparent my-1" />}
                      </div>
                      <div className="pt-1 pb-3">
                        <p className="text-sm font-bold font-mono tracking-wide">{t.title}</p>
                        <p className="text-xs text-white/50">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("plans")} className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 py-3.5 font-bold text-sm text-[#0a0e17] transition-all hover:shadow-[0_0_30px_hsl(180_70%_50%/0.3)] active:scale-[0.98]">
                  Continuar
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </>
            )}

            {step === "plans" && (
              <>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/80 mb-2">Seleccionar plan</h2>
                <h1 className="text-2xl font-bold text-center mb-8 tracking-tight">
                  Elige tu plan<br />
                  <span className="text-white/40 text-lg font-normal">tras {trial} días de prueba</span>
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
                        animate={{ opacity: 1, y: 0, scale: sel ? 1.03 : 1, transition: { delay: i * 0.06, duration: 0.3 } }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedPlan(p.id)}
                        className={`relative w-full rounded-xl border text-left transition-colors duration-300 ${sel ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_25px_hsl(180_70%_50%/0.15)] p-5" : "border-white/10 bg-white/[0.02] hover:border-white/20 p-4"}`}
                      >
                        {p.badge && (
                          <span className="absolute -top-2.5 left-3 rounded-md px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest bg-cyan-400 text-[#0a0e17]">
                            {p.badge}
                          </span>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-bold transition-all duration-300 ${sel ? "text-white text-base" : "text-white/70 text-sm"}`}>{p.name}</p>
                            {p.duration && <p className="text-xs text-white/30">{p.duration}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <p className={`font-mono transition-all duration-300 ${sel ? "text-cyan-400 text-base font-bold" : "text-white/40 text-sm"}`}>{p.price}</p>
                            <motion.div
                              initial={false}
                              animate={{ scale: sel ? 1 : 0, opacity: sel ? 1 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="h-5 w-5 rounded-full bg-cyan-400 flex items-center justify-center"
                            >
                              <Check className="h-3 w-3 text-[#0a0e17]" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                  </AnimatePresence>
                </div>

                <motion.p key={selectedPlan} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-white/25 text-center mb-5 max-w-xs">{PLAN_DETAILS[selectedPlan]}</motion.p>

                <button onClick={onClose} className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 py-3.5 font-bold text-sm text-[#0a0e17] transition-all hover:shadow-[0_0_30px_hsl(180_70%_50%/0.3)] active:scale-[0.98]">
                  Comenzar prueba de {trial} días
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {!showAll && (
                  <button onClick={() => setShowAll(true)} className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors">
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
          <div key={s} className={`h-1 rounded-full transition-all ${step === s ? "w-6 bg-cyan-400" : "w-2 bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}
