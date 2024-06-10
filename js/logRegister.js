document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById("show-login");
    var registerButton = document.getElementById("show-register");
    var loginForm = document.getElementById("login-form");
    var registerForm = document.getElementById("register-form");

    loginButton.addEventListener("click", function() {
        loginForm.classList.add("visible");
        registerForm.classList.remove("visible");
    });

    registerButton.addEventListener("click", function() {
        registerForm.classList.add("visible");
        loginForm.classList.remove("visible");
    });
});
