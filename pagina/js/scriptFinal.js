const contenedor = document.querySelector("#contenedor");
const carita = document.querySelector("#carita");

const primeraGrabacion = new webkitSpeechRecognition();
primeraGrabacion.continuous = true;
primeraGrabacion.interimResults = false;
primeraGrabacion.lang = 'es-ES';

const segundaGrabacion = new webkitSpeechRecognition();
segundaGrabacion.continuous = true;
segundaGrabacion.interimResults = false;
segundaGrabacion.lang = 'es-ES';

let asistenteDatos = { nombre: "mila", grabacion: false, hora: false, opciones: false };
let intervaloTiempo;

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

    let contenedorHora =
        `
    <div class="contenedorHora" id="contenedorHora">
    <h2 id="fecha">sabado, 23 de marzo del 2024</h2>
    <h3 id="hora">12 : 06 : 50 - PM</h3>
    <h4>Modo hora activado</h4>
    </div>
    `;

    function actualizartiempo() {
        const fechaHoraActual = new Date();
        const horas = (fechaHoraActual.getHours() % 12 || 12).toString().padStart(2, '0');
        const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
        const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');
        const amPm = fechaHoraActual.getHours() >= 12 ? 'PM' : 'AM';
        const hora = `${horas} : ${minutos} : ${segundos} - ${amPm}`;
        const fecha = fechaHoraActual.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        document.querySelector("#fecha").textContent = fecha;
        document.querySelector("#hora").textContent = hora;
    }


    if (!datos.grabacion && contenedorCambio) {

        switch (ta) {

            case "modo hora": {

                if (!datos.hora) {

                    datos.hora = true;
                    datos.opciones = false;
                    guardardatos("usuario", datos);
                    contenedor.insertAdjacentHTML("afterbegin", contenedorHora);
                    contenedor.style.backgroundImage = "url('../Imagenes/hora.webp')";
                    carita.remove();

                    intervaloTiempo = setInterval(actualizartiempo, 1000);
                    return grabar();

                } else if (datos.hora && document.querySelector("contenedorCaja")) {

                    clearInterval(intervaloTiempo);
                    datos.hora = false;
                    datos.opciones = false;
                    guardardatos("usuario", datos);

                    contenedor.insertAdjacentHTML("afterbegin", `<img src="./Imagenes/cara.webp" alt="Cara" id="Cara" class="Cara" />`);
                    contenedor.style.backgroundImage = "url('../Imagenes/maestro.webp')";

                    document.querySelector("contenedorHora").remove();
                    guardar();

                }

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
