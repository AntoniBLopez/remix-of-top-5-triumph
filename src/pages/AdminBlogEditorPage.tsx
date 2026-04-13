import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Upload, X, Image as ImageIcon } from "lucide-react";
import MarkdownHelpDialog from "@/components/blog/MarkdownHelpDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const CATEGORIES = ["Gramática", "Vocabulario", "Cultura", "Consejos", "Pronunciación"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function estimateReadingTime(text: string) {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export default function AdminBlogEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;
  const redirectPath = isEdit && id ? `/admin/blog/edit/${id}` : "/admin/blog/new";
  const { checkingAuth, isAuthenticated } = useRequireAuth(redirectPath);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [published, setPublished] = useState(false);
  const [authorName, setAuthorName] = useState("Equipo VerboFlow");
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (isEdit && isAuthenticated) {
      supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setExcerpt(data.excerpt || "");
            setContent(data.content);
            setCoverUrl(data.cover_image_url || "");
            setCategory(data.category || "");
            setTagsInput((data.tags || []).join(", "));
            setPublished(data.published || false);
            setAuthorName(data.author_name || "Equipo VerboFlow");
            setSlugManual(true);
          }
        });
    }
  }, [id, isAuthenticated, isEdit]);

  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  const readingTime = useMemo(() => estimateReadingTime(content), [content]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Solo se permiten imágenes", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "La imagen no puede superar 5MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      toast({ title: "Error al subir imagen", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("blog-images").getPublicUrl(path);
    setCoverUrl(publicUrl);
    setUploading(false);
    toast({ title: "Imagen subida correctamente" });
  };

  const handleSave = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      toast({ title: "Tu sesión expiró", description: "Vuelve a iniciar sesión para guardar.", variant: "destructive" });
      navigate(`/auth?redirect=${encodeURIComponent(redirectPath)}`, { replace: true });
      return;
    }

    if (!title.trim() || !content.trim() || !slug.trim()) {
      toast({ title: "Título, slug y contenido son obligatorios", variant: "destructive" });
      return;
    }

    setSaving(true);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const postData = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      cover_image_url: coverUrl || null,
      category: category || null,
      tags: tags.length > 0 ? tags : null,
      published,
      author_name: authorName,
      reading_time: readingTime,
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("blog_posts").update(postData).eq("id", id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(postData));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error al guardar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEdit ? "Artículo actualizado" : "Artículo creado" });
      navigate("/admin/blog");
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              {isEdit ? "Editar artículo" : "Nuevo artículo"}
            </h1>
          </div>
          <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1">
            <Save className="h-4 w-4" /> {saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Editor */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del artículo"
                className="mt-1 text-lg font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="slug">
                Slug{" "}
                <button
                  type="button"
                  className="ml-2 text-xs text-primary hover:underline"
                  onClick={() => {
                    setSlugManual(false);
                    setSlug(slugify(title));
                  }}
                >
                  Auto-generar
                </button>
              </Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManual(true);
                }}
                placeholder="url-del-articulo"
                className="mt-1 font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Extracto (SEO)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Breve descripción para la tarjeta y meta description..."
                rows={2}
                className="mt-1"
              />
            </div>

            {/* Content with preview */}
            <Tabs defaultValue="write" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="write">Escribir</TabsTrigger>
                  <TabsTrigger value="preview" className="gap-1">
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </TabsTrigger>
                </TabsList>
                <MarkdownHelpDialog />
              </div>
              <TabsContent value="write">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe en Markdown..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="min-h-[320px] rounded-md border border-input bg-background p-4 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary">
                  {content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  ) : (
                    <p className="text-muted-foreground italic">Sin contenido todavía...</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 rounded-2xl border border-border/50 bg-card p-5">
            <div className="flex items-center justify-between">
              <Label>Publicado</Label>
              <Switch checked={published} onCheckedChange={setPublished} />
            </div>

            <div>
              <Label>Categoría</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (separados por coma)</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="A1, verbos, Konjunktiv..."
                className="mt-1"
              />
              {tagsInput && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {tagsInput
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                </div>
              )}
            </div>

            <div>
              <Label>Imagen de portada</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {coverUrl ? (
                <div className="relative mt-2 group">
                  <img
                    src={coverUrl}
                    alt="Portada"
                    className="w-full rounded-lg object-cover aspect-video"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <Upload className="h-3.5 w-3.5 mr-1" /> Cambiar
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setCoverUrl("")}
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Quitar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/60 hover:border-primary/40 bg-muted/30 hover:bg-muted/50 transition-colors py-6 cursor-pointer"
                  >
                    {uploading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <ImageIcon className="h-7 w-7 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {uploading ? "Subiendo..." : "Subir imagen"}
                    </span>
                    <span className="text-xs text-muted-foreground/60">PNG, JPG, WebP · Máx. 5MB</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border/50" />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">o</span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>
                  <Input
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="Pegar URL de imagen..."
                    className="text-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                ⏱ Tiempo de lectura estimado: <strong>{readingTime} min</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
