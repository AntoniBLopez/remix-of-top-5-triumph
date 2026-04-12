import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Lock, Bell, CheckCircle2, ArrowRight, Diamond } from "lucide-react";
import { FEATURES, ALL_PLANS, PLAN_DETAILS, TRIAL_DAYS, type Step, type PlanId } from "./SuperSharedData";

interface Props { onClose: () => void }

const TIMELINE = [
  { icon: Lock, title: "Hoy", desc: "Acceso total e inmediato" },
  { icon: Bell, title: "Día 5", desc: "Recordatorio de tu prueba" },
  { icon: CheckCircle2, title: "Día 7", desc: "Comienza la suscripción · Cancela fácilmente" },
];

export default function MercuryGlassStyle({ onClose }: Props) {
  const [step, setStep] = useState<Step>("compare");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [showAll, setShowAll] = useState(false);
  const plans = showAll ? ALL_PLANS : ALL_PLANS.slice(0, 2);
  const trial = TRIAL_DAYS[selectedPlan];

  return (
    <div className="min-h-full w-full text-white flex flex-col relative overflow-hidden bg-black">
      {/* Kinetic lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>
      
      {/* Mercury glow */}
      <div className="pointer-events-none absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse,hsl(0_0%_100%/0.04),transparent_60%)]" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <X className="h-4 w-4 text-white/30" />
        </button>
        <div className="flex items-center gap-1.5">
          <Diamond className="h-3 w-3 text-white/60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Super</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-md flex flex-col items-center"
          >
            {step === "compare" && (
              <>
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter leading-[0.95]">
                  UNLOCK<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">EVERYTHING</span>
                </h1>
                <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-10">Free vs Super</p>

                <div className="w-full mb-8 space-y-0">
                  {FEATURES.map((f) => (
                    <div key={f.name} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                      <span className="text-sm text-white/50">{f.name}</span>
                      <div className="flex items-center gap-6">
                        <span className={`text-xs font-medium ${f.free ? "text-white/30" : "text-white/10"}`}>
                          {f.free ? "✓" : "—"}
                        </span>
                        <span className="text-xs font-bold text-white">✓</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("reminder")} className="w-full group flex items-center justify-between rounded-none border border-white/20 bg-white text-black py-4 px-6 font-black text-sm uppercase tracking-wider transition-all hover:bg-white/90 active:scale-[0.98]">
                  <span>Empezar gratis</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            )}

            {step === "reminder" && (
              <>
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter leading-[0.95]">
                  ZERO<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">RISK</span>
                </h1>
                <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-10">Te avisamos antes de cobrar</p>

                <div className="w-full mb-8 space-y-6">
                  {TIMELINE.map((t, i) => (
                    <div key={t.title} className="flex items-start gap-4">
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center border border-white/10">
                          <t.icon className="h-4 w-4 text-white/60" />
                        </div>
                        {i < TIMELINE.length - 1 && <div className="absolute left-1/2 top-10 w-px h-6 -translate-x-1/2 bg-white/[0.06]" />}
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-black uppercase tracking-wider">{t.title}</p>
                        <p className="text-xs text-white/30 mt-0.5">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("plans")} className="w-full group flex items-center justify-between rounded-none border border-white/20 bg-white text-black py-4 px-6 font-black text-sm uppercase tracking-wider transition-all hover:bg-white/90 active:scale-[0.98]">
                  <span>Continuar</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            )}

            {step === "plans" && (
              <>
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter leading-[0.95]">
                  YOUR<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">PLAN</span>
                </h1>
                <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-8">Después de {trial} días gratis</p>

                <div className="w-full space-y-3 mb-5">
                  {plans.map((p) => {
                    const sel = selectedPlan === p.id;
                    return (
                      <button key={p.id} onClick={() => setSelectedPlan(p.id)} className={`relative w-full border p-4 text-left transition-all ${sel ? "border-white bg-white/[0.05]" : "border-white/[0.06] hover:border-white/15"}`}>
                        {p.badge && (
                          <span className={`absolute -top-2.5 left-3 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${sel ? "bg-white text-black" : "bg-white/10 text-white/30"}`}>
                            {p.badge}
                          </span>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-bold ${sel ? "text-white" : "text-white/40"}`}>{p.name}</p>
                            {p.duration && <p className="text-xs text-white/15 mt-0.5">{p.duration}</p>}
                          </div>
                          <div className="flex items-center gap-3">
                            <p className={`text-sm font-bold ${sel ? "text-white" : "text-white/20"}`}>{p.price}</p>
                            <div className={`h-4 w-4 border transition-all ${sel ? "border-white bg-white" : "border-white/15"}`}>
                              {sel && <Check className="h-3 w-3 text-black" />}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[9px] text-white/15 text-center mb-6 max-w-xs uppercase tracking-wider">{PLAN_DETAILS[selectedPlan]}</p>

                <button onClick={onClose} className="w-full group flex items-center justify-between rounded-none border border-white/20 bg-white text-black py-4 px-6 font-black text-sm uppercase tracking-wider transition-all hover:bg-white/90 active:scale-[0.98]">
                  <span>Comenzar · {trial} días gratis</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                {!showAll && (
                  <button onClick={() => setShowAll(true)} className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/15 hover:text-white/40 transition-colors">
                    Todos los planes
                  </button>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal step line */}
      <div className="relative z-10 flex items-center justify-center gap-3 pb-6">
        {(["compare", "reminder", "plans"] as Step[]).map((s) => (
          <div key={s} className={`h-px transition-all ${step === s ? "w-8 bg-white" : "w-4 bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}
