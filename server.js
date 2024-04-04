const datos = require("./config.json");
const express = require('express');
const path = require('node:path');

const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

const youtube = require("youtube-sr").default;
const ytdl = require('ytdl-core');
const { existsSync, createWriteStream, mkdirSync, writeFile } = require("node:fs");

const aplicacion = express();
const puerto = 3000;

aplicacion.use(express.json());
aplicacion.use(express.static(path.join(__dirname, 'pagina')));
aplicacion.use('/contenido', express.static(path.join(__dirname, 'contenido')));

aplicacion.get('/configurationes', (_, res) => { res.json({ datos }); });

aplicacion.get('/buscar/:musica', async (req, res) => {

    // PETICION - http://localhost:3000/buscar/NOMBRE DE LA MUSICA

    const parametros = req.params.musica;
    if (!parametros) return res.status(400).json({ mensaje: 'Te falto poner el nombre de la musica' });

    try {

        const tiempoInicio = Date.now();

        let resultado = await youtube.search(parametros, { limit: 5, safeSearch: true });

        let videoDescargar;

        if (!parametros.toLowerCase().includes('letra') && !parametros.toLowerCase().includes('lyrics')) {
            resultado = resultado.filter(v => !v.title.toLowerCase().includes('letra') && !v.title.toLowerCase().includes('lyrics'));
        }

        videoDescargar = resultado.find(v => v.title === parametros);

        if (!videoDescargar) {
            const pa = parametros.toLowerCase().split(' ');
            videoDescargar = resultado.find(v => pa.some(p => v.channel.name.toLowerCase().includes(p)));
        }

        if (!videoDescargar) { videoDescargar = resultado.find(v => v.title.toLowerCase().includes('letra') || v.title.toLowerCase().includes('lyrics')); }

        videoDescargar = videoDescargar || resultado[0];

        const carpeta = `contenido/musica/${videoDescargar.id}`;
        const nombreMedia = videoDescargar.id;
        const urlMedia = videoDescargar.url

        mkdirSync(carpeta, { recursive: true });

        const video = existsSync(`${carpeta}/${nombreMedia}.webm`);
        const audio = existsSync(`${carpeta}/${nombreMedia}.aac`);

        if (!video || !audio) {

            const vp = pipeline(ytdl(urlMedia, { quality: 'highestvideo' }), createWriteStream(`${carpeta}/${nombreMedia}.webm`))
            const ap = pipeline(ytdl(urlMedia, { quality: 'highestaudio' }), createWriteStream(`${carpeta}/${nombreMedia}.aac`));

            await Promise.all([vp, ap]);

            const contenido = { nombre: videoDescargar.title, canal: videoDescargar.channel.name, video: videoDescargar.url };
            writeFile(`${carpeta}/informacion.json`, JSON.stringify(contenido, null, 2), err => { });

            const tiempoFinal = Date.now();
            const tiempoTotal = (tiempoFinal - tiempoInicio) / 1000;

            console.log(videoDescargar);
            res.json({ estado: "terminado", video: `${carpeta}/${nombreMedia}.webm`, audio: `${carpeta}/${nombreMedia}.aac`, resultado: videoDescargar, tiempoTotal });

        } else res.json({ video: `${carpeta}/${nombreMedia}.webm`, audio: `${carpeta}/${nombreMedia}.aac`, resultado: videoDescargar });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }

});

aplicacion.listen(puerto, () => { console.log(`Asistente en la pagina http://localhost:${puerto}`); });
