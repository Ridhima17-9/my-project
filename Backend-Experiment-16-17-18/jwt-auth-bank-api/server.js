import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { verifyToken } from './middleware/auth.js';

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'bank_secret_key';

// Hardcoded user and account data
const user = { username: 'admin', password: '12345' };
let balance = 1000;

// 🔐 Login route to generate token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// 💰 Protected routes
app.get('/balance', verifyToken, (req, res) => {
    res.json({ balance });
});

app.post('/deposit', verifyToken, (req, res) => {
    const { amount } = req.body;

    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    balance += amount;
    res.json({ message: `Deposited ₹${amount}`, newBalance: balance });
});

app.post('/withdraw', verifyToken, (req, res) => {
    const { amount } = req.body;

    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    if (amount > balance) return res.status(400).json({ message: 'Insufficient balance' });

    balance -= amount;
    res.json({ message: `Withdrawn ₹${amount}`, newBalance: balance });
});

app.listen(3000, () => console.log('🚀 JWT Banking API running on http://localhost:3000'));
