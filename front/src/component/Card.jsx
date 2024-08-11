import React from 'react';
import '../styles/card.css';

const Card = ({ flashcard, flipped }) => {
  return (
    <div
      className={`my-10 h-[50vh] w-[70vw] md:w-[50vw] border border-gray-600 rounded-[30px] shadow-xl cursor-pointer transform transition-transform duration-500 hover:scale-105`}
    >
      <div className="card-container">
        <div
          className="card-inner"
          style={{
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.7s ease-in-out',
          }}
        >
          <div
            className="card-front animated-gradient flex flex-col items-start justify-start"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h2 className="text-left">Question:</h2>
            <h2 className=''>{flashcard.question}</h2>
          </div>
          <div
            className="card-back flex flex-col items-start justify-start"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <h2 className="text-left">Answer:</h2>
            <h2 className=''>{flashcard.answer}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
