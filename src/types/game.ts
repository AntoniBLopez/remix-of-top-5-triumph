export type WordsArray = [string, string]; // [Español, Alemán]

export type GameType = 'writing' | 'multiplechoice' | 'matching' | 'flashcards';

export interface SessionResult {
  xpEarned: number;
  knownCount: number;
  learningCount: number;
  totalWords: number;
  durationSeconds: number;
  gameType: GameType;
}

export interface GameProps {
  topicWords: WordsArray[];
  onSessionComplete?: (knownWords: string[], learningWords: string[]) => void;
  onProgressChange?: (knownWords: string[], learningWords: string[]) => void;
  sessionResult?: SessionResult | null;
  level?: string;
  topic?: string;
  gameType?: GameType;
}

export interface EndGameScreenProps {
  knownCount: number;
  learningCount: number;
  topicWords: WordsArray[];
  restart: () => void;
  sessionResult?: SessionResult | null;
  level?: string;
  topic?: string;
  gameType?: GameType;
  onGoHome?: () => void;
}

export const GAME_TYPE_XP_MULTIPLIER: Record<GameType, number> = {
  writing: 1.5,
  matching: 1.2,
  multiplechoice: 1.0,
  flashcards: 0.4,
};

export const GAME_TYPE_LABELS: Record<GameType, string> = {
  flashcards: 'Flashcards',
  multiplechoice: 'Multiple Choice',
  writing: 'Writing',
  matching: 'Matching',
};
