let otpVerified = false;

// Send OTP

document
.getElementById("sendOtpBtn")
.addEventListener(
"click",
async () => {

const email =
document.getElementById("email").value;

const response =
await fetch(
`${API_URL}/api/otp/reset`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email})
}
);

const data =
await response.json();

alert(data.message);

}
);

// Verify OTP

document
.getElementById("verifyOtpBtn")
.addEventListener(
"click",
async () => {

const email =
document.getElementById("email").value;

const otp =
document.getElementById("otp").value;

const response =
await fetch(
`${API_URL}/api/otp/verify`,
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

}

}
);

// Reset Password

document
.getElementById("resetForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

if(!otpVerified){

alert(
"Verify OTP first"
);

return;

}

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;

if(password !== confirmPassword){

alert(
"Passwords do not match"
);

return;

}

const response =
await fetch(
`${API_URL}/api/password/reset`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);

const data =
await response.json();

alert(data.message);

if(response.ok){

window.location.href =
"login.html";

}

}
);