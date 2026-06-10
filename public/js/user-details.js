new Chart(
document.getElementById("expenseChart"),
{
type:"line",

data:{
labels:[
"Week 1",
"Week 2",
"Week 3",
"Week 4"
],

datasets:[
{
label:"Expenses",
data:[
2000,
2500,
1800,
2200
]
}
]
}
}
);