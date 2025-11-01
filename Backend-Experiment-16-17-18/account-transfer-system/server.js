import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Account } from '/models/Account.js';

const app = express();
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Transfer money endpoint
app.post('/transfer', async (req, res) => {
    const { sender, receiver, amount } = req.body;

    if (amount <= 0) return res.status(400).json({ message: 'Invalid transfer amount' });

    try {
        const senderAcc = await Account.findOne({ username: sender });
        const receiverAcc = await Account.findOne({ username: receiver });

        if (!senderAcc || !receiverAcc)
            return res.status(404).json({ message: 'Sender or receiver not found' });

        if (senderAcc.balance < amount)
            return res.status(400).json({ message: 'Insufficient balance' });

        // Sequential updates (not atomic)
        senderAcc.balance -= amount;
        receiverAcc.balance += amount;

        await senderAcc.save();
        await receiverAcc.save();

        res.json({
            message: `₹${amount} transferred from ${sender} to ${receiver}`,
            senderBalance: senderAcc.balance,
            receiverBalance: receiverAcc.balance
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create test accounts
app.post('/create', async (req, res) => {
    const { username, balance } = req.body;
    try {
        const account = new Account({ username, balance });
        await account.save();
        res.json({ message: 'Account created successfully', account });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(4000, () => console.log('🚀 Account Transfer API running on http://localhost:4000'));
