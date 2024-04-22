const { Client } = require('whatsapp-web.js');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const QRCode = require('qrcode');


const client = new Client({
    webVersionCache: {
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1012930190-alpha.html',
        type: 'remote'
    }
});


client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
    saveQr(qr);
});

client.on('authenticated', () => {

    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.initialize();




// Habilitar CORS para todas las rutas
app.use(cors());

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('pulpo-front/public'));

// Endpoint /start que retorna "hola"
app.get('/start', (req, res) => {
  res.send('hola');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



function saveQr(text){
    // Generar el código QR y guardarlo como imagen
    QRCode.toFile('pulpo-front/public/qr.png', text, {
        color: {
        dark: '#000',  // Puntos negros
        light: '#FFF' // Fondo blanco
        }
    }, function (error) {
        if (error) throw error;
        console.log('¡Código QR creado y guardado como qr.png!');
    });
}