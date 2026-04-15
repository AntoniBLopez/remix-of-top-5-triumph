import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "./CookieConsentContext";

export default function ManageCookiesButton() {
  const { showBanner, setShowPreferences } = useCookieConsent();

  if (showBanner) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowPreferences(true)}
      className="fixed bottom-4 left-4 z-50 rounded-full pl-3 pr-4 h-9 gap-1.5 bg-background/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs font-medium text-muted-foreground hover:text-foreground"
      aria-label="Cookie-Einstellungen verwalten"
    >
      <Cookie className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Cookies</span>
    </Button>
  );
}
