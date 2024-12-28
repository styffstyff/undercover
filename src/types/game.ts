export type PlayerRole = 'civilian' | 'undercover' | 'mrwhite';

export interface WordPair {
  civilian: string;
  undercover: string;
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  isAlive: boolean;
  isRevealed: boolean;
  selectedBy?: string;
  showRole?: boolean;
  points: number;
}

export interface GameState {
  players: Player[];
  currentPhase: 'setup' | 'selection' | 'discussion' | 'voting' | 'elimination' | 'ended' | 'word-guess';
  currentTurn: number;
  winner: PlayerRole | null;
  currentSelector?: string;
  startingPlayer: string | null;
  selectedPlayerId?: string;
  availableNames?: string[];
  currentWords?: WordPair;
}