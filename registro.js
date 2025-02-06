document.getElementById("registro-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.success) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
    } else {
        alert("Error en el registro.");
    }
});
