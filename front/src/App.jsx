import React, { useState, useEffect, useMemo } from 'react';
import CardCarousel from './component/CardCarousel';
import Navbar from './component/Navbar';
import fetchFlashcards from './Data.js';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFlashcards = async () => {
      try {
        const data = await fetchFlashcards(); // Fetch data from the API
        setFlashcards(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flashcards');
        setLoading(false);
      }
    };

    getFlashcards();
  }, []);

  // Memoize the CardCarousel to prevent unnecessary re-renders
  const memoizedCardCarousel = useMemo(() => {
    return <CardCarousel flashcards={flashcards} />;
  }, [flashcards]);

  if (loading) return (
    <>
      <Navbar />
      <div className="App min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-5 md:pt-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white my-8">
          Flashcard Learning
        </h1>
        <div className='w-full overflow-hidden flex items-center justify-center'>
          Loading...
        </div>
      </div>
    </>
  );

  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="App min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-5 md:pt-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white my-8">
          Flashcard Learning
        </h1>
        <div className='w-full overflow-hidden'>
          {memoizedCardCarousel}
        </div>
      </div>
    </>
  );
}

export default App;
