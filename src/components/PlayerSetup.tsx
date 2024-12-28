import React, { useState } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

interface PlayerSetupProps {
  onStart: (playerCount: number, playerNames: string[]) => void;
}

export function PlayerSetup({ onStart }: PlayerSetupProps) {
  const [playerCount, setPlayerCount] = useState(GAME_CONFIG.PLAYER_LIMITS.MIN);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const names = Array.from({ length: playerCount }, (_, i) => 
      playerNames[i] || `Player ${i + 1}`
    );
    onStart(playerCount, names);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#16213E] rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Game Setup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-white mb-2">Number of Players</label>
          <input
            type="range"
            min={GAME_CONFIG.PLAYER_LIMITS.MIN}
            max={GAME_CONFIG.PLAYER_LIMITS.MAX}
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="w-full mb-2"
          />
          <span className="text-white">{playerCount} players</span>
        </div>

        <div className="space-y-4 mb-6">
          {Array.from({ length: playerCount }).map((_, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Player ${index + 1} name`}
                value={playerNames[index] || ''}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="w-full p-2 rounded bg-[#1A1A2E] text-white border border-[#7A4069] focus:border-[#E94560] outline-none"
              />
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#E94560] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}