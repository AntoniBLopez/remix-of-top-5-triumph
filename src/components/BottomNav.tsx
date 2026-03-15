import { useLocation, useNavigate } from "react-router-dom";
import { Gamepad2, UserCircle, Settings, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "play", label: "Jugar", icon: Gamepad2, path: "/home" },
  { id: "conjugations", label: "Verbos", icon: BookOpen, path: "/conjugations" },
  { id: "profile", label: "Perfil", icon: UserCircle, path: "/profile" },
  { id: "settings", label: "Ajustes", icon: Settings, path: "/settings" },
] as const;

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl pb-safe">
      <div className="mx-auto flex max-w-2xl items-center justify-around">
        {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => {
          const active = isActive(path);
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn("h-5 w-5 transition-transform", active && "scale-110")} />
              <span className={cn("text-[11px] transition-all", active ? "font-bold" : "font-medium")}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
