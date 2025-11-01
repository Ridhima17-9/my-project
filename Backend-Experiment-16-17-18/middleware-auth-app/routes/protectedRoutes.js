import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Access granted to the Protected Route! Token is valid.' });
});

export default router;