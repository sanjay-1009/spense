function togglePassword() {

const password =
document.getElementById("password");

const confirmPassword =
document.getElementById("confirmPassword");

password.type =
password.type === "password"
? "text"
: "password";

confirmPassword.type =
confirmPassword.type === "password"
? "text"
: "password";
}

document
.getElementById("registerForm")
.addEventListener("submit", function(e){

e.preventDefault();

alert("Registration API coming soon");

});