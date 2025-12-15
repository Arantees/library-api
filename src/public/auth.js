async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    document.getElementById("error").innerText = "Login inválido";
    return;
  }

  const data = await response.json();

  // Salva token
  localStorage.setItem("token", data.token);

  // Redireciona
  window.location.href = "/loans.html";
}

function getToken() {
  return localStorage.getItem("token");
}

// Proteção da página loans.html
if (window.location.pathname.includes("loans.html")) {
  const token = getToken();

  if (!token) {
    window.location.href = "/login.html";
  }
}

async function createLoan() {
  const token = getToken();

  const userName = document.getElementById("userName").value;
  const bookTitle = document.getElementById("bookTitle").value;
  const days = document.getElementById("days").value;

  const response = await fetch("/loans", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ userName, bookTitle, days })
  });

  const data = await response.json();

  document.getElementById("result").innerText =
    JSON.stringify(data, null, 2);
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}
