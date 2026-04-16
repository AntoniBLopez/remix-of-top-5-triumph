---
name: smart-review-daily-hub
description: Daily Smart Review hub on /home, dedicated daily session via /conjugations/review?mode=daily, dailyGoal in /settings, funnel events in smart_review_events
type: feature
---
# Smart Review Daily

## Hub (HomePage)
- `SmartReviewHubCard` shown at top of `/home` above Práctica Libre
- Shows KPIs: Vencidas / Nuevas / Meta + progress bar
- CTA contextual: "Empezar repaso" (due>0), "Aprender nuevas" (only new), "Practicar libremente" (nothing pending)
- Streak chip, estimated minutes, "Ajustar meta" link to /settings
- Tracks `smart_review_daily_opened` on mount

## Daily session (`/conjugations/review?mode=daily`)
- Same SmartReviewPage but with `?mode=daily` query param
- Session size = `getDailySessionSize()` (due + cap on new)
- Calls `incrementCompletedToday()` after each `handleRate`
- Emits: `smart_review_daily_started`, `smart_review_daily_completed`, `smart_review_daily_abandoned`, `smart_review_goal_reached`
- End-screen: shows progress bar + "Continuar 5 más" / "Terminar por ahora" / "Practicar extra" depending on goal

## Free practice mode
- Default `/conjugations/review` (no mode param) keeps legacy 10-card session
- Goes back to `/conjugations` dashboard

## Daily Goal
- Stored in `localStorage["smart_review_daily_goal"]` (override) or onboarding `dailyGoal`
- `getDailyGoal()` / `setDailyGoal(n)` in `src/lib/smartReviewDaily.ts`
- `maxNewCardsPerDay = round(dailyGoal * 0.25)`, min 2
- Slider 5–100 (step 5) in `/settings` → "Smart Review › Meta diaria"

## Analytics
- Table `smart_review_events` (user_id, session_id, event_name, props jsonb, created_at)
- RLS: anon+authenticated INSERT, authenticated SELECT own
- Helper: `trackSmartReview(event, props)` in `src/lib/smartReviewAnalytics.ts`
- sessionId persisted in sessionStorage

## Per-day completion tracking
- `localStorage["smart_review_completed"]` = `{ date, count, introduced }`
- Auto-resets on new day
