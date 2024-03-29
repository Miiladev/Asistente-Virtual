import { obtenerTranscripcion } from '../js/funciones.js';
import { AsistenteFunciones } from '../js/GrabacionOpciones.js';

const Caja = document.querySelector("#Caja");

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'es-ES';

const recognitionSegundaParte = new webkitSpeechRecognition();
recognitionSegundaParte.continuous = true;
recognitionSegundaParte.interimResults = false;
recognitionSegundaParte.lang = 'es-ES';

let datos = { Asistente: "mila", GrabacionActivada: false, ModoHora: false, opcionSeleccionada: false };


async function VerificarNombre(transcripcion) {

    const DATOSGUARDADOS = localStorage.getItem("usuario");
    const DATOSLOCAL = JSON.parse(DATOSGUARDADOS);

    let CajaCambio = Caja.classList.contains('Caja-Cambio');

    console.log(transcripcion.toLowerCase());

    if (transcripcion.toLowerCase() == DATOSLOCAL.Asistente.toLowerCase() && !CajaCambio) {

        await recognition.stop();

        DATOSLOCAL.GrabacionActivada = false;
        localStorage.setItem("usuario", JSON.stringify(DATOSLOCAL));

        Caja.classList.add('Caja-Cambio');

        GrabarSegundaParte();
    }

    DATOSLOCAL.GrabacionActivada = true;
    localStorage.setItem("usuario", JSON.stringify(DATOSLOCAL));

}

async function Grabar() {

    console.log("Grabando..");

    let DATOSGUARDADOS = localStorage.getItem("usuario");
    let DATOSLOCAL = JSON.parse(DATOSGUARDADOS);
    DATOSLOCAL.GrabacionActivada = true;
    localStorage.setItem("usuario", JSON.stringify(DATOSLOCAL));

    recognition.start();
    recognition.onresult = (event) => VerificarNombre(obtenerTranscripcion(event));
    recognition.onerror = (event) => console.log(`Error Detectado: ${event.error}`);
    recognition.onend = (event) => {
        const DatosGuardados = localStorage.getItem("usuario");
        const DatosLocal = JSON.parse(DatosGuardados);

        console.log(DatosLocal)
        if (DatosLocal.GrabacionActivada && DatosLocal.opcionSeleccionada) recognition.start();
    };
}

async function GrabarSegundaParte() {

    console.log("Grabando segunda parte..");

    const DATOSGUARDADOS = localStorage.getItem("usuario");
    const DATOSLOCAL = JSON.parse(DATOSGUARDADOS);
    DATOSLOCAL.GrabacionActivada = true;
    localStorage.setItem("usuario", JSON.stringify(DATOSLOCAL));
    
    recognitionSegundaParte.start();
    recognitionSegundaParte.onresult = (event) => { AsistenteFunciones(obtenerTranscripcion(event)); };

    // recognitionSegundaParte.onend = (event) => {
    //     if (!DatosLocal.GrabacionActivada) {
    //         DatosLocal.GrabacionActivada = true;
    //         localStorage.setItem("usuario", JSON.stringify(DatosLocal));
    //     }
    // };

}

window.onload = () => {

    if (localStorage.getItem("usuario") === null) { localStorage.setItem("usuario", JSON.stringify(datos)) }
    if (localStorage.getItem("usuario")) { localStorage.setItem("usuario", JSON.stringify(datos)) }
    Grabar();
};

export { recognition, Grabar, recognitionSegundaParte };
