const expenseChart =
new Chart(
document.getElementById('expenseChart'),
{
type:'line',

data:{
labels:[
'Mon',
'Tue',
'Wed',
'Thu',
'Fri',
'Sat',
'Sun'
],

datasets:[{

label:'Expense',

data:[
300,
450,
200,
500,
600,
350,
420
]

}]
}
}
);

const pieChart =
new Chart(
document.getElementById('pieChart'),
{
type:'pie',

data:{
labels:[
'Food',
'Travel',
'College',
'Misc'
],

datasets:[{

data:[
40,
20,
25,
15
]

}]
}
}
);