let users = [];
let nextId = 1;

function createUser({ name, email, role }) {
  const user = {
    id: nextId++,
    name,
    email,
    role,
    createdAt: new Date(),
  };

  users.push(user);
  return user;
}

function findUserById(id) {
  return users.find((u) => u.id === Number(id));
}

function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

function findUserById(id) {
  return users.find((u) => u.id === Number(id));
}

function listUsers() {
  return users;
}


module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  listUsers,
};
