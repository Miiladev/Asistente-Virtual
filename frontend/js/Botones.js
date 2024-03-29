import { recognition, recognitionSegundaParte, Grabar } from '../js/Grabadora.js';

const Desactivar = document.querySelector("#Desactivar-Voz");
const Activar = document.querySelector("#Activar-Voz");
const Caja = document.querySelector("#Caja");

const DatosGuardados = localStorage.getItem("usuario");
const DatosLocal = JSON.parse(DatosGuardados);

const Datos = { Asistida: false, Asistente: "Miila", GrabacionActivada: false, ModoHora: false };

Desactivar.onclick = () => {

    recognition.stop();
    recognitionSegundaParte.stop();

    if (DatosLocal.GrabacionActivada) {

        let CajaCambio = Caja.classList.contains("Caja-Cambio");

        Datos.DatosLocal = false;
        localStorage.setItem("usuario", JSON.stringify(Datos));

        CajaCambio ? Caja.classList.remove("Caja-Cambio") : " ";

        Desactivar.classList.add("Desactivado");
        Activar.classList.remove("Desactivado");

    }
};

Activar.onclick = async () => {

    if (!DatosLocal.GrabacionActivada) {

        Datos.GrabacionActivada = true;

        localStorage.setItem("usuario", JSON.stringify(Datos));

        Desactivar.classList.remove("Desactivado");
        Activar.classList.add("Desactivado");
        Grabar();
    }
};
