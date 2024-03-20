import { GrabacionActivada } from '../js/Botones.js';
import { obtenerTranscripcion } from '../js/ObtenerTranscripcion.js';
import { AsistenteFunciones } from '../js/GrabacionOpciones.js';

const Caja = document.querySelector("#Caja");

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'es-ES';

let grabacion = false;
let Asistida = false;

async function Grabar() {

    if (grabacion == true) recognition.abort();

    console.log("Grabando..");

    grabacion = true;
    recognition.start();

    recognition.onresult = (event) => VerificarNombre(obtenerTranscripcion(event));


    recognition.onend = (event) => {

        if (GrabacionActivada == true && Asistida == true) {
            recognition.start();
            grabacion = true;
            Asistida = true;
        }
    };

    recognition.onerror = (event) => console.log(`Error Detectado: ${event.error}`);

}

async function GrabarSegundaParte() {

    if (grabacion == true) await recognition.abort();

    console.log("Grabando segunda parte..");

    grabacion = true;
    recognition.start();

    recognition.onresult = (event) => { AsistenteFunciones(obtenerTranscripcion(event)); };

    recognition.onend = (event) => {

        if (GrabacionActivada == true && Asistida == true) {
            grabacion = true;
            Asistida = true;
        }
    };

    recognition.onerror = (event) => console.log(`Error segunda parte: ${event.error}`);;
}

async function VerificarNombre(transcripcion) {

    let CajaCambio = Caja.classList.contains('Caja-Cambio');
    let json = await fetch("/Settings").then(res => res.json())
        .then(result => result.Datos.Asistente);

    if (transcripcion.toLowerCase() === json.toLowerCase() && !CajaCambio) {

        Asistida = false;
        recognition.abort();
        Caja.classList.add('Caja-Cambio');

        setTimeout(GrabarSegundaParte, 10);
    } else {
        Asistida = true;
    }
}

window.onload = () => Grabar();

export { recognition, Asistida, Grabar };
