const token = localStorage.getItem("token");

if (!token || token === "undefined") {
  window.location.replace("index.html");
}

getUser();

const username = document.querySelector(".user-name");
const email = document.querySelector(".user-email");
const avatar = document.querySelector(".avatar");

function getUser() {
  const userId = localStorage.getItem("id");
  fetch(`http://localhost:3000/auth/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      username.textContent = data.username;
      email.textContent = data.email;
      avatar.textContent = data.username[0];
    });
}

const main = document.querySelector(".task-board");

window.navClicked = function (clicked) {
  main.innerHTML = "";
  if (clicked.childNodes[3].textContent === "Dashboard") {
    const p = document.createElement("p");
    p.textContent = "This is Dashboard";
    main.appendChild(p);
  } else if (clicked.childNodes[3].textContent === "Projects") {
    const p = document.createElement("p");
    p.textContent = "This is Projects";
    main.appendChild(p);
  } else if (clicked.childNodes[3].textContent === "Tasks") {
    const p = document.createElement("p");
    p.textContent = "This is Task";
    main.appendChild(p);
  } else if (clicked.childNodes[3].textContent === "Users") {
    main.appendChild(table);
  }
};

const labels = ["Username", "Email", "Participated", "Owned"];

function getAllUsers() {
  fetch("http://localhost:3000/auth/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => createTbody(data));
}

getAllUsers();

const table = document.createElement("table");
createTable();

function createTable(users = []) {
  table.style.border = "1px solid black";
  table.style.borderCollapse = "collapse";
  document.body.appendChild(table);
  createThead();
  createTbody(users);
}

function createThead() {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  tr.style.border = "1px solid black";

  labels.forEach((label) => {
    const th = document.createElement("th");
    th.style.border = "1px solid black";
    th.textContent = label;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);
}

const tbody = document.createElement("tbody");

function createTbody(users) {
  users.forEach((user) => {
    appendRow(user);
  });
}

function appendRow(user) {
  const tr = document.createElement("tr");
  const values = Object.values(user);
  for (let i = 1; i < values.length; i++) {
    if (i == 3) continue;
    const td = document.createElement("td");
    td.style.border = "1px solid black";
    td.textContent = values[i];
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
table.appendChild(tbody);
