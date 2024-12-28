import React from 'react';
import { Shield, User, UserX, HelpCircle } from 'lucide-react';
import { PlayerRole } from '../types/game';

interface PlayerAvatarProps {
  role?: PlayerRole;
  showRole: boolean;
}

export function PlayerAvatar({ role, showRole }: PlayerAvatarProps) {
  const roleIcons = {
    civilian: Shield,
    undercover: UserX,
    mrwhite: User,
  };
  
  const Icon = showRole && role ? roleIcons[role] : HelpCircle;
  
  return (
    <div className="w-20 h-20 rounded-full bg-[#7A4069] flex items-center justify-center mb-4">
      <Icon className="w-10 h-10 text-white" />
    </div>
  );
}