const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123456';
const JWT_SECRET = 'secret_key';

function login(req, res) {
  console.log('REQ BODY:', req.body);
  const body = req.body || {};

  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '').trim();

  console.log('EMAIL:', email);
  console.log('PASSWORD:', password);

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'ADMIN' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token });
}

module.exports = {
  login
};
