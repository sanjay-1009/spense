function showToast(message){

const toast = document.createElement("div");

toast.className = "custom-toast";

toast.innerText = message;

document.body.appendChild(toast);

setTimeout(()=>{
toast.remove();
},3000);

}
function showLoader(){

document
.getElementById("spinner")
.style.display="flex";
}

function hideLoader(){

document
.getElementById("spinner")
.style.display="none";
}