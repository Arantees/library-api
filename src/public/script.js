let token = "";

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

  const data = await response.json();
  token = data.token;

  document.getElementById("result").innerText =
    token ? "Login realizado com sucesso" : "Erro no login";
}

async function createLoan() {
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
