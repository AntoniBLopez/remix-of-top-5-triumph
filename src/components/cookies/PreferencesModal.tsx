import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, BarChart3, Megaphone, Puzzle } from "lucide-react";
import { useCookieConsent, type CookiePreferences } from "./CookieConsentContext";

const categories = [
  {
    key: "necessary" as const,
    icon: Shield,
    title: "Notwendig",
    titleEs: "Necesarias",
    desc: "Diese Cookies sind für die Grundfunktionen der Website erforderlich.",
    descEs: "Esenciales para el funcionamiento básico del sitio.",
    locked: true,
  },
  {
    key: "functional" as const,
    icon: Puzzle,
    title: "Funktional",
    titleEs: "Funcionales",
    desc: "Ermöglichen erweiterte Funktionen wie Personalisierung und Einstellungen.",
    descEs: "Habilitan funciones avanzadas como personalización y preferencias.",
    locked: false,
  },
  {
    key: "analytics" as const,
    icon: BarChart3,
    title: "Analyse",
    titleEs: "Analíticas",
    desc: "Helfen uns zu verstehen, wie du die Website nutzt, um sie zu verbessern.",
    descEs: "Nos ayudan a entender cómo usas el sitio para mejorarlo.",
    locked: false,
  },
  {
    key: "marketing" as const,
    icon: Megaphone,
    title: "Marketing",
    titleEs: "Marketing",
    desc: "Werden verwendet, um dir relevante Werbung anzuzeigen.",
    descEs: "Se utilizan para mostrarte publicidad relevante.",
    locked: false,
  },
];

export default function PreferencesModal() {
  const { preferences, showPreferences, setShowPreferences, savePreferences, rejectAll, acceptAll } = useCookieConsent();
  const [local, setLocal] = useState<CookiePreferences>(preferences);

  useEffect(() => {
    if (showPreferences) setLocal(preferences);
  }, [showPreferences, preferences]);

  const toggle = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setLocal((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-background/98 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Cookie-Einstellungen</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Wähle aus, welche Cookies du akzeptieren möchtest. Notwendige Cookies können nicht deaktiviert werden.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 py-2">
          {categories.map((cat, i) => (
            <div key={cat.key}>
              {i > 0 && <Separator className="my-3" />}
              <div className="flex items-start gap-3 py-2">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <cat.icon className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor={`cookie-${cat.key}`} className="text-sm font-semibold cursor-pointer">
                      {cat.title}
                    </Label>
                    <Switch
                      id={`cookie-${cat.key}`}
                      checked={cat.locked ? true : local[cat.key]}
                      onCheckedChange={() => toggle(cat.key)}
                      disabled={cat.locked}
                      aria-label={cat.title}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 font-medium"
            onClick={() => {
              rejectAll();
            }}
          >
            Alle ablehnen
          </Button>
          <Button
            variant="outline"
            className="flex-1 font-medium"
            onClick={() => savePreferences(local)}
          >
            Auswahl speichern
          </Button>
          <Button
            className="flex-1 font-medium"
            onClick={() => {
              acceptAll();
            }}
          >
            Alle akzeptieren
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
