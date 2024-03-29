import { recognitionSegundaParte, Grabar } from '../js/Grabadora.js';

const Cara = document.querySelector("#Cara");
const Caja = document.querySelector('#Caja');

let intervaloTiempo;

let CajaHoraDiv = `
<div class="Caja-Hora" id="Caja-Hora">
    <h2 class="Fecha" id="Fecha">sabado, 23 de marzo del 2024</h2>
    <h3 class="Hora" id="Hora">12 : 06 : 50 - PM</h3>
    <h4 class="Modo-Hora">Modo hora activado</h4>
</div>
`;

async function AsistenteFunciones(transcripcion,) {

    const CajaCambio = Caja.classList.contains('Caja-Cambio');

    // GUARDAR LOS CAMBIOS //
    const DATOSGUARDADOS = localStorage.getItem("usuario");
    const DATOSLOCAL = JSON.parse(DATOSGUARDADOS);
    DATOSLOCAL.GrabacionActivada = false;
    localStorage.setItem("usuario", JSON.stringify(DATOSLOCAL));
    // GUARDAR LOS CAMBIOS //

    const DatosGuardados = localStorage.getItem("usuario");
    const DatosLocal = JSON.parse(DatosGuardados);

    console.log(transcripcion);

    function actualizarTiempo() {
        const fechaHoraActual = new Date();
        const horas = (fechaHoraActual.getHours() % 12 || 12).toString().padStart(2, '0');
        const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
        const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');
        const amPm = fechaHoraActual.getHours() >= 12 ? 'PM' : 'AM';
        const hora = `${horas} : ${minutos} : ${segundos} - ${amPm}`;
        const fecha = fechaHoraActual.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        document.querySelector("#Hora").textContent = hora;
        document.querySelector("#Fecha").textContent = fecha;
    }

    if (!DatosLocal.GrabacionActivada && CajaCambio) {

        Caja.classList.remove('Caja-Cambio');
        const type = transcripcion.toLowerCase();

        if (type == "modo hora") {

            if (!DatosLocal.ModoHora) {

                DatosLocal.ModoHora = true;
                DatosLocal.opcionSeleccionada = false;
                localStorage.setItem("usuario", JSON.stringify(DatosLocal));

                Caja.insertAdjacentHTML("afterbegin", CajaHoraDiv);
                Caja.style.backgroundImage = "url('../Imagenes/hora.webp')";
                Cara.remove();

                intervaloTiempo = setInterval(actualizarTiempo, 1000);
                Grabar();

            } else if (DatosLocal.ModoHora && document.querySelector("#Caja-Hora")) {

                clearInterval(intervaloTiempo);
                DatosLocal.ModoHora = false;
                DatosLocal.opcionSeleccionada = false;
                localStorage.setItem("usuario", JSON.stringify(DatosLocal));

                Caja.insertAdjacentHTML("afterbegin", `<img src="./Imagenes/cara.webp" alt="Cara" id="Cara" class="Cara" />`);
                Caja.style.backgroundImage = "url('../Imagenes/maestro.webp')";
                document.querySelector("#Caja-Hora").remove();
                Grabar();
            }

        }

    }


};

export { AsistenteFunciones };