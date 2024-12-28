import React, { useState } from 'react';

interface WordGuessModalProps {
  onGuess: (word: string) => void;
}

export function WordGuessModal({ onGuess }: WordGuessModalProps) {
  const [word, setWord] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuess(word);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-[#16213E] p-8 rounded-xl text-center max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">Mr. White</h2>
        <p className="text-lg text-white mb-4">What is the correct word?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full p-2 rounded bg-[#1A1A2E] text-white border border-[#7A4069] focus:border-[#E94560] outline-none mb-4"
            placeholder="Enter your guess..."
          />
          <button
            type="submit"
            className="bg-[#E94560] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Submit Guess
          </button>
        </form>
      </div>
    </div>
  );
}