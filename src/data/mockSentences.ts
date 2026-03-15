export interface SentenceCloze {
  verb: string;
  tense: string;
  pronoun: string;
  answer: string;
  sentence: string; // Use ___ for the blank
  hint?: string;
}

export const MOCK_SENTENCES: SentenceCloze[] = [
  { verb: "sein", tense: "Präsens", pronoun: "ich", answer: "bin", sentence: "Ich ___ sehr müde heute.", hint: "ser/estar" },
  { verb: "sein", tense: "Präsens", pronoun: "du", answer: "bist", sentence: "Du ___ mein bester Freund.", hint: "ser/estar" },
  { verb: "sein", tense: "Präsens", pronoun: "er/sie", answer: "ist", sentence: "Sie ___ eine gute Lehrerin.", hint: "ser/estar" },
  { verb: "haben", tense: "Präsens", pronoun: "ich", answer: "habe", sentence: "Ich ___ zwei Geschwister.", hint: "tener" },
  { verb: "haben", tense: "Präsens", pronoun: "du", answer: "hast", sentence: "Du ___ eine schöne Wohnung.", hint: "tener" },
  { verb: "haben", tense: "Präsens", pronoun: "er/sie", answer: "hat", sentence: "Er ___ keine Zeit.", hint: "tener" },
  { verb: "gehen", tense: "Präsens", pronoun: "ich", answer: "gehe", sentence: "Ich ___ jeden Tag zur Schule.", hint: "ir" },
  { verb: "gehen", tense: "Präsens", pronoun: "du", answer: "gehst", sentence: "Du ___ gern ins Kino.", hint: "ir" },
  { verb: "kommen", tense: "Präsens", pronoun: "ich", answer: "komme", sentence: "Ich ___ aus Spanien.", hint: "venir" },
  { verb: "kommen", tense: "Präsens", pronoun: "du", answer: "kommst", sentence: "Wann ___ du nach Hause?", hint: "venir" },
  { verb: "machen", tense: "Präsens", pronoun: "ich", answer: "mache", sentence: "Ich ___ meine Hausaufgaben.", hint: "hacer" },
  { verb: "sprechen", tense: "Präsens", pronoun: "du", answer: "sprichst", sentence: "Du ___ sehr gut Deutsch.", hint: "hablar" },
  { verb: "sprechen", tense: "Präsens", pronoun: "er/sie", answer: "spricht", sentence: "Sie ___ drei Sprachen.", hint: "hablar" },
  { verb: "lesen", tense: "Präsens", pronoun: "du", answer: "liest", sentence: "Du ___ gern Bücher.", hint: "leer" },
  { verb: "fahren", tense: "Präsens", pronoun: "du", answer: "fährst", sentence: "Du ___ morgen nach Berlin.", hint: "conducir/ir" },
  { verb: "fahren", tense: "Präsens", pronoun: "er/sie", answer: "fährt", sentence: "Er ___ mit dem Zug.", hint: "conducir/ir" },
  { verb: "sehen", tense: "Präsens", pronoun: "du", answer: "siehst", sentence: "Du ___ heute sehr glücklich aus.", hint: "ver" },
  { verb: "sein", tense: "Präteritum", pronoun: "ich", answer: "war", sentence: "Ich ___ gestern im Park.", hint: "ser/estar" },
  { verb: "haben", tense: "Präteritum", pronoun: "ich", answer: "hatte", sentence: "Ich ___ früher einen Hund.", hint: "tener" },
  { verb: "gehen", tense: "Präteritum", pronoun: "ich", answer: "ging", sentence: "Ich ___ nach dem Essen spazieren.", hint: "ir" },
  { verb: "sein", tense: "Perfekt", pronoun: "ich", answer: "bin gewesen", sentence: "Ich ___ in Deutschland ___.", hint: "ser/estar (participio)" },
  { verb: "gehen", tense: "Perfekt", pronoun: "ich", answer: "bin gegangen", sentence: "Ich ___ gestern ins Kino ___.", hint: "ir (participio)" },
];

export interface TableClozeCard {
  verb: string;
  tense: string;
  rows: { pronoun: string; answer: string; isBlank: boolean }[];
}

export function generateTableClozeCards(): TableClozeCard[] {
  const cards: TableClozeCard[] = [
    {
      verb: "sein",
      tense: "Präsens",
      rows: [
        { pronoun: "ich", answer: "bin", isBlank: true },
        { pronoun: "du", answer: "bist", isBlank: false },
        { pronoun: "er/sie", answer: "ist", isBlank: true },
      ],
    },
    {
      verb: "haben",
      tense: "Präsens",
      rows: [
        { pronoun: "ich", answer: "habe", isBlank: false },
        { pronoun: "du", answer: "hast", isBlank: true },
        { pronoun: "er/sie", answer: "hat", isBlank: true },
      ],
    },
    {
      verb: "gehen",
      tense: "Präsens",
      rows: [
        { pronoun: "ich", answer: "gehe", isBlank: true },
        { pronoun: "du", answer: "gehst", isBlank: true },
        { pronoun: "er/sie", answer: "geht", isBlank: false },
      ],
    },
    {
      verb: "sprechen",
      tense: "Präsens",
      rows: [
        { pronoun: "ich", answer: "spreche", isBlank: false },
        { pronoun: "du", answer: "sprichst", isBlank: true },
        { pronoun: "er/sie", answer: "spricht", isBlank: true },
      ],
    },
    {
      verb: "fahren",
      tense: "Präsens",
      rows: [
        { pronoun: "ich", answer: "fahre", isBlank: true },
        { pronoun: "du", answer: "fährst", isBlank: true },
        { pronoun: "er/sie", answer: "fährt", isBlank: false },
      ],
    },
    {
      verb: "sein",
      tense: "Präteritum",
      rows: [
        { pronoun: "ich", answer: "war", isBlank: true },
        { pronoun: "du", answer: "warst", isBlank: true },
        { pronoun: "er/sie", answer: "war", isBlank: false },
      ],
    },
    {
      verb: "haben",
      tense: "Präteritum",
      rows: [
        { pronoun: "ich", answer: "hatte", isBlank: true },
        { pronoun: "du", answer: "hattest", isBlank: false },
        { pronoun: "er/sie", answer: "hatte", isBlank: true },
      ],
    },
  ];
  return cards;
}
