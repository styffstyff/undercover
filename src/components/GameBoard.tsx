import React from 'react';
import { GameState } from '../types/game';
import { PlayerCard } from './PlayerCard';
import { GamePhaseMessage } from './GamePhaseMessage';
import { checkVictoryCondition } from '../utils/gameLogic';
import { GAME_CONFIG } from '../constants/gameConfig';
import { createParticleEffect } from '../utils/helpers';
import { WordGuessModal } from './WordGuessModal';

interface GameBoardProps {
  gameState: GameState;
  onEliminate: (playerId: string) => void;
  onPhaseChange: (phase: GameState['currentPhase']) => void;
  onCardSelect: (cardId: string) => void;
  onWordGuess: (word: string) => void;
  playSound: (effect: 'cardSelect' | 'roleReveal' | 'eliminate' | 'victory' | 'defeat') => void;
  showSelectionMessage: boolean;
  availableNames?: string[];
}

export function GameBoard({ 
  gameState, 
  onEliminate, 
  onPhaseChange, 
  onCardSelect,
  onWordGuess,
  playSound,
  showSelectionMessage,
  availableNames
}: GameBoardProps) {
  const handlePlayerClick = (playerId: string) => {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    if (gameState.currentPhase === 'selection') {
      if (!player.selectedBy) {
        playSound('cardSelect');
        onCardSelect(playerId);
      }
      return;
    }
    
    if (gameState.currentPhase === 'discussion' && !player.isRevealed) {
      playSound('eliminate');
      onEliminate(playerId);
      
      const playerElement = document.getElementById(playerId);
      if (playerElement) {
        const rect = playerElement.getBoundingClientRect();
        createParticleEffect(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          GAME_CONFIG.COLORS.ACCENT,
          document.body
        );
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gameState.players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isSelectable={
              (gameState.currentPhase === 'selection' && !player.selectedBy) || 
              (gameState.currentPhase === 'discussion' && !player.isRevealed)
            }
            isCurrentSelector={player.id === gameState.currentSelector}
            onClick={() => handlePlayerClick(player.id)}
            showRole={player.showRole || player.isRevealed}
            words={gameState.currentWords}
            currentPhase={gameState.currentPhase}
          />
        ))}
      </div>

      {(showSelectionMessage || gameState.startingPlayer) && (
        <GamePhaseMessage 
          phase={gameState.currentPhase}
          currentSelector={gameState.currentSelector}
          players={gameState.players}
          startingPlayer={gameState.startingPlayer}
          availableNames={availableNames}
        />
      )}

      {gameState.currentPhase === 'word-guess' && (
        <WordGuessModal onGuess={onWordGuess} />
      )}
    </div>
  );
}