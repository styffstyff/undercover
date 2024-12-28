export const GAME_CONFIG = {
  PLAYER_LIMITS: {
    MIN: 4,
    MAX: 8
  },
  TIMERS: {
    ROLE_REVEAL: 5000,
    DISCUSSION: 60000,
    VOTING: 15000
  },
  ANIMATIONS: {
    DURATION: 300,
    PARTICLE_COUNT: 30
  },
  AUDIO: {
    VOLUME: 0.3,
    MAX_DURATION: 500
  },
  COLORS: {
    PRIMARY: '#1A1A2E',
    SECONDARY: '#16213E',
    ACCENT: '#E94560',
    HIGHLIGHT: '#7A4069'
  }
} as const;