import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface MemoryEfficiencyStepProps {
  onNext: () => void;
  onBack: () => void;
}

const COMPARISON_DATA = [
  { name: "Algoritmos\ntradicionales", reviews: 180, fill: "destructive" },
  { name: "Smart Review\n(FSRS)", reviews: 135, fill: "primary" },
];

const MemoryEfficiencyStep = ({ onNext, onBack }: MemoryEfficiencyStepProps) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.3 }}
    className="px-6"
  >
    {/* Header */}
    <div className="mb-6 text-center">
      <h2 className="text-xl font-extrabold text-foreground leading-tight">
        Menos esfuerzo.
        <br />
        <span className="text-primary">Mejores resultados.</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        FSRS predice exactamente cuándo olvidarás y optimiza cada repaso.
      </p>
    </div>

    {/* Chart */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-4 pb-2"
    >
      <p className="mb-1 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        Repasos diarios promedio
      </p>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={COMPARISON_DATA}
            margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
            barCategoryGap="35%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(160, 15%, 90%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "hsl(210, 10%, 50%)" }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis
              domain={[0, 200]}
              tick={{ fontSize: 11, fill: "hsl(210, 10%, 50%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="reviews"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
              animationBegin={300}
            >
              <Cell fill="hsl(0, 72%, 51%)" fillOpacity={0.35} />
              <Cell fill="hsl(162, 63%, 41%)" fillOpacity={1} />
              <LabelList
                dataKey="reviews"
                position="top"
                style={{ fontSize: 13, fontWeight: 700, fill: "hsl(210, 10%, 50%)" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>

    {/* Savings badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
    >
      <span className="text-2xl font-black text-primary">-25%</span>
      <span className="text-xs text-muted-foreground leading-tight">
        menos repasos diarios manteniendo &gt;88% de retención · Benchmarks en miles de usuarios reales
      </span>
    </motion.div>

    {/* Brief text */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="mt-3 text-center text-xs text-muted-foreground leading-relaxed"
    >
      Usa machine learning para adaptarse a tu memoria única. Millones de estudiantes ya lo usan.
      Ahora con <span className="font-semibold text-foreground">frases reales</span> para que hables el idioma.
    </motion.p>

    {/* Navigation */}
    <div className="mt-6 flex gap-3">
      <Button variant="outline" onClick={onBack} className="h-12 flex-1 rounded-2xl font-bold gap-1">
        <ArrowLeft className="h-4 w-4" /> Atrás
      </Button>
      <Button onClick={onNext} className="h-12 flex-[2] rounded-2xl font-extrabold gap-1">
        Siguiente <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  </motion.div>
);

export default MemoryEfficiencyStep;
