import { useState, useEffect } from 'react';
import { GameState, Player, PlayerRole } from '../types/game';
import { distributeRoles, checkVictoryCondition } from '../utils/gameLogic';
import { loadWordPairs, getRandomWordPair } from '../utils/wordPairs';

const POINTS = {
  civilian: 2,
  undercover: 8,
  mrwhite: 6
} as const;

const TIMERS = {
  CARD_REVEAL: 4500, // 5 seconds to see your card
  DISCUSSION_DELAY: 1000 // 1 seconds before discussion starts
} as const;

const initialGameState: GameState = {
  players: [],
  currentPhase: 'setup',
  currentTurn: 0,
  winner: null,
  startingPlayer: null,
  selectedPlayerId: undefined,
  availableNames: []
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [showSelectionMessage, setShowSelectionMessage] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateWinnerPoints = (players: Player[], winner: PlayerRole): Player[] => {
    return players.map(player => ({
      ...player,
      points: player.role === winner ? player.points + POINTS[winner] : player.points
    }));
  };

  const startGame = async (playerCount: number, playerNames: string[]) => {
    const roles = distributeRoles(playerCount);
    const wordPairs = await loadWordPairs();
    const currentWords = getRandomWordPair(wordPairs);
    
    const players: Player[] = roles.map((role, index) => ({
      id: index.toString(),
      name: playerNames[index],
      role,
      isAlive: true,
      isRevealed: false,
      showRole: false,
      selectedBy: undefined,
      points: gameState.players[index]?.points || 0
    }));

    setGameState({
      ...initialGameState,
      players,
      currentPhase: 'selection',
      currentSelector: '0',
      availableNames: playerNames,
      currentWords
    });
    setShowSelectionMessage(true);
  };

  const restartGame = async () => {
    const currentPlayers = gameState.players;
    const roles = distributeRoles(currentPlayers.length);
    const previousNames = gameState.availableNames || [];
    
    const wordPairs = await loadWordPairs();
    const currentWords = getRandomWordPair(wordPairs);
    
    const players = currentPlayers.map((player, index) => ({
      ...player,
      role: roles[index],
      isAlive: true,
      isRevealed: false,
      showRole: false,
      selectedBy: undefined
    }));

    setGameState({
      ...initialGameState,
      players,
      currentPhase: 'selection',
      currentSelector: '0',
      availableNames: previousNames,
      currentWords
    });
    setShowSelectionMessage(true);
  };

  const selectCard = (cardId: string) => {
    if (!gameState.currentSelector) return;

    setShowSelectionMessage(false);
    
    setGameState(prev => {
      const currentSelectorIndex = parseInt(prev.currentSelector!);
      const selectorName = prev.availableNames?.[currentSelectorIndex] || '';
      const nextSelectorIndex = currentSelectorIndex + 1;
      const allSelected = nextSelectorIndex >= prev.players.length;

      const updatedPlayers = prev.players.map(player => ({
        ...player,
        showRole: player.id === cardId,
        selectedBy: player.id === cardId ? selectorName : player.selectedBy,
        name: player.id === cardId ? selectorName : player.name
      }));

      const nextState = {
        ...prev,
        players: updatedPlayers,
        currentSelector: allSelected ? undefined : nextSelectorIndex.toString(),
        currentPhase: allSelected ? 'selection' : 'selection', // Keep in selection phase during reveal
        startingPlayer: allSelected ? 
        prev.players
          .filter(player => player.role !== 'mrwhite') // Exclude Mr White
          .map(player => player.name)[Math.floor(Math.random() * prev.players.filter(player => player.role !== 'mrwhite').length)] : null      
      };

      // Hide role after CARD_REVEAL duration
      setTimeout(() => {
        setGameState(current => ({
          ...current,
          players: current.players.map(p => ({
            ...p,
            showRole: false
          }))
        }));
        
        if (!allSelected) {
          setShowSelectionMessage(true);
        } else {
          // Add delay before starting discussion phase
          setTimeout(() => {
            setGameState(current => ({
              ...current,
              currentPhase: 'discussion'
            }));
          }, TIMERS.DISCUSSION_DELAY);
        }
      }, TIMERS.CARD_REVEAL);

      return nextState;
    });
  };

  const eliminatePlayer = (playerId: string) => {
    setGameState(prev => {
      const player = prev.players.find(p => p.id === playerId);
      if (!player) return prev;

      if (player.role === 'mrwhite') {
        return {
          ...prev,
          currentPhase: 'word-guess',
          selectedPlayerId: playerId,
          players: prev.players.map(p => ({
            ...p,
            isRevealed: p.id === playerId ? true : p.isRevealed
          }))
        };
      }

      const updatedPlayers = prev.players.map(p => ({
        ...p,
        isAlive: p.id === playerId ? false : p.isAlive,
        isRevealed: p.id === playerId ? true : p.isRevealed
      }));

      const winner = checkVictoryCondition(updatedPlayers);
      if (winner) {
        const winningPlayers = updateWinnerPoints(updatedPlayers, winner);
        return {
          ...prev,
          players: winningPlayers,
          winner,
          currentPhase: 'ended'
        };
      }

      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  const handleWordGuess = (word: string) => {
    setGameState(prev => {
      const isCorrect = prev.currentWords?.civilian.toLowerCase() === word.toLowerCase();
      const player = prev.players.find(p => p.id === prev.selectedPlayerId);
      
      if (!player) return prev;

      const updatedPlayers = prev.players.map(p => ({
        ...p,
        isAlive: p.id === prev.selectedPlayerId ? isCorrect : p.isAlive
      }));

      const winner = isCorrect ? 'mrwhite' : checkVictoryCondition(updatedPlayers);

      if (winner) {
        const finalPlayers = updateWinnerPoints(updatedPlayers, winner);
        return {
          ...prev,
          players: finalPlayers,
          winner,
          currentPhase: 'ended'
        };
      }

      return {
        ...prev,
        players: updatedPlayers,
        currentPhase: 'discussion'
      };
    });
  };

  return {
    gameState,
    startGame,
    restartGame,
    selectCard,
    eliminatePlayer,
    handleWordGuess,
    setGameState,
    showSelectionMessage
  };
}