const express = require('express');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

const USERS_FILE = 'users.json';

// Cargar usuarios desde archivo
const loadUsers = () => {
    if (fs.existsSync(USERS_FILE)) {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }
    return [];
};

// Guardar usuarios en archivo
const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Registro de usuario
app.post('/registro', (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();

    if (users.find(user => user.email === email)) {
        return res.json({ success: false, message: "Usuario ya registrado" });
    }

    users.push({ email, password });
    saveUsers(users);
    res.json({ success: true });
});

// Inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Ruta para descargar PDFs sin alteraciones
app.get('/descargar', (req, res) => {
    const pdfName = req.query.pdf;
    const pdfPath = path.join(__dirname, 'public', 'pdf', pdfName);

    if (!pdfName) {
        return res.status(400).send("No se especificó un archivo.");
    }

    if (!fs.existsSync(pdfPath)) {
        return res.status(404).send("El archivo PDF no existe en el servidor.");
    }

    try {
        // Enviar el PDF sin alteraciones
        res.setHeader('Content-Disposition', `attachment; filename="${pdfName}"`);
        res.setHeader('Content-Type', 'application/pdf');
        const fileStream = fs.createReadStream(pdfPath);
        fileStream.pipe(res);
    } catch (error) {
        console.error("Error al procesar el PDF:", error);
        res.status(500).send("Error al descargar el archivo.");
    }
});

// Ruta para generar y descargar certificados
app.get('/certificado', (req, res) => {
    const curso = req.query.curso;
    const userEmail = "usuario@ejemplo.com"; // Simulación de usuario autenticado

    if (!curso) {
        return res.status(400).send("No se especificó el curso.");
    }

    try {
        // Crear imagen de certificado
        const canvas = createCanvas(800, 600);
        const ctx = canvas.getContext('2d');

        // Fondo del certificado
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, 800, 600);

        // Estilos del texto
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText("Certificado de Finalización", 250, 100);
        ctx.font = "25px Arial";
        ctx.fillText(`Otorgado a: ${userEmail}`, 250, 200);
        ctx.fillText(`Por completar el curso: ${curso}`, 250, 300);
        ctx.fillText("Fecha: " + new Date().toLocaleDateString(), 250, 400);

        // Generar buffer de imagen y enviarlo
        const buffer = canvas.toBuffer('image/png');
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="Certificado_${curso}.png"`);
        res.send(buffer);
    } catch (error) {
        console.error("Error al generar el certificado:", error);
        res.status(500).send("Error al generar el certificado.");
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
