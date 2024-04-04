import { modohora } from './hora.js';
import { musica } from './musica.js';

const contenedor = document.querySelector("#contenedor");

const primeraGrabacion = new webkitSpeechRecognition();
primeraGrabacion.continuous = true;
primeraGrabacion.interimResults = false;
primeraGrabacion.lang = 'es-ES';

const segundaGrabacion = new webkitSpeechRecognition();
segundaGrabacion.continuous = true;
segundaGrabacion.interimResults = false;
segundaGrabacion.lang = 'es-ES';

let asistenteDatos = { nombre: "mila", grabacion: false, hora: false, opciones: false };

function grabar() {

    console.log("Grabando...");

    let datos = obtenerdatos("usuario");
    datos.grabacion = true

    guardardatos("usuario", datos);

    primeraGrabacion.start();
    primeraGrabacion.onresult = (e) => nombre(obtenertranscripcion(e));
    primeraGrabacion.onend = (_) => {

        let datos = obtenerdatos("usuario");
        if (datos.grabacion && datos.opciones) primeraGrabacion.start();

    }
}

function nombre(t) {

    let datos = obtenerdatos("usuario");

    const contenedorCambio = contenedor.classList.contains("bordeRojo");
    console.log(t.toLowerCase());

    const nombre = datos.nombre.toLowerCase();
    const ta = t.toLowerCase();
    const te = nombre == ta;

    if (te && !contenedorCambio) {

        primeraGrabacion.stop();
        datos.grabacion = false;
        guardardatos("usuario", datos);

        contenedor.classList.add("bordeRojo");
        segundagrabacion();

        return;
    }

    datos.grabacion = true;
    guardardatos("usuario", datos);

}

function segundagrabacion() {

    console.log("Grabando segunda parte...");

    let datos = obtenerdatos("usuario");
    datos.grabacion = true

    guardardatos("usuario", datos);

    segundaGrabacion.start();
    segundaGrabacion.onresult = (e) => opcionesasistente(obtenertranscripcion(e));

}

function opcionesasistente(t) {

    console.log(t);
    const ta = t.toLowerCase();

    let guardar = obtenerdatos("usuario");
    guardar.grabacion = false;
    guardardatos("usuario", guardar);

    let datos = obtenerdatos("usuario");
    const contenedorCambio = contenedor.classList.contains("bordeRojo");

    const tipos = [
        { name: ["modo hora"], funcion: modohora },
        { name: ["reproducir", "reproducir musica", "musica"], funcion: musica }
    ];

    if (!datos.grabacion && contenedorCambio) {

        for (let tipo of tipos) {
            if (tipo.name.some(tipo => ta.includes(tipo))) {
                tipo.funcion(t);
                break;
            }
        }

    }

}

window.onload = () => {

    if (localStorage.getItem("usuario") === null) { localStorage.setItem("usuario", JSON.stringify(asistenteDatos)); }
    if (localStorage.getItem("usuario")) { localStorage.setItem("usuario", JSON.stringify(asistenteDatos)); }
    grabar();
};

// FUNCIONES DE GESTIÓN DE DATOS EN LOCAL STORAGE //

function obtenerdatos(baseDeDatos) {
    let db = localStorage.getItem(baseDeDatos);
    let x = JSON.parse(db);

    return x;
}

function guardardatos(baseDeDatos, valor) {
    localStorage.setItem(baseDeDatos, JSON.stringify(valor));
}

function obtenertranscripcion(event) {

    let transcripcion = "";

    for (let i = event.resultIndex; i < event.results.length; i++)
        transcripcion += event.results[i][0].transcript.trim();

    return transcripcion;
}


export { obtenerdatos, guardardatos, grabar, primeraGrabacion, segundaGrabacion };