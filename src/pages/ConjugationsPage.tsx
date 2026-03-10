import { useState, useMemo } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONJUGATION_BY_TENSE } from "@/data/mockConjugations";
import { WordsArray } from "@/types/game";
import BottomNav from "@/components/BottomNav";

interface VerbData {
  verb: string;
  tenses: Record<string, { pronoun: string; form: string }[]>;
}

function parseConjugations(): VerbData[] {
  const verbMap = new Map<string, Record<string, { pronoun: string; form: string }[]>>();
  const tenseKeys = ["prasens", "prateritum", "perfekt"] as const;
  const tenseLabels: Record<string, string> = {
    prasens: "Präsens",
    prateritum: "Präteritum",
    perfekt: "Perfekt",
  };

  for (const tenseKey of tenseKeys) {
    const words: WordsArray[] = CONJUGATION_BY_TENSE[tenseKey] || [];
    for (const [prompt, form] of words) {
      // Format: "verb — pronoun (tense)"
      const match = prompt.match(/^(.+?)\s*—\s*(.+?)\s*\(/);
      if (!match) continue;
      const verb = match[1].trim();
      const pronoun = match[2].trim();
      const label = tenseLabels[tenseKey];

      if (!verbMap.has(verb)) verbMap.set(verb, {});
      const tenses = verbMap.get(verb)!;
      if (!tenses[label]) tenses[label] = [];
      tenses[label].push({ pronoun, form });
    }
  }

  return Array.from(verbMap.entries()).map(([verb, tenses]) => ({ verb, tenses }));
}

const TENSE_COLORS: Record<string, string> = {
  "Präsens": "bg-primary/10 text-primary",
  "Präteritum": "bg-accent/15 text-accent-foreground",
  "Perfekt": "bg-destructive/10 text-destructive",
};

const ConjugationsPage = () => {
  const verbs = useMemo(parseConjugations, []);
  const [openVerb, setOpenVerb] = useState<string | null>(null);

  return (
    <div className="min-h-[100dvh] bg-background pb-20">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl items-center justify-center px-4 py-3">
          <h1 className="text-base font-bold text-foreground">Conjugaciones</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pt-6">
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Tabla de conjugaciones</p>
            <p className="text-xs text-muted-foreground">Toca un verbo para ver todos sus tiempos</p>
          </div>
        </div>

        <div className="space-y-2">
          {verbs.map(({ verb, tenses }) => {
            const isOpen = openVerb === verb;
            return (
              <div key={verb} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenVerb(isOpen ? null : verb)}
                  className="flex w-full items-center justify-between px-4 py-3.5 transition-colors hover:bg-muted/50"
                >
                  <span className="text-sm font-bold text-foreground">{verb}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-4 py-3 space-y-4">
                        {Object.entries(tenses).map(([tense, forms]) => (
                          <div key={tense}>
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${TENSE_COLORS[tense] || "bg-muted text-muted-foreground"}`}
                            >
                              {tense}
                            </span>
                            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                              {forms.map(({ pronoun, form }, i) => (
                                <div key={i} className="flex items-baseline gap-2">
                                  <span className="text-xs text-muted-foreground w-12 shrink-0">{pronoun}</span>
                                  <span className="text-sm font-semibold text-foreground">{form}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ConjugationsPage;
