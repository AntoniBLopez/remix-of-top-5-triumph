import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useCookieConsent } from "./CookieConsentContext";

export default function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectAll, setShowPreferences } = useCookieConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showBanner) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [showBanner]);

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einwilligung"
      aria-modal="false"
      className={`fixed bottom-0 inset-x-0 z-50 flex justify-center p-3 sm:p-4 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="w-full max-w-3xl rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl shadow-foreground/5 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mt-0.5">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold tracking-tight text-foreground">
              Deine Privatsphäre, deine Wahl
            </h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Wir verwenden Cookies, um dein Erlebnis zu verbessern. Du entscheidest, welche du akzeptierst.{" "}
              <button
                onClick={() => setShowPreferences(true)}
                className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
              >
                Mehr erfahren
              </button>
            </p>
          </div>
        </div>

        {/* Buttons — equal prominence */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            onClick={rejectAll}
            className="flex-1 h-11 text-sm font-semibold rounded-xl"
          >
            Alle ablehnen
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowPreferences(true)}
            className="flex-1 h-11 text-sm font-semibold rounded-xl"
          >
            Anpassen
          </Button>
          <Button
            onClick={acceptAll}
            className="flex-1 h-11 text-sm font-semibold rounded-xl"
          >
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
