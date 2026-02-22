import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, PenLine, Layers, Grid3X3, Zap, ChevronRight } from "lucide-react";
import { GameType, GAME_TYPE_LABELS } from "@/types/game";
import { MOCK_TOPIC_WORDS } from "@/data/mockWords";
import FlashcardGame from "@/components/games/FlashcardGame";
import MultipleChoiceGame from "@/components/games/MultipleChoiceGame";
import WritingGame from "@/components/games/WritingGame";
import MatchingGame from "@/components/games/MatchingGame";
import EndGameScreen from "@/components/games/EndGameScreen";

const GAMES: { type: GameType; icon: typeof BookOpen; desc: string; multiplier: string; color: string }[] = [
  { type: "flashcards", icon: Layers, desc: "Repasa tarjetas y marca las que conoces", multiplier: "×0.4", color: "text-accent-foreground" },
  { type: "multiplechoice", icon: Grid3X3, desc: "Elige la traducción correcta entre 4 opciones", multiplier: "×1.0", color: "text-foreground" },
  { type: "writing", icon: PenLine, desc: "Escribe la traducción correcta en alemán", multiplier: "×1.5", color: "text-primary" },
  { type: "matching", icon: BookOpen, desc: "Conecta palabras con su traducción", multiplier: "×1.2", color: "text-primary" },
];

const GamesPage = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [results, setResults] = useState<{ known: string[]; learning: string[] } | null>(null);

  const handleComplete = (known: string[], learning: string[]) => {
    setResults({ known, learning });
    setGameFinished(true);
  };

  const handleRestart = () => {
    setGameFinished(false);
    setResults(null);
  };

  const handleBack = () => {
    setActiveGame(null);
    setGameFinished(false);
    setResults(null);
  };

  // End game screen
  if (gameFinished && results && activeGame) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <EndGameScreen
          knownCount={results.known.length}
          learningCount={results.learning.length}
          topicWords={MOCK_TOPIC_WORDS}
          restart={handleRestart}
          gameType={activeGame}
          onGoHome={handleBack}
        />
      </div>
    );
  }

  // Active game
  if (activeGame) {
    return (
      <div className="min-h-screen bg-background py-8">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 max-w-md mx-auto mb-6">
          <button onClick={handleBack} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">{GAME_TYPE_LABELS[activeGame]}</h1>
        </div>

        {activeGame === "flashcards" && <FlashcardGame topicWords={MOCK_TOPIC_WORDS} onComplete={handleComplete} />}
        {activeGame === "multiplechoice" && <MultipleChoiceGame topicWords={MOCK_TOPIC_WORDS} onComplete={handleComplete} />}
        {activeGame === "writing" && <WritingGame topicWords={MOCK_TOPIC_WORDS} onComplete={handleComplete} />}
        {activeGame === "matching" && <MatchingGame topicWords={MOCK_TOPIC_WORDS} onComplete={handleComplete} />}
      </div>
    );
  }

  // Game selection hub
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Practica vocabulario</h1>
            <p className="text-sm text-muted-foreground">Elige un modo de juego</p>
          </div>
        </div>

        {/* Topic info */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tema</p>
              <p className="text-lg font-bold text-foreground mt-0.5">Vocabulario básico</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">{MOCK_TOPIC_WORDS.length} palabras</span>
            </div>
          </div>
        </div>

        {/* Game cards */}
        <div className="space-y-3">
          {GAMES.map(({ type, icon: Icon, desc, multiplier, color }) => (
            <button
              key={type}
              onClick={() => setActiveGame(type)}
              className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-md group"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground">{GAME_TYPE_LABELS[type]}</p>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground flex items-center gap-0.5">
                    <Zap className="h-2.5 w-2.5" /> {multiplier}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
