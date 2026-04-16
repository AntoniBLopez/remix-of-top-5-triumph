
CREATE TABLE public.smart_review_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  session_id text,
  event_name text NOT NULL,
  props jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_smart_review_events_event ON public.smart_review_events(event_name, created_at DESC);
CREATE INDEX idx_smart_review_events_user ON public.smart_review_events(user_id, created_at DESC);

ALTER TABLE public.smart_review_events ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) may insert events for funnel tracking
CREATE POLICY "Anyone can insert smart review events"
ON public.smart_review_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users may read their own events; admins read all is out of scope
CREATE POLICY "Users can read their own smart review events"
ON public.smart_review_events
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL);
