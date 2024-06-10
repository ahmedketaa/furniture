import { userLogin } from "../db/user.js";

/// flags
let emailHasError = true;
let passwordHasError = true;

/// empty inout validation
function validateIfInputIsEmpty(value) {
  if (!value || value === "") {
    return true;
  } else {
    return false;
  }
}

/// email validation function
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

/// password validation function

function validatePassword(inp) {
  const emptyPassword = validateIfInputIsEmpty(inp.value);

  if (emptyPassword) {
    inp.nextElementSibling.innerHTML = "Password is required";
  } else {
    inp.nextElementSibling.innerHTML = "";
    passwordHasError = false;
  }
}

document.getElementById("email").addEventListener("blur", (event) => {
  validateEmail(event.target);
});

document.getElementById("password").addEventListener("blur", (event) => {
  validatePassword(event.target);
});

document.getElementById("login_form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!emailHasError && !passwordHasError) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loggedin = userLogin({ email, password });

    if (!loggedin) {
      document.getElementById("login_error").innerHTML = "wrong credetials";
      return;
    }

    console.log("logged in successfully");
    // WIP : redirect to home page if user /to dashboard if admin
  }
});
