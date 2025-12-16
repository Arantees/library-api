let selectedUserId = null;
let selectedLoanId = null;

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
  const bookTitle = document.getElementById("bookTitle").value.trim();
  const days = Number(document.getElementById("days").value);

  if (!bookTitle) {
    alert("Informe o nome do livro");
    return;
  }

  if (!days || days <= 0) {
    alert("Informe uma quantidade válida de dias");
    return;
  }

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
  const loan = await response.json();

  if (!response.ok) {
    alert(loan.message || "Erro ao criar empréstimo");
    return;
  }

  await loadLoansByUser(selectedUserId);

  currentLoanId = loan.id;

  const rentalResponse = await fetch(`/loans/${loan.id}/rental`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const rentalData = await rentalResponse.json();

  const fineResponse = await fetch(`/loans/${loan.id}/fine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const fineData = await fineResponse.json();

  document.getElementById("loanDetails").innerText = JSON.stringify(
    {
      loanId: loan.id,
      userId: loan.userId,
      bookTitle: loan.bookTitle,
      days: loan.days,
      rentalValue: rentalData.rentalValue,
      fine: fineData.fine,
    },
    null,
    2
  );
}

async function viewLoanDetails() {
  if (!selectedLoanId) {
    alert("Nenhum empréstimo criado ainda");
    return;
  }

  const token = getToken();

  const rentalResponse = await fetch(`/loans/${selectedLoanId}/rental`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const rentalData = await rentalResponse.json();

  const fineResponse = await fetch(`/loans/${selectedLoanId}/fine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const fineData = await fineResponse.json();

  document.getElementById("loanDetails").innerText = JSON.stringify(
    {
      loanId: selectedLoanId,
      status: fineData.status,
      daysLate: fineData.daysLate || 0,
      rentalValue: rentalData.rentalValue,
      fine: fineData.fine,
    },
    null,
    2
  );
}

async function createUser() {
  const name = document.getElementById("userNameCreate").value.trim();
  const email = document.getElementById("userEmailCreate").value.trim();
  const messageCreateuser = document.getElementById("userMessage");

  messageCreateuser.innerText = "";
  messageCreateuser.style.color = "red";

  if (!name) {
    messageCreateuser.innerText = "Informe o nome do usuário";
    return;
  }

  if (!email || !email.endsWith("@gmail.com")) {
    messageCreateuser.innerText = "O email deve possuir @gmail.com";
    return;
  }

  const response = await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  const data = await response.json();

  if (!response.ok) {
    messageCreateuser.innerText = data.message || "Erro ao criar usuário";
    messageCreateuser.style.color = "red";
    return;
  }

  messageCreateuser.innerText = "Usuário criado com sucesso";
  messageCreateuser.style.color = "green";

  selectedUserId = data.id;

  document.getElementById(
    "selectedUser"
  ).innerText = `${data.name} (ID: ${data.id})`;

  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
  await loadUsers();
}

async function loadUsers() {
  const response = await fetch("/users");
  const users = await response.json();

  const select = document.getElementById("userSelect");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione um usuário</option>';

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${user.name} (${user.email})`;
    select.appendChild(option);
  });
}

async function selectUser() {
  const select = document.getElementById("userSelect");
  selectedUserId = Number(select.value);

  if (!selectedUserId) {
    document.getElementById("selectedUser").innerText = "Nenhum";
    return;
  }

  const selectedOption = select.options[select.selectedIndex].text;
  document.getElementById("selectedUser").innerText = selectedOption;

  await loadLoansByUser(selectedUserId);
}

if (window.location.pathname.includes("loans.html")) {
  loadUsers();
}

async function loadLoansByUser(userId) {
  const token = getToken();

  const response = await fetch(`/users/${userId}/loans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const loans = await response.json();

  const select = document.getElementById("loanSelect");
  select.innerHTML = '<option value="">Selecione um empréstimo</option>';

  loans.forEach((loan) => {
    const option = document.createElement("option");
    option.value = loan.id;
    option.textContent = `#${loan.id} - ${loan.bookTitle}`;
    select.appendChild(option);
  });

  selectedLoanId = null;
  document.getElementById("loanDetails").innerText = "";
}

function selectLoan() {
  const select = document.getElementById("loanSelect");
  selectedLoanId = Number(select.value);
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}
