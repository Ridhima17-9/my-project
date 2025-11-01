import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Public Route! No authentication required.' });
});

export default router;