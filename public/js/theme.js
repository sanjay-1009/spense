function toggleTheme() {

    const body = document.body;

    body.classList.toggle("dark-mode");

    const current =
        body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    localStorage.setItem("theme", current);
}

window.onload = () => {

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark-mode");
    }

}