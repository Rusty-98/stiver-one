import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { register } from "swiper/element/bundle";
import "swiper/css/effect-cards";
import { EffectCards, Navigation } from "swiper/modules";
import Card from './Card.jsx';

register();

const CardCarousel = ({ flashcards }) => {
  const swiperRef = useRef(null);
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const isMultipleImages = flashcards.length > 1;

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", position: 'relative' }}>
        <Swiper
          ref={swiperRef}
          style={{
            height: "auto",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          effect="cards"
          modules={[EffectCards, Navigation]}
          loop={isMultipleImages}
          speed={500}
          simulateTouch={true}
          initialSlide={2}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
        >
          {flashcards.map((card, index) => (
            <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Card
                flashcard={card}
                flipped={flippedIndex === index}
                onFlip={() => handleFlip(index)}
              />
            </SwiperSlide>
          ))}
          {/* Navigation Buttons */}
          <div className="swiper-button-next" style={{ color: 'white', fontSize: '24px' }}></div>
          <div className="swiper-button-prev" style={{ color: 'white', fontSize: '24px' }}></div>
        </Swiper>
      </div>
      <div className="mt-8 flex space-x-4 items-center justify-center">
        <button
          onClick={() => handleFlip(swiperRef.current.swiper.realIndex)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-2 px-4 rounded"
        >
          Reveal Answer
        </button>
      </div>
    </>
  );
};

export default CardCarousel;
