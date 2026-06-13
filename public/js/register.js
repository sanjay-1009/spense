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
.addEventListener(
"submit",
async function(e){

e.preventDefault();

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;

// Password Match Validation

if(password !== confirmPassword){

alert(
"Passwords do not match"
);

return;

}

// Password Length Validation

if(password.length < 6){

alert(
"Password must be at least 6 characters"
);

return;

}

try{

const response =
await fetch(
"http://localhost:5000/api/auth/register",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password
})

}
);

const data =
await response.json();

alert(
data.message
);

if(response.ok){

window.location.href =
"login.html";

}

}
catch(error){

console.error(error);

alert(
"Registration Failed"
);

}

});