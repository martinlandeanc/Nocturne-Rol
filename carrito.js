// Inicializar el carrito desde localStorage o como un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(nombre + " agregado al carrito.");
}

// Función para mostrar el carrito en carrito.html
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const listaDescargas = document.getElementById("lista-descargas");
    const totalElement = document.getElementById("total");

    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";
    listaDescargas.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarProducto(index);

        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
        total += item.precio;

        // Agregar botón de descarga si el usuario ya ha pagado
        const liDescarga = document.createElement("li");
        liDescarga.innerHTML = `${item.nombre} 
            <button onclick="descargarPDF('${item.nombre}.pdf')">Descargar PDF</button>`;
        listaDescargas.appendChild(liDescarga);
    });

    totalElement.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para vaciar el carrito completamente
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

// Función para proceder al pago
function procederAlPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("Redirigiendo a la pasarela de pago...");
    window.location.href = "pago.html";
}

// Función para gestionar la descarga de PDFs con límite de 3 descargas
function descargarPDF(nombrePDF) {
    let descargas = JSON.parse(localStorage.getItem("descargas")) || {};
    
    if (!descargas[nombrePDF]) {
        descargas[nombrePDF] = 0;
    }

    if (descargas[nombrePDF] < 3) {
        descargas[nombrePDF]++;
        localStorage.setItem("descargas", JSON.stringify(descargas));
        
        // Simula la descarga con un enlace dinámico
        const enlace = document.createElement("a");
        enlace.href = `/descargar?pdf=${nombrePDF}`;
        enlace.download = nombrePDF;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        
        alert(`Descarga ${descargas[nombrePDF]} de 3 completada.`);
    } else {
        alert("Has alcanzado el límite de descargas. Contacta con soporte.");
    }
}

// Mostrar carrito cuando se carga la página (solo si estamos en carrito.html)
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
});
