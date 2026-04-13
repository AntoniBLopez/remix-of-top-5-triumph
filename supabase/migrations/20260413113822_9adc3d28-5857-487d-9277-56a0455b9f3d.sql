ALTER TABLE public.blog_posts
ADD COLUMN scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Enable pg_cron and pg_net for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;