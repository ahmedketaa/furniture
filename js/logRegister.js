import { userLogin, createUser } from "../db/user.js";

document.addEventListener("DOMContentLoaded", function () {
  var loginButton = document.getElementById("show-login");
  var registerButton = document.getElementById("show-register");
  var loginForm = document.getElementById("login-form");
  var registerForm = document.getElementById("register-form");

  loginButton.addEventListener("click", function () {
    loginForm.classList.add("visible");
    registerForm.classList.remove("visible");
  });

  registerButton.addEventListener("click", function () {
    registerForm.classList.add("visible");
    loginForm.classList.remove("visible");
  });
});

/// flags
let loginEmailHasError = true;
let loginPasswordHasError = true;
let fullNameHasError = true;
let emailHasError = true;
let passwordHasError = true;
let rePasswordHasError = true;

/// empty input validation
function validateIfInputIsEmpty(value) {
  if (!value || value === "") {
    return true;
  } else {
    return false;
  }
}

/// email validation function
function validateLoginEmail(inp) {
  const emptyEmail = validateIfInputIsEmpty(inp.value);

  if (emptyEmail) {
    inp.nextElementSibling.innerHTML = "Email is required";
  } else if (
    !inp.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
  ) {
    inp.nextElementSibling.innerHTML = "Email is invalid";
  } else {
    // inp.nextElementSibling.innerHTML = "";
    loginEmailHasError = false;
  }
}

/// password validation function

function validateLoginPassword(inp) {
  const emptyPassword = validateIfInputIsEmpty(inp.value);

  if (emptyPassword) {
    inp.nextElementSibling.innerHTML = "Password is required";
  } else {
    // inp.nextElementSibling.innerHTML = "";
    loginPasswordHasError = false;
  }
}

document.getElementById("login_email").addEventListener("blur", (event) => {
  validateLoginEmail(event.target);
});
document.getElementById("login_password").addEventListener("blur", (event) => {
  validateLoginPassword(event.target);
});


// handle login form

document.getElementById("login_form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!loginEmailHasError && !loginPasswordHasError) {
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;
    const loggedUser = userLogin({ email, password });

    if (!loggedUser) {
      document.getElementById("login_error").innerHTML = "wrong email or password";
      return;
    }
        // this line to display logout icon from navbar
      else{

      
      const logOutIcon=document.querySelectorAll(".log_out_icon");
      logOutIcon.forEach(icon=>{
        icon.style.display="block"
      });

      const loginIcon=document.querySelectorAll(".fa-user");
      loginIcon.forEach(icon=>{
        icon.parentElement.style.display='none'
      })

      if(loggedUser.role==='user'){
        window.location.href = "./index.html";
      } else {
        window.location.href = "./admin/admin.html";
      }
          }
  }
});

function validateFullName(inp) {
  const emptyFullName = validateIfInputIsEmpty(inp.value);

  if (emptyFullName) {
    inp.nextElementSibling.innerHTML = "Full Name is required";
  } else if (!inp.value.match(/[A-Z][a-z]{3,}/)) {
    inp.nextElementSibling.innerHTML =
      "Full name must be chars and more than 3 chars";
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

document.getElementById("re_password").addEventListener("blur", (event) => {
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

    const userCreated = createUser({
      fullName,
      role: "user", 
      email,
      password,
      cart: [],
      wishList: [],
      notifications: [],
    });

    if (!userCreated) {
      document.getElementById("email").nextElementSibling.innerHTML =
        "Email is already taken ";
    } else {
      window.location.href = "./logRegister.html";
    }
  }
});
