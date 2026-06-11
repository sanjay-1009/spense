function togglePassword() {

    const password =
        document.getElementById("password");

    password.type =
        password.type === "password"
        ? "text"
        : "password";
}

document
.getElementById("loginForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if(response.ok){

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

            alert("Login Successful");

            window.location.href =
                "dashboard.html";

        }
        else{

            alert(
                data.message ||
                "Login Failed"
            );

        }

    }
    catch(error){

        console.error(error);

        alert(
            "Server Connection Failed"
        );

    }

});