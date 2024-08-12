import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Dashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState({ id: '', question: '', answer: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFlashcards();
    }
  }, [isAuthenticated]);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('https://stiver-one.onrender.com/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === 'admin') {
      setIsAuthenticated(true);
      setShowPasswordPrompt(false);
    } else {
      alert('Incorrect password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCard({ ...currentCard, [name]: value });
  };

  const handleAddCard = async () => {
    try {
      await axios.post('https://stiver-one.onrender.com/flashcards', currentCard);
      fetchFlashcards();
      setCurrentCard({ id: '', question: '', answer: '' });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const handleEditCard = (card) => {
    setCurrentCard(card);
    setIsEditing(true);
  };

  const handleUpdateCard = async () => {
    try {
      await axios.put(`https://stiver-one.onrender.com/flashcards/${currentCard.id}`, currentCard);
      fetchFlashcards();
      setCurrentCard({ id: '', question: '', answer: '' });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`https://stiver-one.onrender.com/flashcards/${id}`);
      fetchFlashcards();
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const confirmDelete = (card) => {
    setCardToDelete(card);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      handleDeleteCard(cardToDelete.id);
      setShowConfirmDelete(false);
      setCardToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setCardToDelete(null);
  };

  const handleNewCardClick = () => {
    setIsEditing(false);
    setCurrentCard({ id: '', question: '', answer: '' });
  };

  return (
    <>
      {showPasswordPrompt ? (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Enter Password "admin" </h2>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="border border-gray-300 p-3 mb-4 rounded w-full"
            />
            <button onClick={handlePasswordSubmit} className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-5 md:pt-10 flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white my-8 select-none">
              Flashcard Dashboard
            </h1>
            <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Flashcard' : 'Add New Flashcard'}</h2>
              <input
                type="text"
                name="question"
                value={currentCard.question}
                onChange={handleInputChange}
                placeholder="Question"
                className="border border-gray-300 p-3 mb-3 rounded w-full"
              />
              <textarea
                name="answer"
                value={currentCard.answer}
                onChange={handleInputChange}
                placeholder="Answer"
                className="border border-gray-300 p-3 mb-4 rounded w-full"
              />
              {isEditing ? (
                <div className="flex gap-4">
                  <button onClick={handleUpdateCard} className="select-none bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">
                    Update Card
                  </button>
                  <button onClick={handleNewCardClick} className="select-none bg-green-500 text-white p-3 rounded hover:bg-green-600 transition">
                    Add New Card
                  </button>
                </div>
              ) : (
                <button onClick={handleAddCard} className="bg-green-500 select-none text-white p-3 rounded hover:bg-green-600 transition">
                  Add Card
                </button>
              )}
            </div>
            {loading ? (
              <div className="text-center text-gray-500">Loading flashcards...</div>
            ) : (
              <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Flashcards List</h2>
                {flashcards.length === 0 ? (
                  <p className="text-center text-gray-500">No flashcards available.</p>
                ) : (
                  flashcards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between border border-gray-300 p-4 mb-4 rounded-lg"
                      style={{ minHeight: '80px' }}  // Ensuring consistent height
                    >
                      <div style={{ maxWidth: '60%' }}>
                        <h3 className="text-lg font-medium text-gray-800 truncate">
                          {card.question}
                        </h3>
                        <p className="text-gray-600 truncate">
                          {card.answer}
                        </p>
                      </div>
                      <div className='w-[24%] md:w-auto flex flex-col gap-1 md:gap-0 md:flex-row'>
                        <button
                          onClick={() => handleEditCard(card)}
                          className="bg-yellow-500 text-white select-none p-2 w-full rounded md:mr-2 hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(card)}
                          className="bg-red-500 text-white p-2 w-full select-none rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {showConfirmDelete && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this flashcard?</h3>
                  <button onClick={handleConfirmDelete} className="bg-red-500 select-none text-white p-3 rounded mr-2 hover:bg-red-600 transition">
                    Yes, Delete
                  </button>
                  <button onClick={handleCancelDelete} className="bg-gray-300 select-none text-gray-700 p-3 rounded hover:bg-gray-400 transition">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
