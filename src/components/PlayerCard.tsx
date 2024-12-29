import React from 'react';
import { Player, WordPair, GameState } from '../types/game';
import { PlayerAvatar } from './PlayerAvatar';
import { WordDisplay } from './WordDisplay';

interface PlayerCardProps {
  player: Player;
  isSelectable: boolean;
  isCurrentSelector: boolean;
  onClick?: () => void;
  showRole?: boolean;
  words?: WordPair;
  currentPhase: GameState['currentPhase'];
}

export function PlayerCard({ 
  player, 
  isSelectable, 
  isCurrentSelector,
  onClick, 
  showRole = false,
  words,
  currentPhase
}: PlayerCardProps) {
  const displayName = player.selectedBy 
    ? player.name 
    : `Card ${parseInt(player.id) + 1}`;

  const shouldShowRole = () => {
    if (currentPhase === 'selection') {
      // During selection, only show Mr. White's role
      return showRole && player.role === 'mrwhite';
    } else {
      // During game, show all roles when revealed
      return showRole || player.isRevealed;
    }
  };
  return (
    <div 
      id={player.id}
      onClick={onClick}
      className={`
        relative w-full aspect-[2/3] rounded-xl 
        transition-all duration-300 transform 
        ${isCurrentSelector ? 'ring-4 ring-[#E94560]' : ''}
        ${isSelectable ? 'bg-[#16213E] hover:scale-105 cursor-pointer' : 'bg-[#16213E]'}
        ${player.isRevealed ? 'opacity-50' : ''}
      `}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <PlayerAvatar 
          role={player.role} 
          showRole={shouldShowRole()} 
        />
        <h3 className="text-white text-xl font-bold mb-2">
          {displayName}
        </h3>
        {shouldShowRole() && (
          <span className="text-[#E94560] font-medium capitalize mb-2">{player.role}</span>
        )}
        <WordDisplay 
          role={player.role} 
          words={words} 
          currentPhase={currentPhase}
          showRole={showRole}
        />
        {player.isRevealed && (
          <span className="absolute top-2 right-2 text-[#E94560] text-sm">Revealed</span>
        )}
      </div>
    </div>
  );
}