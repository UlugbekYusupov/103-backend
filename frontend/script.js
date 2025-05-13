const form = document.createElement("form");
form.classList.add("form");

const heading = document.createElement("h3");
const headings = ["Sign Up", "Login"];
heading.textContent = headings[0];

const textContents = [
  "Already have an account? Login",
  "Don't have an account? Sign up",
];

form.appendChild(heading);

const toggleButton = document.createElement("button");
toggleButton.textContent = textContents[0];
toggleButton.style.border = "none";
toggleButton.type = "button";
toggleButton.style.backgroundColor = "white";
toggleButton.style.color = "blue";
toggleButton.style.marginBottom = "30px";

toggleButton.addEventListener("click", handleToggle);

let isLogin = false;

function handleToggle(event) {
  isLogin = !isLogin;
  heading.textContent = isLogin ? headings[1] : headings[0];
  toggleButton.textContent = isLogin ? textContents[1] : textContents[0];
  submitButton.textContent = isLogin ? headings[1] : headings[0];

  const inputs = document.querySelectorAll("input");
  const labels = document.querySelectorAll("label");

  inputs.forEach((input) => {
    if (isLogin && input.name == "username") {
      input.style.display = "none";
    } else {
      input.style.display = "flex";
    }
  });
  labels.forEach((label) => {
    if (isLogin && label.textContent == "Username") {
      label.style.display = "none";
    } else {
      label.style.display = "flex";
    }
  });
}

const labels = ["Username", "Email", "Password"];
const types = ["text", "email", "password"];

function createLabel(index) {
  const label = document.createElement("label");
  label.textContent = labels[index];
  label.classList.add("label");
  return label;
}

function createInput(index) {
  const input = document.createElement("input");
  input.type = types[index];
  input.name = labels[index].toLowerCase();
  input.placeholder = `Enter your ${labels[index].toLowerCase()}...`;
  input.classList.add("input");
  return input;
}

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.classList.add("submitButton");
submitButton.textContent = headings[0];

for (let i = 0; i < labels.length; i++) {
  form.appendChild(createLabel(i));
  form.appendChild(createInput(i));
}

form.appendChild(toggleButton);
form.appendChild(submitButton);

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  if (isLogin) {
    handleLogin();
  } else {
    handleSignup();
  }
}

function handleLogin() {
  const inputValues = document.querySelectorAll("input");
  let user = {};
  inputValues.forEach((input, index) => {
    if (input.name == "email" || input.name == "password") {
      user[labels[index].toLowerCase()] = input.value;
    }
  });
  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/frontend/layout.html";
      } else {
        alert("Such email or password not exist");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
    });
}

async function handleSignup() {
  const inputs = document.querySelectorAll("input");
  let user = {};
  inputs.forEach((input, index) => {
    user[labels[index].toLowerCase()] = input.value;
  });

  try {
    const responce = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await responce.json();
    // appendRow(data.user);
  } catch (err) {
    console.error("Error: ", err);
  }
  inputs.forEach((input) => {
    input.value = "";
  });
}
document.body.appendChild(form);
