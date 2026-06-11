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

    try{

        const response =
        await fetch(
        "http://localhost:5000/api/expense/add",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(
                expenseData
            )
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
`http://localhost:5000/api/expense/user/${userId}`
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

</tr>

`;

});

});

fetch(
    `http://localhost:5000/api/dashboard/stats/${userId}`
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
`http://localhost:5000/api/dashboard/chart/${userId}`
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
`http://localhost:5000/api/dashboard/category-chart/${userId}`
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