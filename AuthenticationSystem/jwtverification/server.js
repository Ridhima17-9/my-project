 const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = 'mysecretkey';
const sampleUser = { username: 'ridhima', password: '12345' };

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === sampleUser.username && password === sampleUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });
    req.user = user;
    next();
  });
}

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you accessed a protected route!` });
});

app.listen(3001, () => console.log('JWT server running on port 3001'));

