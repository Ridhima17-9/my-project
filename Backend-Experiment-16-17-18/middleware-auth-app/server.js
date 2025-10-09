import express from 'express';
import { logger } from './middleware/logger.js';
import { authenticateToken } from './middleware/auth.js';
import publicRoute from './routes/publicRoute.js';
import protectedRoute from './routes/protectedRoute.js';

const app = express();
const PORT = 5000;

// Global logging middleware
app.use(logger);

// Public route (no token required)
app.use('/public', publicRoute);

// Protected route (token required)
app.use('/protected', authenticateToken, protectedRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
