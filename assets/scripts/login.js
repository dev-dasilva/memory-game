const button = document.getElementById("login__submit");
const login = document.getElementById("login__name");
const password = document.getElementById("login__password");
const form = document.querySelector("form");

const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute("disabled");
    return;
  }
  button.setAttribute("disabled", "");
};

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem("player", login.value);
  window.location = "assets/pages/game.html";
};

login.addEventListener("input", validateInput);

form.addEventListener("submit", handleSubmit);
