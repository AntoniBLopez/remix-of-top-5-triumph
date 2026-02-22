import { useState, useEffect, useMemo } from "react";
import { WordsArray } from "@/types/game";
import { Check, X } from "lucide-react";

interface Props {
  topicWords: WordsArray[];
  onComplete: (known: string[], learning: string[]) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MultipleChoiceGame = ({ topicWords, onComplete }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [learningWords, setLearningWords] = useState<string[]>([]);

  const total = topicWords.length;
  const current = topicWords[currentIndex];
  const correctAnswer = current[1];

  const options = useMemo(() => {
    const distractors = topicWords
      .filter((_, i) => i !== currentIndex)
      .map((w) => w[1]);
    const shuffled = shuffleArray(distractors).slice(0, 3);
    return shuffleArray([correctAnswer, ...shuffled]);
  }, [currentIndex, topicWords, correctAnswer]);

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);

    const isCorrect = option === correctAnswer;
    if (isCorrect) {
      setKnownWords((prev) => [...prev, correctAnswer]);
    } else {
      setLearningWords((prev) => [...prev, correctAnswer]);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      onComplete(knownWords, learningWords);
    }
  };

  const progress = ((knownWords.length + learningWords.length) / total) * 100;

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return "border-border bg-card hover:border-primary/40 hover:bg-primary/5";
    }
    if (option === correctAnswer) {
      return "border-primary bg-primary/10 text-primary";
    }
    if (option === selected && option !== correctAnswer) {
      return "border-destructive bg-destructive/10 text-destructive";
    }
    return "border-border bg-card opacity-50";
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto px-4">
      {/* Progress */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          <span>{knownWords.length + learningWords.length}/{total}</span>
          <span>
            <Check className="inline h-3.5 w-3.5 text-primary mr-0.5" />
            {knownWords.length}
            <X className="inline h-3.5 w-3.5 text-destructive ml-2 mr-0.5" />
            {learningWords.length}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="w-full rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Traduce al alemán</span>
        <p className="mt-4 text-3xl font-extrabold text-foreground">{current[0]}</p>
      </div>

      {/* Options */}
      <div className="w-full grid grid-cols-1 gap-3">
        {options.map((option, i) => (
          <button
            key={`${currentIndex}-${i}`}
            onClick={() => handleSelect(option)}
            disabled={showResult}
            className={`flex items-center justify-between rounded-xl border-2 px-5 py-4 text-left text-sm font-semibold transition-all ${getOptionStyle(option)}`}
          >
            <span>{option}</span>
            {showResult && option === correctAnswer && <Check className="h-5 w-5 text-primary" />}
            {showResult && option === selected && option !== correctAnswer && <X className="h-5 w-5 text-destructive" />}
          </button>
        ))}
      </div>

      {/* Feedback + Next */}
      {showResult && (
        <div className="w-full animate-slide-up" style={{ opacity: 0, animationDelay: "0s" }}>
          <div className={`rounded-xl p-4 text-center text-sm font-semibold mb-3 ${
            selected === correctAnswer
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          }`}>
            {selected === correctAnswer ? "¡Correcto! 🎉" : `Incorrecto. La respuesta es: ${correctAnswer}`}
          </div>
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            {currentIndex < total - 1 ? "Siguiente" : "Ver resultados"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceGame;
