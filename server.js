const datos = require("./config.json");
const express = require('express');
const path = require('node:path');

const aplicacion = express();
const puerto = 3000;

aplicacion.use(express.json());
aplicacion.use(express.static(path.join(__dirname, 'pagina')));
aplicacion.get('/configurationes', (_, res) => { res.json({ datos }); });

aplicacion.listen(puerto, () => { console.log(`Asistente en la pagina http://localhost:${puerto}`); });
