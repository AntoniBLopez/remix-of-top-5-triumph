import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Tables<"blog_posts"> | null>(null);
  const [related, setRelated] = useState<Tables<"blog_posts">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost(data);
      if (data?.category) {
        const { data: rel } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(3);
        setRelated(rel || []);
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post?.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Artículo no encontrado</p>
        <Button onClick={() => navigate("/blog")}>Volver al blog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 md:px-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/blog")} className="gap-1.5 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Blog
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="text-muted-foreground hover:text-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        {/* Cover */}
        {post.cover_image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 overflow-hidden rounded-2xl border border-border/30"
          >
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full object-cover max-h-[480px]"
            />
          </motion.div>
        )}

        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.category && (
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                {post.category}
              </Badge>
            )}
            {post.tags && post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs text-muted-foreground">
                <Tag className="mr-1 h-3 w-3" /> {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {post.title}
          </h1>

          <div className="mb-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border/40">
            {post.author_name && (
              <span className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-3.5 w-3.5" />
                </div>
                {post.author_name}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {post.reading_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.reading_time} min de lectura
              </span>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-primary/40 prose-blockquote:bg-secondary/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-border/40">
            <h2 className="mb-6 text-xl font-bold text-foreground">Artículos relacionados</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group flex flex-col rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  {r.cover_image_url && (
                    <div className="mb-3 aspect-video overflow-hidden rounded-lg">
                      <img src={r.cover_image_url} alt={r.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{r.excerpt}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                    Leer más <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
