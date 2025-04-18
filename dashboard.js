const token = localStorage.getItem("token");
console.log(token);

if (!token || token === "undefined") {
  window.location.replace("index.html");
}
