import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function useRequireAuth(explicitRedirectPath?: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isActive = true;
    const redirectPath = explicitRedirectPath ?? `${location.pathname}${location.search}`;

    const ensureSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!isActive) return;

      if (!currentSession) {
        setCheckingAuth(false);
        navigate(`/auth?redirect=${encodeURIComponent(redirectPath)}`, { replace: true });
        return;
      }

      setSession(currentSession);
      setCheckingAuth(false);
    };

    ensureSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isActive) return;

      setSession(nextSession);

      if (!nextSession) {
        navigate(`/auth?redirect=${encodeURIComponent(redirectPath)}`, { replace: true });
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [explicitRedirectPath, location.pathname, location.search, navigate]);

  return {
    checkingAuth,
    isAuthenticated: !!session,
    session,
  };
}