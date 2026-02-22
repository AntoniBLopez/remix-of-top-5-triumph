import { useState, useRef, useEffect } from "react";
import { WordsArray } from "@/types/game";
import { Check, X, SkipForward, Send } from "lucide-react";

interface Props {
  topicWords: WordsArray[];
  onComplete: (known: string[], learning: string[]) => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];

const WritingGame = ({ topicWords, onComplete }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [learningWords, setLearningWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const total = topicWords.length;
  const current = topicWords[currentIndex];
  const correctAnswer = current[1];

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  const handleSubmit = () => {
    if (showResult || !input.trim()) return;
    const correct = normalize(input) === normalize(correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setKnownWords((prev) => [...prev, correctAnswer]);
    } else {
      setLearningWords((prev) => [...prev, correctAnswer]);
    }
  };

  const handleSkip = () => {
    setLearningWords((prev) => [...prev, correctAnswer]);
    setShowResult(true);
    setIsCorrect(false);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setInput("");
      setShowResult(false);
    } else {
      onComplete(knownWords, learningWords);
    }
  };

  const insertChar = (char: string) => {
    setInput((prev) => prev + char);
    inputRef.current?.focus();
  };

  const progress = ((knownWords.length + learningWords.length) / total) * 100;

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
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Escribe en alemán</span>
        <p className="mt-4 text-3xl font-extrabold text-foreground">{current[0]}</p>
      </div>

      {/* Input area */}
      <div className="w-full space-y-3">
        <div className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
          showResult
            ? isCorrect
              ? "border-primary bg-primary/5"
              : "border-destructive bg-destructive/5"
            : "border-border bg-card focus-within:border-primary"
        }`}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={showResult}
            placeholder="Escribe tu respuesta..."
            className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
          />
          {!showResult && (
            <button onClick={handleSubmit} disabled={!input.trim()} className="p-1.5 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-30 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          )}
          {showResult && (isCorrect ? <Check className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-destructive" />)}
        </div>

        {/* Special characters keyboard */}
        {!showResult && (
          <div className="flex flex-wrap gap-2 justify-center">
            {SPECIAL_CHARS.map((char) => (
              <button
                key={char}
                onClick={() => insertChar(char)}
                className="h-9 w-9 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                {char}
              </button>
            ))}
          </div>
        )}

        {/* Skip button */}
        {!showResult && (
          <button
            onClick={handleSkip}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <SkipForward className="h-4 w-4" />
            Saltar
          </button>
        )}
      </div>

      {/* Feedback + Next */}
      {showResult && (
        <div className="w-full animate-slide-up space-y-3" style={{ opacity: 0, animationDelay: "0s" }}>
          <div className={`rounded-xl p-4 text-center text-sm font-semibold ${
            isCorrect ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
          }`}>
            {isCorrect ? "¡Correcto! 🎉" : (
              <div>
                <p>La respuesta correcta es:</p>
                <p className="mt-1 text-lg font-extrabold">{correctAnswer}</p>
              </div>
            )}
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

export default WritingGame;
