export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function calculatePlayerPosition(
  index: number,
  totalPlayers: number,
  radius: number
): { x: number; y: number } {
  const angle = (index * 2 * Math.PI) / totalPlayers - Math.PI / 2;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}

export function createParticleEffect(
  x: number,
  y: number,
  color: string,
  container: HTMLElement
) {
  const particle = document.createElement('div');
  particle.className = 'absolute w-2 h-2 rounded-full transform scale-0 opacity-0';
  particle.style.backgroundColor = color;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  container.appendChild(particle);
  
  requestAnimationFrame(() => {
    particle.style.transition = 'all 0.5s ease-out';
    particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${
      Math.random() * 100 - 50
    }px) scale(1)`;
    particle.style.opacity = '1';
  });
  
  setTimeout(() => {
    particle.remove();
  }, 500);
}