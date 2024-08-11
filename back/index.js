import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors middleware
import pool from './DB Connection/index.js';

dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: '*', // Adjust this based on your needs. For production, specify allowed origins.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


app.get('/', (req, res) => {
    res.send('Server is running');
});


// Get all flashcards
app.get('/flashcards', (req, res) => {
    pool.query('SELECT * FROM flashcards', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Add a new flashcard
// Example route: Add a new flashcard
app.post('/flashcards', (req, res) => {
    const newCard = req.body;

    // Validate the incoming data
    if (!newCard.question || !newCard.answer) {
        return res.status(400).json({ error: 'Both question and answer are required' });
    }

    // Insert the new flashcard into the database
    pool.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [newCard.question, newCard.answer], (err) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to add flashcard' });
        }
        res.status(201).send('Flashcard added');
    });
});


// Example route: Delete a flashcard by ID
app.delete('/flashcards/:id', (req, res) => {
    const cardId = req.params.id;
    pool.query('DELETE FROM flashcards WHERE id = ?', [cardId], (err) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to delete flashcard' });
        }
        res.send('Flashcard deleted');
    });
});

// Example route: Update a flashcard by ID
app.put('/flashcards/:id', (req, res) => {
    const cardId = req.params.id;
    const updatedCard = req.body;

    // Validate the incoming data
    if (!updatedCard.question || !updatedCard.answer) {
        return res.status(400).json({ error: 'Both question and answer are required' });
    }

    // Update the flashcard in the database
    pool.query('UPDATE flashcards SET ? WHERE id = ?', [updatedCard, cardId], (err) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to update flashcard' });
        }
        res.send('Flashcard updated');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Error ending MySQL connection pool:', err.stack);
        }
        console.log('MySQL connection pool closed.');
        process.exit(0);
    });
});
