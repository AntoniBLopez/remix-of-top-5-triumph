import { useState, useEffect } from "react";
import { WordsArray } from "@/types/game";
import { Check, X, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface Props {
  topicWords: WordsArray[];
  onComplete: (known: string[], learning: string[]) => void;
}

const FlashcardGame = ({ topicWords, onComplete }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [learningWords, setLearningWords] = useState<string[]>([]);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [entering, setEntering] = useState(true);

  const total = topicWords.length;
  const answered = knownWords.length + learningWords.length;
  const current = topicWords[currentIndex];

  useEffect(() => {
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 300);
    return () => clearTimeout(t);
  }, [currentIndex]);

  const handleAnswer = (known: boolean) => {
    const germanWord = current[1];
    setExitDirection(known ? "right" : "left");

    if (known) {
      setKnownWords((prev) => [...prev, germanWord]);
    } else {
      setLearningWords((prev) => [...prev, germanWord]);
    }

    setTimeout(() => {
      setFlipped(false);
      setExitDirection(null);
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        const finalKnown = known ? [...knownWords, germanWord] : knownWords;
        const finalLearning = known ? learningWords : [...learningWords, germanWord];
        onComplete(finalKnown, finalLearning);
      }
    }, 350);
  };

  const progress = (answered / total) * 100;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto px-4">
      {/* Progress */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          <span>{answered}/{total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats pills */}
      <div className="flex gap-3">
        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Check className="h-3.5 w-3.5" />
          {knownWords.length} conocidas
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-foreground">
          <RotateCcw className="h-3.5 w-3.5" />
          {learningWords.length} aprendiendo
        </div>
      </div>

      {/* Card */}
      <div
        className={`relative w-full perspective-1000 cursor-pointer transition-all duration-300 ${
          exitDirection === "right"
            ? "translate-x-[120%] opacity-0 rotate-6"
            : exitDirection === "left"
            ? "-translate-x-[120%] opacity-0 -rotate-6"
            : entering
            ? "scale-95 opacity-0"
            : "scale-100 opacity-100"
        }`}
        style={{ minHeight: "280px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{ minHeight: "280px" }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-lg backface-hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Español</span>
            <p className="text-3xl font-extrabold text-foreground text-center">{current[0]}</p>
            <p className="mt-6 text-xs text-muted-foreground">Toca para ver la respuesta</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-8 shadow-lg backface-hidden rotate-y-180">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Deutsch</span>
            <p className="text-3xl font-extrabold text-primary text-center">{current[1]}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 w-full">
        <button
          onClick={() => handleAnswer(false)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 py-3.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <X className="h-4 w-4" />
          Aprendiendo
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          <Check className="h-4 w-4" />
          Conocida
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setFlipped(false);
              setCurrentIndex((i) => i - 1);
            }
          }}
          disabled={currentIndex === 0}
          className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium">{currentIndex + 1} / {total}</span>
        <button
          onClick={() => {
            if (currentIndex < total - 1) {
              setFlipped(false);
              setCurrentIndex((i) => i + 1);
            }
          }}
          disabled={currentIndex >= total - 1}
          className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardGame;
