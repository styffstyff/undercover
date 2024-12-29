import React, { useState } from 'react';
import { GameState } from '../types/game';

interface ResetGameProps {
  onResetGame: () => void;
  phase: GameState['currentPhase'];
  className?: string;
}

const ResetGame: React.FC<ResetGameProps> = ({ 
    onResetGame, 
    phase,
    className }) => {
  if (phase === 'setup') {
    return null;
  }

  return (
    <button 
      className="mt-4 bg-[#E94560] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
      Reset
    </button>
  );
}

export default ResetGame;