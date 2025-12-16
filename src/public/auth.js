
let selectedUserId = null;

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    document.getElementById("error").innerText = "Login inválido";
    return;
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);

  window.location.href = "/loans.html";
}

function getToken() {
  return localStorage.getItem("token");
}

if (window.location.pathname.includes("loans.html")) {
  const token = getToken();

  if (!token) {
    window.location.href = "/login.html";
  }
}

async function createLoan() {
  if (!selectedUserId) {
    alert("Crie um usuário antes de fazer um empréstimo");
    return;
  }

  const token = getToken();
  const bookTitle = document.getElementById("bookTitle").value;
  const days = document.getElementById("days").value;

  const response = await fetch("/loans", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: selectedUserId,
      bookTitle,
      days,
    }),
  });

  const data = await response.json();

  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}

async function createUser() {
  const name = document.getElementById("userNameCreate").value;
  const email = document.getElementById("userEmailCreate").value;

  if (!name || !email) {
    alert("Preencha nome e email");
    return;
  }

  const response = await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    alert("Erro ao criar usuário");
    return;
  }

  const data = await response.json();

  selectedUserId = data.id;

  document.getElementById(
    "selectedUser"
  ).innerText = `${data.name} (ID: ${data.id})`;

  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}