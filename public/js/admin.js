const role =
localStorage.getItem("role");

if(role !== "admin"){

window.location.href =
"admin-login.html";

}
function logout(){

localStorage.clear();

window.location.href =
"admin-login.html";

}
fetch(
`${API_URL}/api/admin/stats`
)
.then(res => res.json())
.then(data => {

document.getElementById(
"totalUsers"
).innerText =
data.totalUsers;

document.getElementById(
"totalExpenses"
).innerText =
data.totalExpenses;

document.getElementById(
"totalSpending"
).innerText =
"₹" + data.totalSpending;

if(document.getElementById("activeToday")){
document.getElementById(
"activeToday"
).innerText =
data.activeToday || 0;
}

})
.catch(console.error);

fetch(
`${API_URL}/api/admin/users`
)
.then(res => res.json())
.then(users => {

const table =
document.getElementById(
"usersTable"
);

table.innerHTML = "";

users.forEach(user => {

table.innerHTML += `
<tr>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.last_active
    ? new Date(user.last_active).toLocaleString("en-IN")
    : "-"}</td>

<td>${user.role}</td>

<td>

<button
class="btn btn-success btn-sm"
onclick="downloadExcel(${user.id})">

Excel

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteUser(${user.id})">

Delete

</button>

</td>

</tr>
`;

});

})
.catch(console.error);
function downloadExcel(id){

window.open(
`${API_URL}/api/admin/export-user/${id}`
);

}
function deleteUser(id){

if(!confirm(
"Delete this user?"
)){
return;
}

fetch(
`${API_URL}/api/admin/user/${id}`,
{
method:"DELETE"
}
)
.then(res => res.json())
.then(data => {

alert(data.message);

location.reload();

})
.catch(console.error);

}
function downloadAllUsers(){

window.open(
`${API_URL}/api/admin/export-all-users`
);

}