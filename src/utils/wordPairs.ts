export async function loadWordPairs(): Promise<Array<[string, string]>> {
  try {
    // const csvPath = import.meta.env.PROD ? '/undercover/data/word-pairs.csv' : '/data/word-pairs.csv';
    const csvPath = import.meta.env.BASE_URL + 'data/word-pairs.csv';
    const response = await fetch(csvPath);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
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
  // DEBUG
  console.log('wordPairs.ts: getRandomWordPair: civilianWord', civilianWord);
  console.log('wordPairs.ts: getRandomWordPair: undercoverWord', undercoverWord);
  return {
    civilian: civilianWord,
    undercover: undercoverWord
  };
}