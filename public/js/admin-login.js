function togglePassword(){

const password =
document.getElementById("password");

password.type =
password.type === "password"
? "text"
: "password";

}

document
.getElementById("adminLoginForm")
.addEventListener(
"submit",
async function(e){

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const response =
await fetch(
'${API_URL}/api/auth/login',
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

if(!response.ok){

alert(
data.message
);

return;

}

if(data.user.role !== "admin"){

alert(
"Access Denied. Admin Only."
);

return;

}

localStorage.setItem(
"token",
data.token
);

localStorage.setItem(
"userId",
data.user.id
);

localStorage.setItem(
"userName",
data.user.name
);

localStorage.setItem(
"role",
data.user.role
);

window.location.href =
"admin.html";

}
catch(error){

console.error(error);

alert(
"Server Connection Failed"
);

}

});