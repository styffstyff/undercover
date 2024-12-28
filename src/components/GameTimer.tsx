import React, { useEffect, useState } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

interface GameTimerProps {
  duration: number;
  onComplete: () => void;
  phase: string;
}

export function GameTimer({ duration, onComplete, phase }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="text-center mb-6">
      <div className="text-2xl font-bold text-white">
        {phase === 'discussion' && 'Discussion Time'}
        {phase === 'voting' && 'Voting Time'}
        {phase === 'roleReveal' && 'Memorize Your Role'}
      </div>
      <div className="text-4xl font-mono text-[#E94560]">
        {timeLeft}s
      </div>
    </div>
  );
}