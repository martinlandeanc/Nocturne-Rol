let progresoCursos = JSON.parse(localStorage.getItem("progresoCursos")) || {};

function inscribirseCurso(nombreCurso) {
    if (!progresoCursos[nombreCurso]) {
        progresoCursos[nombreCurso] = { completado: 0, total: 5 }; // 5 lecciones por defecto
    }
    localStorage.setItem("progresoCursos", JSON.stringify(progresoCursos));
    mostrarProgresoCursos();
}

function completarLeccion(nombreCurso) {
    if (progresoCursos[nombreCurso] && progresoCursos[nombreCurso].completado < progresoCursos[nombreCurso].total) {
        progresoCursos[nombreCurso].completado++;
        localStorage.setItem("progresoCursos", JSON.stringify(progresoCursos));
        mostrarProgresoCursos();

        if (progresoCursos[nombreCurso].completado === progresoCursos[nombreCurso].total) {
            mostrarNotificacion(`¡Felicidades! Has completado el curso de ${nombreCurso}.`);
            alert(`¡Felicidades! Has completado el curso de ${nombreCurso}. Ahora puedes descargar tu certificado.`);
            generarCertificado(nombreCurso);
        }
    }
}


function mostrarProgresoCursos() {
    const listaProgreso = document.getElementById("progreso-cursos");
    if (!listaProgreso) return;

    listaProgreso.innerHTML = "";

    for (const curso in progresoCursos) {
        const li = document.createElement("li");
        const progreso = progresoCursos[curso];
        li.innerHTML = `${curso}: ${progreso.completado}/${progreso.total} 
            <button onclick="completarLeccion('${curso}')">Completar Lección</button>`;
        listaProgreso.appendChild(li);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProgresoCursos();
});

function generarCertificado(nombreCurso) {
    window.location.href = `/certificado?curso=${encodeURIComponent(nombreCurso)}`;
}
