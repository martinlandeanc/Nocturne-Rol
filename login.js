document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.success) {
        alert("Inicio de sesión exitoso.");
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});
