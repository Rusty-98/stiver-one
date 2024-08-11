import React, { useState } from 'react';
import Card from './Card';

function FlashcardCarousel({ flashcards }) {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((index + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIndex((index - 1 + flashcards.length) % flashcards.length);
  };

  const visibleCards = [
    flashcards[(index - 1 + flashcards.length) % flashcards.length],
    flashcards[index],
    flashcards[(index + 1) % flashcards.length],
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 transition duration-300"
        onClick={prevCard}
      >
        &lt;
      </button>

      <div className="flex items-center justify-center w-full overflow-hidden">
        <div className="flex flex-shrink-0 transition-transform duration-300 ease-in-out"
             style={{ transform: `translateX(-${index * 100}%)` }}>
          {visibleCards.map((flashcard, idx) => (
            <div
              key={idx}
              className={`flex-none w-64 h-40 mx-2 ${idx === 1 ? 'scale-110' : 'scale-90'} transition-transform duration-300 ease-in-out`}
            >
              <Card flashcard={flashcard} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
        onClick={nextCard}
      >
        &gt;
      </button>
    </div>
  );
}

export default FlashcardCarousel;
