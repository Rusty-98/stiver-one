import axios from 'axios';

const fetchFlashcards = async () => {
  try {
    const response = await axios.get('http://localhost:3001/flashcards'); // Adjust the URL if needed
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error; // Optionally, handle errors more gracefully
  }
};

export default fetchFlashcards;
