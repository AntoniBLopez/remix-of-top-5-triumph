import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Lock, Bell, CheckCircle2, ArrowRight, Diamond } from "lucide-react";
import { FEATURES, ALL_PLANS, PLAN_DETAILS, TRIAL_DAYS, type Step, type PlanId } from "./SuperSharedData";
import { useTheme } from "@/components/ThemeProvider";

interface Props { onClose: () => void }

const TIMELINE = [
  { icon: Lock, title: "Hoy", desc: "Acceso total e inmediato" },
  { icon: Bell, title: "Día 5", desc: "Recordatorio de tu prueba" },
  { icon: CheckCircle2, title: "Día 7", desc: "Comienza la suscripción · Cancela fácilmente" },
];

export default function MercuryGlassStyle({ onClose }: Props) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [step, setStep] = useState<Step>("compare");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [showAll, setShowAll] = useState(false);
  const plans = showAll ? ALL_PLANS : ALL_PLANS.slice(0, 2);
  const trial = TRIAL_DAYS[selectedPlan];

  return (
    <div className={`min-h-full w-full flex flex-col relative overflow-hidden ${dark ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      {/* Kinetic lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent ${dark ? "via-white/[0.06]" : "via-black/[0.04]"} to-transparent`} />
        <div className={`absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent ${dark ? "via-white/[0.04]" : "via-black/[0.03]"} to-transparent`} />
        <div className={`absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent ${dark ? "via-white/[0.03]" : "via-black/[0.02]"} to-transparent`} />
      </div>
      
      {/* Mercury glow */}
      <div className={`pointer-events-none absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] ${dark ? "bg-[radial-gradient(ellipse,hsl(0_0%_100%/0.04),transparent_60%)]" : "bg-[radial-gradient(ellipse,hsl(0_0%_0%/0.02),transparent_60%)]"}`} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <button onClick={onClose} className={`p-2 md:p-3 rounded-full transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
          <X className={`h-4 w-4 md:h-5 md:w-5 ${dark ? "text-white/30" : "text-gray-400"}`} />
        </button>
        <div className="flex items-center gap-1.5 md:gap-2">
          <Diamond className={`h-3 w-3 md:h-4 md:w-4 ${dark ? "text-white/60" : "text-gray-500"}`} />
          <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] ${dark ? "text-white/50" : "text-gray-500"}`}>Super</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full max-w-md flex flex-col items-center"
          >
            {step === "compare" && (
              <>
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter leading-[0.95]">
                  UNLOCK<br />
                  <span className={`text-transparent bg-clip-text ${dark ? "bg-gradient-to-b from-white to-white/40" : "bg-gradient-to-b from-gray-900 to-gray-400"}`}>EVERYTHING</span>
                </h1>
                <p className={`text-xs uppercase tracking-[0.2em] mb-10 ${dark ? "text-white/30" : "text-gray-400"}`}>Free vs Super</p>

                <div className="w-full mb-8 space-y-0">
                  {FEATURES.map((f, i) => (
                    <motion.div
                      key={f.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.25, ease: "easeOut" }}
                      className={`flex items-center justify-between py-3 border-b last:border-0 ${dark ? "border-white/[0.04]" : "border-black/[0.06]"}`}
                    >
                      <span className={`text-sm ${dark ? "text-white/50" : "text-gray-500"}`}>{f.name}</span>
                      <div className="flex items-center gap-6">
                        <span className={`text-xs font-medium ${f.free ? (dark ? "text-white/30" : "text-gray-300") : (dark ? "text-white/10" : "text-gray-200")}`}>
                          {f.free ? "✓" : "—"}
                        </span>
                        <span className={`text-xs font-bold ${dark ? "text-white" : "text-gray-900"}`}>✓</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button onClick={() => setStep("reminder")} className={`w-full group flex items-center justify-between rounded-none border py-4 px-6 font-black text-sm uppercase tracking-wider transition-all active:scale-[0.98] ${dark ? "border-white/20 bg-white text-black hover:bg-white/90" : "border-black bg-gray-900 text-white hover:bg-gray-800"}`}>
                  <span>Empezar gratis</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            )}

            {step === "reminder" && (
              <>
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter leading-[0.95]">
                  ZERO<br />
                  <span className={`text-transparent bg-clip-text ${dark ? "bg-gradient-to-b from-white to-white/40" : "bg-gradient-to-b from-gray-900 to-gray-400"}`}>RISK</span>
                </h1>
                <p className={`text-xs uppercase tracking-[0.2em] mb-10 ${dark ? "text-white/30" : "text-gray-400"}`}>Te avisamos antes de cobrar</p>

                <div className="w-full mb-8 space-y-6">
                  {TIMELINE.map((t, i) => (
                    <div key={t.title} className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`flex h-10 w-10 items-center justify-center border ${dark ? "border-white/10" : "border-black/10"}`}>
                          <t.icon className={`h-4 w-4 ${dark ? "text-white/60" : "text-gray-500"}`} />
                        </div>
                        {i < TIMELINE.length - 1 && <div className={`absolute left-1/2 top-10 w-px h-6 -translate-x-1/2 ${dark ? "bg-white/[0.06]" : "bg-black/[0.08]"}`} />}
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-black uppercase tracking-wider">{t.title}</p>
                        <p className={`text-xs mt-0.5 ${dark ? "text-white/30" : "text-gray-400"}`}>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("plans")} className={`w-full group flex items-center justify-between rounded-none border py-4 px-6 font-black text-sm uppercase tracking-wider transition-all active:scale-[0.98] ${dark ? "border-white/20 bg-white text-black hover:bg-white/90" : "border-black bg-gray-900 text-white hover:bg-gray-800"}`}>
                  <span>Continuar</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            )}

            {step === "plans" && (
              <>
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter leading-[0.95]">
                  YOUR<br />
                  <span className={`text-transparent bg-clip-text ${dark ? "bg-gradient-to-b from-white to-white/40" : "bg-gradient-to-b from-gray-900 to-gray-400"}`}>PLAN</span>
                </h1>
                <p className={`text-xs uppercase tracking-[0.2em] mb-8 ${dark ? "text-white/40" : "text-gray-400"}`}>Después de {trial} días gratis</p>

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
                        className={`relative w-full border text-left transition-colors duration-300 ${sel
                          ? dark
                            ? "border-white bg-white/[0.05] p-5"
                            : "border-gray-900 bg-gray-50 p-5"
                          : dark
                            ? "border-white/[0.06] hover:border-white/15 p-4"
                            : "border-black/[0.08] hover:border-black/15 p-4"
                        }`}
                      >
                        {p.badge && (
                          <span className={`absolute -top-2.5 left-3 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${dark ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
                            {p.badge}
                          </span>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-bold transition-all duration-300 ${sel ? "text-base" : `text-sm ${dark ? "text-white/40" : "text-gray-400"}`}`}>{p.name}</p>
                            {p.duration && <p className={`text-xs mt-0.5 ${dark ? "text-white/50" : "text-gray-400"}`}>{p.duration}</p>}
                          </div>
                          <div className="flex items-center gap-3">
                            <p className={`font-bold transition-all duration-300 ${sel ? "text-base" : `text-sm ${dark ? "text-white/20" : "text-gray-300"}`}`}>{p.price}</p>
                            <motion.div
                              initial={false}
                              animate={{ scale: sel ? 1 : 0.5, opacity: sel ? 1 : 0.3 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className={`h-4 w-4 border transition-colors ${sel
                                ? dark ? "border-white bg-white" : "border-gray-900 bg-gray-900"
                                : dark ? "border-white/15" : "border-black/15"
                              }`}
                            >
                              {sel && <Check className={`h-3 w-3 ${dark ? "text-black" : "text-white"}`} />}
                            </motion.div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                  </AnimatePresence>
                </div>

                <motion.p key={selectedPlan} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`text-[10px] text-center mb-6 max-w-xs uppercase tracking-wider ${dark ? "text-white/50" : "text-gray-400"}`}>{PLAN_DETAILS[selectedPlan]}</motion.p>

                <button onClick={onClose} className={`w-full group flex items-center justify-between rounded-none border py-4 px-6 font-black text-sm uppercase tracking-wider transition-all active:scale-[0.98] ${dark ? "border-white/20 bg-white text-black hover:bg-white/90" : "border-black bg-gray-900 text-white hover:bg-gray-800"}`}>
                  <span>Comenzar · {trial} días gratis</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                {!showAll && (
                  <button onClick={() => setShowAll(true)} className={`mt-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${dark ? "text-white/40 hover:text-white/60" : "text-gray-400 hover:text-gray-600"}`}>
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
          <div key={s} className={`h-px transition-all ${step === s
            ? dark ? "w-8 bg-white" : "w-8 bg-gray-900"
            : dark ? "w-4 bg-white/10" : "w-4 bg-black/10"
          }`} />
        ))}
      </div>
    </div>
  );
}
