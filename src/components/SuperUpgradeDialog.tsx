import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Rocket, Moon, Diamond } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import AerospaceStyle from "./super/AerospaceStyle";
import MidnightLoungeStyle from "./super/MidnightLoungeStyle";
import MercuryGlassStyle from "./super/MercuryGlassStyle";

interface SuperUpgradeDialogProps {
  open: boolean;
  onClose: () => void;
}

type StyleId = "aerospace" | "midnight" | "mercury" | null;

const STYLES = [
  {
    id: "aerospace" as const,
    icon: Rocket,
    name: "Aerospace",
    desc: "Futurista · Técnico · Cyan",
    previewDark: "bg-[#0a0e17]",
    previewLight: "bg-[#f0f6fa]",
    accent: "text-cyan-500",
  },
  {
    id: "midnight" as const,
    icon: Moon,
    name: "Midnight Lounge",
    desc: "Elegante · Premium · Ámbar",
    previewDark: "bg-[#0f1628]",
    previewLight: "bg-[#f8f6f0]",
    accent: "text-amber-500",
  },
  {
    id: "mercury" as const,
    icon: Diamond,
    name: "Mercury Glass",
    desc: "Minimalista · Alto contraste · B&W",
    previewDark: "bg-black",
    previewLight: "bg-white",
    accent: "text-gray-700 dark:text-white",
  },
];

const SuperUpgradeDialog = ({ open, onClose }: SuperUpgradeDialogProps) => {
  const [selectedStyle, setSelectedStyle] = useState<StyleId>(null);
  const { theme } = useTheme();
  const dark = theme === "dark";

  const handleClose = () => {
    setSelectedStyle(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="fixed inset-0 max-w-none w-full h-full translate-x-0 translate-y-0 left-0 top-0 rounded-none border-none p-0 sm:rounded-none data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-top-0 data-[state=closed]:slide-out-to-top-0 overflow-auto [&>button.absolute]:hidden">
        {selectedStyle === null && (
          <div className={`min-h-full w-full flex flex-col items-center justify-center px-5 py-12 relative ${dark ? "bg-[#09090b]" : "bg-gray-50"}`}>
            <button
              onClick={handleClose}
              className={`absolute left-4 top-4 z-10 rounded-full p-2 transition-colors text-sm ${dark ? "text-white/40 hover:text-white hover:bg-white/5" : "text-gray-400 hover:text-gray-700 hover:bg-black/5"}`}
            >
              ✕
            </button>

            <h1 className={`text-3xl font-black text-center mb-2 tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
              Elige un estilo
            </h1>
            <p className={`text-sm mb-10 text-center ${dark ? "text-white/30" : "text-gray-500"}`}>Compara los 3 diseños del flujo Super</p>

            <div className="w-full max-w-sm space-y-4">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`w-full group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all active:scale-[0.98] ${dark
                    ? "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    : "border-black/[0.06] bg-white hover:border-black/15 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${dark ? `${s.previewDark} border-white/10` : `${s.previewLight} border-black/10`}`}>
                    <s.icon className={`h-5 w-5 ${s.accent}`} />
                  </div>
                  <div>
                    <p className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>{s.name}</p>
                    <p className={`text-xs mt-0.5 ${dark ? "text-white/30" : "text-gray-500"}`}>{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedStyle === "aerospace" && <AerospaceStyle onClose={handleClose} />}
        {selectedStyle === "midnight" && <MidnightLoungeStyle onClose={handleClose} />}
        {selectedStyle === "mercury" && <MercuryGlassStyle onClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default SuperUpgradeDialog;
