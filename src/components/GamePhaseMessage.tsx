import React, { useEffect, useState } from 'react';
import { GameState } from '../types/game';

interface GamePhaseMessageProps {
  phase: GameState['currentPhase'];
  currentSelector?: string;
  players: GameState['players'];
  startingPlayer: string | null;
  onConfirm?: () => void;
  availableNames?: string[];
}

export function GamePhaseMessage({ 
  phase, 
  currentSelector, 
  players, 
  startingPlayer, 
  onConfirm,
  availableNames = []
}: GamePhaseMessageProps) {
  const [showModal, setShowModal] = useState(true);
  
  useEffect(() => {
    if (currentSelector !== undefined || startingPlayer) {
      setShowModal(true);
    }
  }, [currentSelector, startingPlayer]);
  
  const selectorName = currentSelector !== undefined
    ? availableNames[parseInt(currentSelector)]
    : '';

  if (phase === 'selection' && currentSelector !== undefined && showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#16213E] text-white text-center p-6 rounded-lg shadow-xl animate-fade-in">
          <p className="text-2xl mb-2">Role Selection Phase</p>
          <p className="text-lg">
            {`${selectorName}, select your card!`}
          </p>
          <button 
            onClick={() => {
              setShowModal(false);
              if (onConfirm) onConfirm();
            }} 
            className="mt-4 bg-[#E94560] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'discussion' && startingPlayer && showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#16213E] text-white text-center p-6 rounded-lg shadow-xl animate-fade-in">
          <p className="text-2xl mb-2">Discussion Phase</p>
          <p className="text-lg">{startingPlayer} starts the discussion!</p>
          <button 
            onClick={() => setShowModal(false)} 
            className="mt-4 bg-[#E94560] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'voting' && showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#16213E] text-white text-center p-6 rounded-lg shadow-xl animate-fade-in">
          <p className="text-2xl">Vote to eliminate a player!</p>
          <button 
            onClick={() => setShowModal(false)} 
            className="mt-4 bg-[#E94560] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return null;
}