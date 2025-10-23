 const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = 'mysecretkey';

const users = [
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'moderator', password: 'mod123', role: 'Moderator' },
  { username: 'user', password: 'user123', role: 'User' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

function verifyRole(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token missing' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token invalid' });
      if (user.role !== requiredRole) return res.status(403).json({ message: 'Access denied: insufficient role' });
      req.user = user;
      next();
    });
  };
}

app.get('/admin', verifyRole('Admin'), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.username}` });
});

app.get('/moderator', verifyRole('Moderator'), (req, res) => {
  res.json({ message: `Welcome Moderator ${req.user.username}` });
});

app.get('/user', verifyRole('User'), (req, res) => {
  res.json({ message: `Welcome User ${req.user.username}` });
});

app.listen(3002, () => console.log('RBAC server running on port 3002'));

