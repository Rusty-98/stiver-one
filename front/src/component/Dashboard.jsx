import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState({ id: '', question: '', answer: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const response = await axios.get('http://localhost:5000/api/flashcards');
    setFlashcards(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCard({ ...currentCard, [name]: value });
  };

  const handleAddCard = async () => {
    await axios.post('http://localhost:5000/api/flashcards', currentCard);
    fetchFlashcards();
    setCurrentCard({ id: '', question: '', answer: '' });
  };

  const handleEditCard = (card) => {
    setCurrentCard(card);
    setIsEditing(true);
  };

  const handleUpdateCard = async () => {
    await axios.put(`http://localhost:5000/api/flashcards/${currentCard.id}`, currentCard);
    fetchFlashcards();
    setCurrentCard({ id: '', question: '', answer: '' });
    setIsEditing(false);
  };

  const handleDeleteCard = async (id) => {
    await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
    fetchFlashcards();
  };

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Flashcard Dashboard</h1>
      <div className="form">
        <input
          type="text"
          name="question"
          value={currentCard.question}
          onChange={handleInputChange}
          placeholder="Question"
          className="border p-2 mb-2"
        />
        <textarea
          name="answer"
          value={currentCard.answer}
          onChange={handleInputChange}
          placeholder="Answer"
          className="border p-2 mb-2"
        />
        {isEditing ? (
          <button onClick={handleUpdateCard} className="bg-blue-500 text-white p-2 rounded">
            Update Card
          </button>
        ) : (
          <button onClick={handleAddCard} className="bg-green-500 text-white p-2 rounded">
            Add Card
          </button>
        )}
      </div>
      <div className="flashcard-list mt-4">
        {flashcards.map((card) => (
          <div key={card.id} className="flashcard border p-4 mb-2 rounded">
            <h3 className="text-lg font-bold">{card.question}</h3>
            <p>{card.answer}</p>
            <button onClick={() => handleEditCard(card)} className="bg-yellow-500 text-white p-1 rounded mr-2">
              Edit
            </button>
            <button onClick={() => handleDeleteCard(card.id)} className="bg-red-500 text-white p-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
