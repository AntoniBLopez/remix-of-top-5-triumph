import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  GraduationCap,
  ArrowLeft,
  Brain,
  LineChart,
  Users,
  Sparkles,
  ShieldCheck,
  Infinity as InfinityIcon,
  CheckCircle2,
  BookOpen,
  Microscope,
  Sigma,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const applicationSchema = z.object({
  role: z.enum(["student", "teacher", "professor", "researcher"], {
    errorMap: () => ({ message: "Selecciona tu perfil" }),
  }),
  fullName: z
    .string()
    .trim()
    .min(2, "Introduce tu nombre completo")
    .max(100, "Máximo 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(255, "Máximo 255 caracteres"),
  institution: z
    .string()
    .trim()
    .min(2, "Indica tu institución")
    .max(150, "Máximo 150 caracteres"),
  website: z
    .string()
    .trim()
    .max(200, "Máximo 200 caracteres")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .trim()
    .min(2, "Indica el país")
    .max(80, "Máximo 80 caracteres"),
  notes: z
    .string()
    .trim()
    .max(500, "Máximo 500 caracteres")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

type ApplicationData = z.infer<typeof applicationSchema>;

const PILLARS = [
  {
    icon: Brain,
    title: "FSRS basado en evidencia",
    desc: "Algoritmo de repetición espaciada calibrado con benchmarks reales: predice cuándo olvidarás cada tarjeta y optimiza el calendario de repaso.",
  },
  {
    icon: Sigma,
    title: "Modelo matemático abierto",
    desc: "Curvas de retención, difficulty/stability y métricas tipo log-loss visibles para el estudiante. Sin cajas negras ni gamificación vacía.",
  },
  {
    icon: LineChart,
    title: "Analítica longitudinal",
    desc: "Mastery Map, retención a 7/30/90 días, estados de las tarjetas y heatmaps. Datos accionables para profesores e investigadores.",
  },
  {
    icon: Microscope,
    title: "Contextual Cloze",
    desc: "Frases reales con huecos en lugar de tarjetas aisladas. Practicas la conjugación dentro de contexto comunicativo auténtico.",
  },
];

const NUMBERS = [
  { value: "~10.400", label: "tarjetas mínimas necesarias", sub: "vs 62.400 con métodos tradicionales" },
  { value: "88-92%", label: "retención objetivo", sub: "configurable por estudiante" },
  { value: "-25%", label: "menos repasos diarios", sub: "manteniendo el mismo dominio" },
];

const INCLUDED = [
  "Acceso completo a todos los modos de estudio",
  "Smart Review FSRS sin límites diarios",
  "Biblioteca completa de verbos y conjugaciones",
  "Analítica avanzada por estudiante",
  "Contenido sin anuncios",
  "Soporte prioritario por email",
];

const FAQ = [
  {
    q: "¿Quién puede solicitar el acceso educativo?",
    a: "Estudiantes a tiempo completo en escuelas, institutos o universidades reconocidas, así como profesores e investigadores de español como lengua extranjera. Las academias privadas y escuelas de idiomas no entran en este programa.",
  },
  {
    q: "¿Cuánto dura el acceso gratuito?",
    a: "6 meses renovables sin tarjeta de crédito. Antes de la expiración te enviamos un recordatorio para extenderlo si sigues cumpliendo los criterios.",
  },
  {
    q: "¿Puedo usarlo con toda mi clase?",
    a: "Sí. Los profesores pueden solicitar licencias para grupos completos. Indícalo en el formulario y te contactaremos con un plan adaptado.",
  },
  {
    q: "¿Cómo se verifica mi condición de estudiante o docente?",
    a: "Tras enviar el formulario te pediremos por email un justificante: matrícula, carnet vigente, contrato docente o email institucional verificable.",
  },
];

const EducationPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Partial<ApplicationData>>({
    role: undefined,
    fullName: "",
    email: "",
    institution: "",
    website: "",
    country: "",
    notes: "",
    consent: undefined as unknown as true,
  });

  const update = <K extends keyof ApplicationData>(
    key: K,
    value: ApplicationData[K] | undefined,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = applicationSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Revisa los campos marcados");
      return;
    }

    setSubmitting(true);
    // Simulación de envío. En producción enviar a edge function / CRM.
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Solicitud enviada. Te contactaremos en 24-48 h.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            <GraduationCap className="h-3.5 w-3.5" />
            Vokabla para escuelas
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Decorative grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3 text-primary" />
              Programa educativo
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Acceso gratuito para{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                estudiantes y docentes
              </span>{" "}
              de español.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Vokabla es una herramienta científica de aprendizaje basada en
              FSRS y Contextual Cloze. Si estudias o enseñas español a tiempo
              completo, te damos <span className="font-semibold text-foreground">6 meses de acceso completo</span>{" "}
              sin tarjeta de crédito.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#solicitar">
                <Button size="lg" className="h-12 rounded-2xl px-8 font-bold">
                  Solicitar acceso
                </Button>
              </a>
              <a href="#como-funciona">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-2xl px-8 font-bold"
                >
                  Cómo funciona
                </Button>
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Sin tarjeta de crédito · Verificación en 24-48 h · Renovable
            </p>
          </motion.div>

          {/* Numbers strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {NUMBERS.map((n) => (
              <div
                key={n.label}
                className="rounded-2xl border border-border bg-card/50 p-5 text-center backdrop-blur"
              >
                <div className="text-3xl font-black tracking-tight text-primary">
                  {n.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {n.label}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {n.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section id="como-funciona" className="border-b border-border px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Diseñado con mentalidad científica.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sin gamificación infantil ni recompensas vacías. Solo el modelo
              matemático que mejor predice tu memoria, expuesto con
              transparencia.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="border-b border-border bg-muted/20 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
              <InfinityIcon className="h-3 w-3" />
              Plan completo
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Todo Vokabla, sin límites, durante 6 meses.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mismo plan que nuestros suscriptores Super. Pensado para que
              puedas integrar Vokabla en tu rutina académica o en tu aula sin
              fricciones.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Sin tarjeta de crédito
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground">
                <Users className="h-4 w-4 text-primary" />
                Licencias por aula disponibles
              </div>
            </div>
          </div>

          <ul className="space-y-2">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application form */}
      <section id="solicitar" className="border-b border-border px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Solicita tus 6 meses gratis.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Completa el formulario y te responderemos por email en un plazo
              de 24-48 horas con las instrucciones de acceso. Importante: debes
              poder acreditar tu condición de estudiante o docente a tiempo
              completo en una institución reconocida.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4 text-primary" />
                Académicos e investigadores
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Si trabajas en investigación sobre adquisición de segundas
                lenguas o memoria, indícalo en notas: ofrecemos colaboración
                con datos anonimizados.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-6 md:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold">¡Solicitud recibida!</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Revisamos tu solicitud y te escribimos en 24-48 horas a la
                  dirección que has indicado. Mientras tanto, puedes explorar
                  Vokabla con la cuenta gratuita.
                </p>
                <Link to="/" className="mt-6">
                  <Button variant="outline" className="rounded-2xl">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-extrabold">Formulario de solicitud</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Los campos marcados con * son obligatorios.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <Label htmlFor="role">Soy *</Label>
                    <Select
                      value={form.role}
                      onValueChange={(v) =>
                        update("role", v as ApplicationData["role"])
                      }
                    >
                      <SelectTrigger id="role" className="mt-1.5">
                        <SelectValue placeholder="Selecciona tu perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Estudiante</SelectItem>
                        <SelectItem value="teacher">Profesor/a (escuela / instituto)</SelectItem>
                        <SelectItem value="professor">Profesor/a universitario/a</SelectItem>
                        <SelectItem value="researcher">Investigador/a</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="mt-1 text-xs text-destructive">{errors.role}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Nombre completo *</Label>
                      <Input
                        id="fullName"
                        className="mt-1.5"
                        value={form.fullName ?? ""}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Ana García"
                        maxLength={100}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email institucional *</Label>
                      <Input
                        id="email"
                        type="email"
                        className="mt-1.5"
                        value={form.email ?? ""}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="ana@universidad.edu"
                        maxLength={255}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="institution">Institución *</Label>
                      <Input
                        id="institution"
                        className="mt-1.5"
                        value={form.institution ?? ""}
                        onChange={(e) => update("institution", e.target.value)}
                        placeholder="Universidad de..."
                        maxLength={150}
                      />
                      {errors.institution && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.institution}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="country">País *</Label>
                      <Input
                        id="country"
                        className="mt-1.5"
                        value={form.country ?? ""}
                        onChange={(e) => update("country", e.target.value)}
                        placeholder="España"
                        maxLength={80}
                      />
                      {errors.country && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Web de la institución</Label>
                    <Input
                      id="website"
                      className="mt-1.5"
                      value={form.website ?? ""}
                      onChange={(e) => update("website", e.target.value)}
                      placeholder="https://..."
                      maxLength={200}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notas (opcional)</Label>
                    <Textarea
                      id="notes"
                      className="mt-1.5 min-h-[88px]"
                      value={form.notes ?? ""}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="¿Buscas licencias para una clase entera? ¿Eres investigador? Cuéntanos."
                      maxLength={500}
                    />
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3">
                    <Checkbox
                      id="consent"
                      checked={form.consent === true}
                      onCheckedChange={(checked) =>
                        update("consent", checked === true ? true : undefined)
                      }
                    />
                    <Label
                      htmlFor="consent"
                      className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
                    >
                      Acepto recibir comunicaciones relacionadas con mi
                      solicitud y la{" "}
                      <span className="font-semibold text-foreground">
                        política de privacidad
                      </span>{" "}
                      de Vokabla.
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="-mt-2 text-xs text-destructive">
                      {errors.consent}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="h-12 w-full rounded-2xl font-extrabold"
                  >
                    {submitting ? "Enviando..." : "Enviar solicitud"}
                  </Button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Las academias privadas y escuelas de idiomas no entran en
                    este programa.
                  </p>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-bold text-foreground">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-border px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vokabla · Programa educativo
          </p>
          <Link
            to="/"
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Volver a Vokabla
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default EducationPage;
