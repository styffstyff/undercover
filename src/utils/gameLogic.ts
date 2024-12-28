import { Player, PlayerRole } from '../types/game';

export function distributeRoles(playerCount: number): PlayerRole[] {
  const roles: PlayerRole[] = [];
  const undercoverCount = Math.floor(playerCount * 0.3);
  
  // Add Mr. White
  roles.push('mrwhite');
  
  // Add Undercover Agents
  for (let i = 0; i < undercoverCount; i++) {
    roles.push('undercover');
  }
  
  // Fill remaining with civilians
  while (roles.length < playerCount) {
    roles.push('civilian');
  }
  
  // Shuffle roles
  return roles.sort(() => Math.random() - 0.5);
}

export function checkVictoryCondition(players: Player[]): PlayerRole | null {
  const alivePlayers = players.filter(p => p.isAlive);
  
  if (alivePlayers.length <= 2) {
    const hasUndercover = alivePlayers.some(p => p.role === 'undercover');
    if (hasUndercover) return 'undercover';
  }
  
  const hasCivilians = alivePlayers.some(p => p.role === 'civilian');
  const hasUndercover = alivePlayers.some(p => p.role === 'undercover');
  const hasMrWhite = alivePlayers.some(p => p.role === 'mrwhite');
  
  if (!hasUndercover && !hasMrWhite) return 'civilian';
  
  return null;
}