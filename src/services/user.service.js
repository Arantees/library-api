let users = [];
let nextId = 1;

function createUser({ name, email, role }) {
  const user = {
    id: nextId++,
    name,
    email,
    role,
    createdAt: new Date()
  };

  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

module.exports = {
  createUser,
  findUserByEmail
};
