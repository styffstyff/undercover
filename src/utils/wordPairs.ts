export async function loadWordPairs(): Promise<Array<[string, string]>> {
  try {
    const response = await fetch('/src/data/word-pairs.csv');
    const text = await response.text();
    return text
      .trim()
      .split('\n')
      .map(line => line.split(',') as [string, string]);
  } catch (error) {
    console.error('Error loading word pairs:', error);
    return [];
  }
}

export function getRandomWordPair(pairs: Array<[string, string]>): { civilian: string; undercover: string } {
  const randomIndex = Math.floor(Math.random() * pairs.length);
  const [civilianWord, undercoverWord] = pairs[randomIndex];
  return {
    civilian: civilianWord,
    undercover: undercoverWord
  };
}