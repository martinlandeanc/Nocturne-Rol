console.log("Nocturne Rol cargado correctamente.");
// Fondo animado con partículas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;

for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2 + 1,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(201, 162, 39, 0.7)";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();


// Mensaje de introducción épico con efecto de máquina de escribir fluido
const textoBienvenida = `Las sombras se alzan y los ecos de antiguas leyendas resuenan en la bruma de lo desconocido...
Has cruzado el umbral de Nocturne Rol, un reino donde la imaginación no tiene límites y cada historia es un portal hacia lo inexplorado.
Aquí, los valientes forjan su destino con palabras, los narradores tejen mundos con su voz y los aventureros encuentran su lugar entre los mitos.
La elección es tuya: ¿Serás un guardián de relatos, un maestro del juego o un viajero en busca de conocimientos prohibidos?
🔥 El viaje comienza ahora. ¿Estás listo para escribir tu propia leyenda?`;

let i = 0;
function escribirTexto() {
    if (i < textoBienvenida.length) {
        document.getElementById("texto-escritura").innerHTML += textoBienvenida.charAt(i);
        i++;
        setTimeout(escribirTexto, 40); // Velocidad de escritura más fluida
    }
}

document.addEventListener("DOMContentLoaded", escribirTexto);



// Ocultar la barra de navegación al hacer scroll hacia abajo y mostrarla al hacer scroll hacia arriba
let prevScrollPos = window.scrollY;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    let currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
        nav.classList.remove("nav-oculta"); // Mostrar barra
    } else {
        nav.classList.add("nav-oculta"); // Ocultar barra
    }

    prevScrollPos = currentScrollPos;
});

// Botón que cambia automáticamente entre secciones
const secciones = [
    { texto: "🎲 Explorar Tienda", link: "tienda.html" },
    { texto: "📜 Leer el Blog", link: "blog.html" },
    { texto: "🎓 Ver Cursos", link: "cursos.html" },
    { texto: "⭐ Ver Suscripciones", link: "suscripciones.html" },
    { texto: "📩 Contacto", link: "contacto.html" }
];

let indiceSeccion = 0;
function cambiarBoton() {
    indiceSeccion = (indiceSeccion + 1) % secciones.length;
    document.getElementById("boton-explorar").innerText = secciones[indiceSeccion].texto;
    document.getElementById("boton-dinamico").href = secciones[indiceSeccion].link;
}

// Cambiar el botón cada 4 segundos
setInterval(cambiarBoton, 4000);
