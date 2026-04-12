export const FEATURES = [
  { name: "Contenido de aprendizaje", free: true, super: true },
  { name: "Vidas ilimitadas", free: false, super: true },
  { name: "Práctica avanzada", free: false, super: true },
  { name: "Repaso de errores", free: false, super: true },
  { name: "Desafíos exclusivos", free: false, super: true },
  { name: "Sin anuncios", free: false, super: true },
];

export type PlanId = "family" | "annual" | "monthly";

export interface Plan {
  id: PlanId;
  badge?: string;
  name: string;
  duration: string;
  price: string;
}

export const ALL_PLANS: Plan[] = [
  { id: "annual", badge: "MÁS POPULAR", name: "12 meses", duration: "", price: "€8,49 / mes" },
  { id: "family", badge: "2-6 MIEMBROS", name: "Plan Familiar", duration: "12 meses", price: "€10,25 / mes" },
  { id: "monthly", name: "1 mes", duration: "", price: "€18,49 / mes" },
];

export const PLAN_DETAILS: Record<PlanId, string> = {
  family: "7 días gratis, después €123,00 al año (€10,25/mes) + impuestos",
  annual: "7 días gratis, después €101,99 al año (€8,49/mes) + impuestos",
  monthly: "3 días gratis, después €18,49 al mes + impuestos",
};

export const TRIAL_DAYS: Record<PlanId, number> = {
  family: 7,
  annual: 7,
  monthly: 3,
};

export type Step = "compare" | "reminder" | "plans";
