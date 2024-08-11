import React from 'react';
import flashcards from './Data';
import CardCarousel from './component/CardCarousel';
import Navbar from './component/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="App min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-5 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white my-8">
          Flashcard Learning Tool
        </h1>
        <div className='w-full overflow-hidden'>
          <CardCarousel flashcards={flashcards} />
        </div>
        
      </div>
    </>
  );
}

export default App;
