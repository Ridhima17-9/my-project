// Checks for Bearer token authentication
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Get token after 'Bearer'

  if (token !== 'mysecrettoken') {
    return res.status(403).json({ message: 'Invalid or missing token' });
  }

  next(); // Token is valid → allow access
}