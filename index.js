const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let cards = [];
let nextId = 1;

// Get all cards
app.get('/cards', (req, res) => {
    res.json(cards);
});

// Add a new card
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;
    if (!suit || !value) return res.status(400).json({ error: "Suit and value required" });
    const newCard = { id: nextId++, suit, value };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// Get a card by ID
app.get('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const card = cards.find(c => c.id === cardId);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
});

// Delete a card by ID
app.delete('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === cardId);
    if (index === -1) return res.status(404).json({ error: "Card not found" });
    const removed = cards.splice(index, 1);
    res.json({ message: "Card deleted", card: removed[0] });
});

app.listen(port, () => {
    console.log(`Playing Cards API running at http://localhost:${port}`);
});
