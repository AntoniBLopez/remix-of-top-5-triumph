import { WordsArray } from "@/types/game";

export type TenseId = "presente" | "preterito" | "imperfecto" | "alle";

export interface TenseOption {
  id: TenseId;
  label: string;
  emoji: string;
  desc: string;
}

export const TENSE_OPTIONS: TenseOption[] = [
  { id: "alle", label: "Todos los tiempos", emoji: "🌟", desc: "Practica todas las conjugaciones mezcladas" },
  { id: "presente", label: "Presente", emoji: "🔵", desc: "Presente simple: yo hablo, tú hablas…" },
  { id: "preterito", label: "Pretérito", emoji: "🟠", desc: "Pasado simple: yo hablé, tú hablaste…" },
  { id: "imperfecto", label: "Imperfecto", emoji: "🟢", desc: "Pasado imperfecto: yo hablaba, tú hablabas…" },
];

// Format: ["infinitivo — pronombre (tiempo)", "forma conjugada"]
const PRESENTE_WORDS: WordsArray[] = [
  ["ser — yo (Presente)", "soy"],
  ["ser — tú (Presente)", "eres"],
  ["ser — él/ella (Presente)", "es"],
  ["tener — yo (Presente)", "tengo"],
  ["tener — tú (Presente)", "tienes"],
  ["tener — él/ella (Presente)", "tiene"],
  ["ir — yo (Presente)", "voy"],
  ["ir — tú (Presente)", "vas"],
  ["venir — yo (Presente)", "vengo"],
  ["venir — tú (Presente)", "vienes"],
  ["hacer — yo (Presente)", "hago"],
  ["hacer — tú (Presente)", "haces"],
  ["hablar — yo (Presente)", "hablo"],
  ["hablar — tú (Presente)", "hablas"],
  ["hablar — él/ella (Presente)", "habla"],
  ["escribir — yo (Presente)", "escribo"],
  ["escribir — tú (Presente)", "escribes"],
  ["escribir — él/ella (Presente)", "escribe"],
  ["leer — yo (Presente)", "leo"],
  ["leer — tú (Presente)", "lees"],
  ["leer — él/ella (Presente)", "lee"],
  ["ver — yo (Presente)", "veo"],
  ["ver — tú (Presente)", "ves"],
  ["ver — él/ella (Presente)", "ve"],
  ["poder — yo (Presente)", "puedo"],
  ["poder — tú (Presente)", "puedes"],
  ["poder — él/ella (Presente)", "puede"],
];

const PRETERITO_WORDS: WordsArray[] = [
  ["ser — yo (Pretérito)", "fui"],
  ["ser — tú (Pretérito)", "fuiste"],
  ["ser — él/ella (Pretérito)", "fue"],
  ["tener — yo (Pretérito)", "tuve"],
  ["tener — tú (Pretérito)", "tuviste"],
  ["tener — él/ella (Pretérito)", "tuvo"],
  ["ir — yo (Pretérito)", "fui"],
  ["ir — tú (Pretérito)", "fuiste"],
  ["venir — yo (Pretérito)", "vine"],
  ["venir — tú (Pretérito)", "viniste"],
  ["hacer — yo (Pretérito)", "hice"],
  ["hacer — tú (Pretérito)", "hiciste"],
  ["hablar — yo (Pretérito)", "hablé"],
  ["hablar — tú (Pretérito)", "hablaste"],
  ["hablar — él/ella (Pretérito)", "habló"],
  ["escribir — yo (Pretérito)", "escribí"],
  ["escribir — tú (Pretérito)", "escribiste"],
  ["escribir — él/ella (Pretérito)", "escribió"],
  ["leer — yo (Pretérito)", "leí"],
  ["leer — tú (Pretérito)", "leíste"],
  ["leer — él/ella (Pretérito)", "leyó"],
  ["ver — yo (Pretérito)", "vi"],
  ["ver — tú (Pretérito)", "viste"],
  ["ver — él/ella (Pretérito)", "vio"],
  ["poder — yo (Pretérito)", "pude"],
  ["poder — tú (Pretérito)", "pudiste"],
  ["poder — él/ella (Pretérito)", "pudo"],
];

const IMPERFECTO_WORDS: WordsArray[] = [
  ["ser — yo (Imperfecto)", "era"],
  ["ser — tú (Imperfecto)", "eras"],
  ["tener — yo (Imperfecto)", "tenía"],
  ["tener — tú (Imperfecto)", "tenías"],
  ["ir — yo (Imperfecto)", "iba"],
  ["ir — tú (Imperfecto)", "ibas"],
  ["venir — yo (Imperfecto)", "venía"],
  ["venir — tú (Imperfecto)", "venías"],
  ["hacer — yo (Imperfecto)", "hacía"],
  ["hacer — tú (Imperfecto)", "hacías"],
  ["hablar — yo (Imperfecto)", "hablaba"],
  ["hablar — tú (Imperfecto)", "hablabas"],
  ["escribir — yo (Imperfecto)", "escribía"],
  ["escribir — tú (Imperfecto)", "escribías"],
  ["leer — yo (Imperfecto)", "leía"],
  ["leer — tú (Imperfecto)", "leías"],
  ["ver — yo (Imperfecto)", "veía"],
  ["ver — tú (Imperfecto)", "veías"],
  ["poder — yo (Imperfecto)", "podía"],
  ["poder — tú (Imperfecto)", "podías"],
];

export const CONJUGATION_BY_TENSE: Record<string, WordsArray[]> = {
  presente: PRESENTE_WORDS,
  preterito: PRETERITO_WORDS,
  imperfecto: IMPERFECTO_WORDS,
  alle: [...PRESENTE_WORDS, ...PRETERITO_WORDS, ...IMPERFECTO_WORDS],
};

// Legacy export for backward compat
export const MOCK_CONJUGATION_WORDS: WordsArray[] = PRESENTE_WORDS;
