import { useCallback, useEffect, useRef } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

const AUDIO_PATHS = {
  cardSelect: '/sounds/card-select.mp3',
  roleReveal: '/sounds/role-reveal.mp3',
  eliminate: '/sounds/eliminate.mp3',
  victory: '/sounds/victory.mp3',
  defeat: '/sounds/defeat.mp3'
} as const;

type SoundEffect = keyof typeof AUDIO_PATHS;

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = GAME_CONFIG.AUDIO.VOLUME;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playSound = useCallback((effect: SoundEffect) => {
    if (audioRef.current) {
      audioRef.current.src = AUDIO_PATHS[effect];
      audioRef.current.play();
    }
  }, []);

  return { playSound };
}