/**
 * Smart Review daily funnel analytics.
 * Persists events to Supabase (smart_review_events) with a local sessionId.
 */
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "smart_review_session_id";

export type SmartReviewEvent =
  | "smart_review_daily_opened"
  | "smart_review_daily_started"
  | "smart_review_daily_completed"
  | "smart_review_daily_abandoned"
  | "smart_review_goal_reached";

function getSessionId(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export async function trackSmartReview(
  event: SmartReviewEvent,
  props: Record<string, unknown> = {}
): Promise<void> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const user_id = userData.user?.id ?? null;
    const session_id = getSessionId();

    // Fire-and-forget; don't block UX
    void supabase.from("smart_review_events").insert({
      user_id,
      session_id,
      event_name: event,
      props: props as never,
    });
  } catch (err) {
    // Silent fail — analytics must never crash UX
    console.warn("[smartReviewAnalytics] track failed", err);
  }
}
