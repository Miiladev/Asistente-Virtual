import { recognition, Grabar } from '../js/Grabadora.js';

const Desactivar = document.querySelector("#Desactivar-Voz");
const Activar = document.querySelector("#Activar-Voz");
const Caja = document.querySelector("#Caja");

let GrabacionActivada = true;

Desactivar.onclick = async () => {

    recognition.abort();

    if (GrabacionActivada == true) {

        let CajaCambio = Caja.classList.contains("Caja-Cambio");
        GrabacionActivada = false;

        CajaCambio ? Caja.classList.remove("Caja-Cambio") : " ";

        Desactivar.classList.add("Desactivado");
        Activar.classList.remove("Desactivado");

    }
};

Activar.onclick = async () => {

    if (GrabacionActivada == false) {

        GrabacionActivada = true;

        Desactivar.classList.remove("Desactivado");
        Activar.classList.add("Desactivado");
        Grabar();
    }
};

export { GrabacionActivada };

