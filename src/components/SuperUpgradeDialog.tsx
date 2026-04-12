import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Rocket, Moon, Diamond } from "lucide-react";
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
    preview: "bg-[#0a0e17]",
    accent: "text-cyan-400",
  },
  {
    id: "midnight" as const,
    icon: Moon,
    name: "Midnight Lounge",
    desc: "Elegante · Premium · Ámbar",
    preview: "bg-[#0f1628]",
    accent: "text-amber-400",
  },
  {
    id: "mercury" as const,
    icon: Diamond,
    name: "Mercury Glass",
    desc: "Minimalista · Alto contraste · B&W",
    preview: "bg-black",
    accent: "text-white",
  },
];

const SuperUpgradeDialog = ({ open, onClose }: SuperUpgradeDialogProps) => {
  const [selectedStyle, setSelectedStyle] = useState<StyleId>(null);

  const handleClose = () => {
    setSelectedStyle(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="fixed inset-0 max-w-none w-full h-full translate-x-0 translate-y-0 left-0 top-0 rounded-none border-none p-0 sm:rounded-none data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-top-0 data-[state=closed]:slide-out-to-top-0 overflow-auto [&>button.absolute]:hidden">
        {selectedStyle === null && (
          <div className="min-h-full w-full bg-[#09090b] flex flex-col items-center justify-center px-5 py-12 relative">
            <button
              onClick={handleClose}
              className="absolute left-4 top-4 z-10 rounded-full p-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              ✕
            </button>

            <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">
              Elige un estilo
            </h1>
            <p className="text-sm text-white/30 mb-10 text-center">Compara los 3 diseños del flujo Super</p>

            <div className="w-full max-w-sm space-y-4">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className="w-full group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left transition-all hover:border-white/20 hover:bg-white/[0.04] active:scale-[0.98]"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.preview} border border-white/10`}>
                    <s.icon className={`h-5 w-5 ${s.accent}`} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">{s.name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{s.desc}</p>
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
