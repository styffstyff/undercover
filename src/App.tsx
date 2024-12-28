import React from 'react';
import { GameBoard } from './components/GameBoard';
import { PlayerSetup } from './components/PlayerSetup';
import { VictoryScreen } from './components/VictoryScreen';
import { useGameState } from './hooks/useGameState';
import { useAudio } from './hooks/useAudio';

export default function App() {
  const { gameState, startGame, restartGame, selectCard, eliminatePlayer, handleWordGuess, setGameState, showSelectionMessage } = useGameState();
  const { playSound } = useAudio();

  const handlePlayAgain = () => {
    restartGame();
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <header className="bg-[#16213E] py-4 px-8 mb-8">
        <h1 className="text-3xl font-bold text-white text-center">Hidden Roles</h1>
      </header>

      {gameState.currentPhase === 'setup' && (
        <PlayerSetup onStart={startGame} />
      )}

      {(gameState.currentPhase === 'selection' || 
        gameState.currentPhase === 'discussion' || 
        gameState.currentPhase === 'voting' || 
        gameState.currentPhase === 'elimination' ||
        gameState.currentPhase === 'word-guess') && (
        <GameBoard 
          gameState={gameState}
          onEliminate={eliminatePlayer}
          onPhaseChange={(phase) => setGameState(prev => ({ ...prev, currentPhase: phase }))}
          onCardSelect={selectCard}
          onWordGuess={handleWordGuess}
          playSound={playSound}
          showSelectionMessage={showSelectionMessage}
          availableNames={gameState.availableNames}
        />
      )}

      {gameState.winner && (
        <VictoryScreen 
          winner={gameState.winner} 
          onPlayAgain={handlePlayAgain} 
          players={gameState.players}
        />
      )}
    </div>
  );
}