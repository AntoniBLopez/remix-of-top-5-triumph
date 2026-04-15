import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

type ConsentStatus = "pending" | "accepted" | "rejected" | "custom";

interface CookieConsentContextType {
  preferences: CookiePreferences;
  consentStatus: ConsentStatus;
  showBanner: boolean;
  showPreferences: boolean;
  setShowPreferences: (v: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<CookiePreferences>) => void;
}

const defaultPrefs: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

function updateGoogleConsentMode(prefs: CookiePreferences) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
      functionality_storage: prefs.functional ? "granted" : "denied",
      security_storage: "granted",
    });
  }
}

const STORAGE_KEY = "cookie_consent_v2";

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPrefs);
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPrefs, ...parsed.preferences });
        setConsentStatus(parsed.status || "custom");
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const persist = useCallback((prefs: CookiePreferences, status: ConsentStatus) => {
    setPreferences(prefs);
    setConsentStatus(status);
    setShowBanner(false);
    setShowPreferences(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ preferences: prefs, status, timestamp: new Date().toISOString() }));
    updateGoogleConsentMode(prefs);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true, functional: true }, "accepted");
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ ...defaultPrefs }, "rejected");
  }, [persist]);

  const savePreferences = useCallback((prefs: Partial<CookiePreferences>) => {
    const merged = { ...defaultPrefs, ...prefs, necessary: true };
    persist(merged, "custom");
  }, [persist]);

  return (
    <CookieConsentContext.Provider value={{ preferences, consentStatus, showBanner, showPreferences, setShowPreferences, acceptAll, rejectAll, savePreferences }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
