import axios from 'axios';

const fetchFlashcards = async () => {
  try {
    const response = await axios.get('https://stiver-one.onrender.com/flashcards');
    return response.data; 
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error; 
  }
};

export default fetchFlashcards;
