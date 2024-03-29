
const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(PORT, () => { console.log(`Asistente en la pagina http://localhost:${PORT}`); });
