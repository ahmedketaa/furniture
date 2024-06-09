import { createUser } from "../db/user.js";

/// Flag

let fullNameHasError = true;
let emailHasError = true;
let passwordHasError = true;
let rePasswordHasError = true;

/// Function to check if blur is empty or not

function validateIfInputIsEmpty(value) {
  console.log(value);
  if (!value || value === "") {
    return true;
  } else {
    return false;
  }
}

function validateFullName(inp) {
  const emptyFullName = validateIfInputIsEmpty(inp.value);

  if (emptyFullName) {
    inp.nextElementSibling.innerHTML = "Full Name is required";
  } else if (inp.value.length < 3) {
    inp.nextElementSibling.innerHTML = "Full Name must be greaterthan 3 chars";
  } else {
    inp.nextElementSibling.innerHTML = "";
    fullNameHasError = false;
  }
}

function validateEmail(inp) {
  const emptyEmail = validateIfInputIsEmpty(inp.value);

  if (emptyEmail) {
    inp.nextElementSibling.innerHTML = "Email is required";
  } else if (
    !inp.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
  ) {
    inp.nextElementSibling.innerHTML = "Email is invalid";
  } else {
    inp.nextElementSibling.innerHTML = "";
    emailHasError = false;
  }
}

function validatePassword(inp) {
  const emptyPassword = validateIfInputIsEmpty(inp.value);

  if (emptyPassword) {
    inp.nextElementSibling.innerHTML = "Password is required";
  } else if (inp.value.length < 8) {
    inp.nextElementSibling.innerHTML = "Minimum characters is 8";
  } else {
    inp.nextElementSibling.innerHTML = "";
    passwordHasError = false;
  }
}

function validateRePassword(inp1, password) {
  const emptyPassword = validateIfInputIsEmpty(inp1.value);

  if (emptyPassword) {
    inp1.nextElementSibling.innerHTML = "Re-Password is required";
  } else if (inp1.value !== password) {
    inp1.nextElementSibling.innerHTML = "Re-Password must match password";
  } else {
    inp1.nextElementSibling.innerHTML = "";
    rePasswordHasError = false;
  }
}

document.getElementById("fullName").addEventListener("blur", (event) => {
  validateFullName(event.target);
});

document.getElementById("email").addEventListener("blur", (event) => {
  validateEmail(event.target);
});

document.getElementById("password").addEventListener("blur", (event) => {
  validatePassword(event.target);
});

document.getElementById("re_passowrd").addEventListener("blur", (event) => {
  validateRePassword(event.target, document.getElementById("password").value);
});

document.getElementById("register_form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    !fullNameHasError &&
    !emailHasError &&
    !passwordHasError &&
    !rePasswordHasError
  ) {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUser({
      fullName,
      role: "user",
      email,
      password,
      cart: [],
      wishList: [],
      notifications: [],
    });

    window.location.href = "./login.html";
  }
});
