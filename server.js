const Datos = require("./config.json");
const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/Settings', (req, res) => { res.json({ Datos }); });


app.listen(PORT, () => { console.log(`Asistente en la pagina http://localhost:${PORT}`); });
