import { useLocation, useNavigate } from "react-router-dom";
import { Gamepad2, UserCircle, Settings, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "play", label: "Jugar", icon: Gamepad2, path: "/home" },
  { id: "conjugations", label: "Verbos", icon: BookOpen, path: "/conjugations" },
  { id: "profile", label: "Perfil", icon: UserCircle, path: "/profile" },
  { id: "settings", label: "Ajustes", icon: Settings, path: "/settings" },
] as const;

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-2xl items-center justify-around">
        {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors",
              isActive(path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[11px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
