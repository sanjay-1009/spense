let otpVerified = false;

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
.getElementById("sendOtpBtn")
.addEventListener(
"click",
async () => {

const email =
document.getElementById("email").value;

if(!email){

alert("Enter email first");

return;

}

try{

const response =
await fetch(
'${API_URL}/api/otp/register',
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email
})

}
);

const data =
await response.json();

alert(data.message);

}
catch(error){

console.error(error);

alert("Failed to send OTP");

}

});

document
.getElementById("verifyOtpBtn")
.addEventListener(
"click",
async () => {

const email =
document.getElementById("email").value;

const otp =
document.getElementById("otp").value;

if(!otp){

alert("Enter OTP");

return;

}

try{

const response =
await fetch(
'${API_URL}/api/otp/verify',
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
otp
})

}
);

const data =
await response.json();

alert(data.message);

if(response.ok){

otpVerified = true;

document.getElementById(
"otpStatus"
).innerHTML =
"✅ Verified";

document.getElementById(
"otpStatus"
).className =
"ms-2 text-success";

}

}
catch(error){

console.error(error);

alert("OTP Verification Failed");

}

});

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

if(!otpVerified){

alert(
"Please verify OTP first"
);

return;

}

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
'${API_URL}/api/auth/register',
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