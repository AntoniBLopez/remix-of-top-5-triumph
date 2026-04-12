import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const SECTIONS = [
  {
    title: "Encabezados",
    items: [
      { syntax: "# Título principal", desc: "H1 — solo uno por artículo" },
      { syntax: "## Subtítulo", desc: "H2 — secciones principales" },
      { syntax: "### Sub-sección", desc: "H3 — subsecciones" },
      { syntax: "#### Nivel 4", desc: "H4 — detalles" },
    ],
  },
  {
    title: "Formato de texto",
    items: [
      { syntax: "**texto en negrita**", desc: "Negrita" },
      { syntax: "*texto en cursiva*", desc: "Cursiva" },
      { syntax: "~~texto tachado~~", desc: "Tachado" },
      { syntax: "`código inline`", desc: "Código en línea" },
      { syntax: "> Cita o nota destacada", desc: "Bloque de cita" },
    ],
  },
  {
    title: "Listas",
    items: [
      { syntax: "- Elemento\n- Otro elemento", desc: "Lista sin orden" },
      { syntax: "1. Primero\n2. Segundo", desc: "Lista numerada" },
      { syntax: "- [ ] Tarea pendiente\n- [x] Tarea completada", desc: "Lista de tareas (checklist)" },
    ],
  },
  {
    title: "Enlaces e imágenes",
    items: [
      { syntax: "[texto del enlace](https://url.com)", desc: "Enlace" },
      { syntax: "![alt text](https://url.com/img.jpg)", desc: "Imagen" },
      { syntax: "[![alt](img-url)](link-url)", desc: "Imagen con enlace" },
    ],
  },
  {
    title: "Código",
    items: [
      {
        syntax: "```javascript\nconst x = 1;\nconsole.log(x);\n```",
        desc: "Bloque de código con resaltado de sintaxis",
      },
    ],
  },
  {
    title: "Tablas",
    items: [
      {
        syntax: "| Columna 1 | Columna 2 |\n| --- | --- |\n| Dato 1 | Dato 2 |",
        desc: "Tabla con alineación",
      },
    ],
  },
  {
    title: "Separadores y extras",
    items: [
      { syntax: "---", desc: "Línea separadora horizontal" },
      { syntax: "Texto con nota[^1]\n\n[^1]: Explicación", desc: "Nota al pie" },
    ],
  },
];

export default function MarkdownHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-bold">Guía de Markdown</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Usa esta sintaxis en el editor para dar formato a tus artículos.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-6 pb-6 max-h-[65vh]">
          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-primary mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border/50 bg-muted/30 p-3 space-y-1.5"
                    >
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                      <pre className="text-sm font-mono text-foreground whitespace-pre-wrap bg-background/60 rounded-md px-3 py-2 border border-border/30">
                        {item.syntax}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
