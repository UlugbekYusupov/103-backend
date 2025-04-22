const token = localStorage.getItem("token");
console.log(token);

if (!token || token === "undefined") {
  window.location.replace("index.html");
}

const button = document.createElement("button");
button.textContent = "Log out";

button.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("index.html");
});

document.body.appendChild(button);
