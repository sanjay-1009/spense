if(
!localStorage.getItem(
"userId"
)
){

window.location.href =
"login.html";

}

console.log(
document.getElementById("expenseForm")
);

const userName =
localStorage.getItem("userName");

const userId =
localStorage.getItem("userId");

document.getElementById(
"welcomeUser"
).innerText =
`Welcome ${userName}`;



// Add Expense

const expenseForm =
document.getElementById("expenseForm");

if(expenseForm){

expenseForm.addEventListener(
"submit",
async function(e){

    
    e.preventDefault();

    const expenseData = {

        user_id:
        localStorage.getItem(
            "userId"
        ),

        expense_date:
        document.getElementById(
            "expenseDate"
        ).value,

        food:
        document.getElementById(
            "food"
        ).value || 0,

        travel:
        document.getElementById(
            "travel"
        ).value || 0,

        clg:
        document.getElementById(
            "clg"
        ).value || 0,

        misc:
        document.getElementById(
            "misc"
        ).value || 0

    };
const expenseId =
document.getElementById(
"expenseId"
).value;
    

    try{

        const response =
await fetch(

expenseId
? `${API_URL}/api/expense/update/${expenseId}`
: '${API_URL}/api/expense/add',

{
    method:
    expenseId
    ? "PUT"
    : "POST",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify(expenseData)
});

        const data =
        await response.json();

        alert(
            data.message
        );

        location.reload();

    }
    catch(error){

        console.error(error);

        alert(
        "Failed to add expense"
        );

    }

});
}


fetch(
`${API_URL}/api/expense/user/${userId}`
)
.then(res => res.json())
.then(data => {

const table =
document.getElementById(
"expenseTable"
);

table.innerHTML = "";

data.forEach(expense => {

table.innerHTML += `

<tr>

<td>
${expense.expense_date
.split("T")[0]}
</td>

<td>
₹${expense.food}
</td>

<td>
₹${expense.travel}
</td>

<td>
₹${expense.clg}
</td>

<td>
₹${expense.misc}
</td>

<td>
₹${expense.total}
</td>

<td>
<button
class="btn btn-warning btn-sm me-1"
onclick="editExpense(${expense.id})">

Edit

</button>


<br><br>

<button
class="btn btn-danger btn-sm"
onclick="deleteExpense(${expense.id})">

Delete

</button>

</td>

</tr>

`;

});

});

fetch(
    `${API_URL}/api/dashboard/stats/${userId}`
)
.then(res => res.json())
.then(data => {

    document.getElementById(
        "todaySpend"
    ).innerText =
    `₹${data.todaySpend}`;

    document.getElementById(
        "dailyAverage"
    ).innerText =
    `₹${data.dailyAverage}`;

    document.getElementById(
        "weeklyAverage"
    ).innerText =
    `₹${data.weeklyAverage}`;

    document.getElementById(
        "monthlyAverage"
    ).innerText =
    `₹${data.monthlyAverage}`;

})
.catch(error => {

    console.error(error);

});

fetch(
`${API_URL}/api/dashboard/chart/${userId}`
)
.then(res => res.json())
.then(data => {

    const labels =
    data.map(item =>
        item.expense_date
    );

    const totals =
    data.map(item =>
        item.total
    );

    new Chart(
        document.getElementById(
            "expenseChart"
        ),
        {
            type:"line",

            data:{
                labels:labels,

                datasets:[{
                    label:"Expenses",

                    data:totals,

                    fill:false
                }]
            }
        }
    );

});

fetch(
`${API_URL}/api/dashboard/category-chart/${userId}`
)
.then(res => res.json())
.then(data => {

    new Chart(
        document.getElementById("pieChart"),
        {
            type: "pie",

            data: {
                labels: [
                    "Food",
                    "Travel",
                    "College",
                    "Misc"
                ],

                datasets: [{
                    data: [
                        data.food,
                        data.travel,
                        data.clg,
                        data.misc
                    ]
                }]
            }
        }
    );

})
.catch(error => {
    console.error(error);
});
const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

logoutBtn.addEventListener(
"click",
function(){

localStorage.clear();

window.location.href =
"login.html";

});

}
async function deleteExpense(id){

const confirmDelete =
confirm(
"Delete this expense?"
);

if(!confirmDelete){

return;

}

try{

const response =
await fetch(
`${API_URL}/api/expense/delete/${id}`,
{
method:"DELETE"
}
);

const data =
await response.json();

alert(
data.message
);

location.reload();

}
catch(error){

console.error(error);

alert(
"Delete failed"
);

}

}

function editExpense(id){

fetch(
`${API_URL}/api/expense/user/${userId}`
)
.then(res => res.json())
.then(data => {

const expense =
data.find(
e => e.id == id
);

document.getElementById(
"expenseId"
).value =
expense.id;

document.getElementById(
"expenseDate"
).value =
expense.expense_date;

document.getElementById(
"food"
).value =
expense.food;

document.getElementById(
"travel"
).value =
expense.travel;

document.getElementById(
"clg"
).value =
expense.clg;

document.getElementById(
"misc"
).value =
expense.misc;

const modal =
new bootstrap.Modal(
document.getElementById(
"expenseModal"
));

modal.show();

});

}