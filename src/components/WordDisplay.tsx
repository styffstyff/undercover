import React from 'react';
import { PlayerRole, GameState } from '../types/game';

interface WordDisplayProps {
  role: PlayerRole;
  words?: { civilian: string; undercover: string };
  currentPhase: GameState['currentPhase'];
  showRole: boolean;
}

export function WordDisplay({ role, words, currentPhase, showRole }: WordDisplayProps) {  
  if (!words || !showRole) {
    return null;
  }

  // Only show words during selection phase
  if (currentPhase !== 'selection') {
    return null;
  }

  // Mr. White doesn't see any word
  if (role === 'mrwhite') {
    return null;
  }

  const word = role === 'civilian' ? words.civilian : words.undercover;
  //DEBUG
  console.log('WordDisplay.tsx: word', word);
  console.log('WordDisplay.tsx: role', role);
  return (
    <div className="text-center mb-4">
      <p className="text-lg font-semibold text-white">Your word:</p>
      <p className="text-2xl font-bold text-[#E94560]">{word}</p>
    </div>
  );
}