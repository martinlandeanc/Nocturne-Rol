function mostrarNotificacion(mensaje) {
    if (!("Notification" in window)) {
        alert(mensaje); // Si el navegador no soporta notificaciones, usa alert()
        return;
    }

    Notification.requestPermission().then(permiso => {
        if (permiso === "granted") {
            new Notification("Nocturne Rol", {
                body: mensaje,
                icon: "icono.png" // Puedes agregar un icono aquí
            });
        } else {
            alert(mensaje);
        }
    });
}

// Simular recordatorio de suscripción 3 días antes del vencimiento
function verificarSuscripcion() {
    const fechaExpiracion = localStorage.getItem("fechaSuscripcion");

    if (fechaExpiracion) {
        const hoy = new Date();
        const fechaSub = new Date(fechaExpiracion);
        const diferencia = Math.floor((fechaSub - hoy) / (1000 * 60 * 60 * 24));

        if (diferencia === 3) {
            mostrarNotificacion("Tu suscripción vencerá en 3 días. ¡Renueva ahora!");
        }
    }
}

// Llamar a la verificación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    verificarSuscripcion();
});
