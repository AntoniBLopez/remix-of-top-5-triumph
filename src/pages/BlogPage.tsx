import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock, ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const CATEGORIES = ["Todos", "Gramática", "Vocabulario", "Cultura", "Consejos", "Pronunciación"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Tables<"blog_posts">[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory =
      activeCategory === "Todos" ||
      (p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:px-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Blog</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="mb-10"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Blog
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Aprende alemán con<br />
            <span className="text-primary">nuestros artículos</span>
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Consejos, gramática, cultura y mucho más para dominar el alemán.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar artículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
        </motion.div>

        {/* Posts */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">No se encontraron artículos.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured post */}
            {featured && (
              <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group relative grid overflow-hidden rounded-2xl border border-border/50 bg-card md:grid-cols-2 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  {featured.cover_image_url && (
                    <div className="aspect-video md:aspect-auto md:min-h-[320px] overflow-hidden">
                      <img
                        src={featured.cover_image_url}
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    {featured.category && (
                      <Badge className="mb-3 w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                        {featured.category}
                      </Badge>
                    )}
                    <h3 className="mb-3 text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors md:text-3xl">
                      {featured.title}
                    </h3>
                    {featured.excerpt && (
                      <p className="mb-4 line-clamp-3 text-muted-foreground">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(featured.created_at).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {featured.reading_time && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featured.reading_time} min
                        </span>
                      )}
                    </div>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Leer artículo
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial="hidden"
                    animate="visible"
                    custom={i + 3}
                    variants={fadeUp}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      {post.cover_image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        {post.category && (
                          <Badge className="mb-2 w-fit bg-primary/10 text-primary border-primary/20 text-xs hover:bg-primary/15">
                            {post.category}
                          </Badge>
                        )}
                        <h3 className="mb-2 text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground flex-1">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/30">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.created_at).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            {post.reading_time && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.reading_time} min
                              </span>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
