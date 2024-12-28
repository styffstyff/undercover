import React from 'react';
import { Player, PlayerRole } from '../types/game';
import { Trophy, Users, UserX, User, Medal } from 'lucide-react';

interface VictoryScreenProps {
  winner: PlayerRole;
  onPlayAgain: () => void;
  players: Player[];
}

export function VictoryScreen({ winner, onPlayAgain, players }: VictoryScreenProps) {
  const roleIcons = {
    civilian: Users,
    undercover: UserX,
    mrwhite: User
  };

  const Icon = roleIcons[winner];
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-600';
      default: return 'text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-[#16213E] p-8 rounded-xl text-center max-w-md w-full">
        <Trophy className="w-16 h-16 text-[#E94560] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">
          {winner === 'civilian' && 'Civilians Win!'}
          {winner === 'undercover' && 'Undercover Agents Win!'}
          {winner === 'mrwhite' && 'Mr. White Wins!'}
        </h2>
        <Icon className="w-12 h-12 text-[#7A4069] mx-auto mb-6" />
        
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Leaderboard</h3>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div 
                key={player.id} 
                className={`flex justify-between items-center text-white p-2 rounded-lg ${
                  index === 0 ? 'bg-[#1A1A2E]' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Medal className={`w-5 h-5 ${getMedalColor(index)}`} />
                  <span>{player.name}</span>
                </div>
                <span className="font-bold">{player.points} pts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-[#E94560] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-bold"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}