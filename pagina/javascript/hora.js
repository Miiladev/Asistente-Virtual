import { obtenerdatos, guardardatos, grabar, segundaGrabacion } from './scriptFinal.js';

function modohora() {

    let intervaloTiempo;

    let datos = obtenerdatos("usuario");

    let contenedorHora = `
    <div class="contenedorHora" id="contenedorHora">
        <h2 id="fecha"></h2>
        <h3 id="hora"></h3>
        <h4>Modo hora activado</h4>
    </div>
        `;

    const contenedor = document.querySelector("#contenedor");
    const carita = document.querySelector("#carita");

    contenedor.classList.remove("bordeRojo");

    if (!datos.hora) {

        datos.hora = true;
        datos.opciones = false;
        guardardatos("usuario", datos);
        contenedor.insertAdjacentHTML("afterbegin", contenedorHora);
        contenedor.style.backgroundImage = "url('../Imagenes/hora.webp')";
        carita.remove();

        intervaloTiempo = setInterval(actualizartiempo, 1000);

        segundaGrabacion.stop();
        return grabar();

    } else if (datos.hora && document.querySelector("#contenedorCaja")) {

        clearInterval(intervaloTiempo);
        datos.hora = false;
        datos.opciones = false;
        guardardatos("usuario", datos);

        contenedor.insertAdjacentHTML("afterbegin", `<img src="./Imagenes/cara.webp" alt="Cara" id="Cara" class="Cara" />`);
        contenedor.style.backgroundImage = "url('../Imagenes/maestro.webp')";

        const contenedorHora = document.querySelector("#contenedorHora");

        contenedorHora.remove();

        segundaGrabacion.stop();
        guardar();

    }

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


}

export { modohora };