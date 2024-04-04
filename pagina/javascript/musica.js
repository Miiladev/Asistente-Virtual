import { obtenerdatos, guardardatos, grabar, segundaGrabacion } from './scriptFinal.js';

async function musica() {

    const contenedor = document.querySelector("#contenedor");
    contenedor.classList.remove("bordeRojo");

    let contenedorMusica = `
    <section class="contenedorVideo" id="contenedorVideo">
        <div class="videoMayor" id="videoMayor">
        <video class="video" id="video" ontimeupdate="actualizar()" src=""></video>
        <audio style="display: none" id="audio"></audio>
        <div class="menu" id="menu">
            <div class="menuAjustes" id="menuAjustes">
            <article>
                <button class="botonRegresar" id="botonRegresar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-skip-back">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 5v14l-12 -7z" />
                    <path d="M4 5l0 14" />
                </svg>
                </button>
                <button class="botonReanudar" id="botonReanudar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-play">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 4v16l13 -8z" />
                </svg>
                </button>
                <button class="botonPausar desactivado" id="botonPausar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-pause">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                    <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                </svg>
                </button>
                <button class="botonAvanzar" id="botonAvanzar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-skip-forward">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 5v14l12 -7z" />
                    <path d="M20 5l0 14" />
                </svg>
                </button>
                <button class="botonVolumenMuteado desactivado" id="botonVolumenMuteado">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-volume-off">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
                    <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
                    <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
                    <path d="M3 3l18 18" />
                </svg>
                </button>
                <button class="botonVolumenMedio desactivado" id="botonVolumenMedio">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-volume-2">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 8a5 5 0 0 1 0 8" />
                    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                </svg>
                </button>
                <button class="botonVolumenAlto" id="botonVolumenAlto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-volume">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 8a5 5 0 0 1 0 8" />
                    <path d="M17.7 5a9 9 0 0 1 0 14" />
                    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                </svg>
                </button>
                <p class="videoTiempo" id="videoTiempo">00:00 / 00:00</p>
            </article>
            <i class="videoMaximo" id="videoMaximo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-maximize">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                </svg>
            </i>
            <i class="videoMinimo desactivado" id="videoMinimo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-maximize">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 4l4 0l0 4" />
                <path d="M14 10l6 -6" />
                <path d="M8 20l-4 0l0 -4" />
                <path d="M4 20l6 -6" />
                <path d="M16 20l4 0l0 -4" />
                <path d="M14 14l6 6" />
                <path d="M8 4l-4 0l0 4" />
                <path d="M4 4l6 6" />
                </svg>
            </i>
            </div>
        </div>
    
        <div class="videoIconos" id="videoIconos">
            <i class="iconoRegresar desactivado" id="iconoRegresar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-rewind-backward-5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 18a6 6 0 1 0 0 -12h-11" />
                <path d="M7 9l-3 -3l3 -3" />
                <path d="M8 20h2a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-2v-3h3" />
            </svg>
            </i>
            <i class="iconoAvanzar desactivado" id="iconoAvanzar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-rewind-forward-5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 18a6 6 0 1 1 0 -12h11" />
                <path d="M13 20h2a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-2v-3h3" />
                <path d="M17 9l3 -3l-3 -3" />
            </svg>
            </i>
        </div>
        </div>
    </section>`

    let datos = obtenerdatos("usuario");

    const carita = document.querySelector("#carita");

    if (!document.querySelector("#contenedorVideo")) {

        datos.opciones = false;
        guardardatos("usuario", datos);

        contenedor.insertAdjacentHTML("afterbegin", contenedorMusica);
        contenedor.style.backgroundImage = "url('../Imagenes/hora.webp')";
        carita.remove();

        const video = document.querySelector("#video");
        const audio = document.querySelector("#audio");

        const nombreMusica = 'Los Prisioneros - Tren Al Sur 🚉 ;《Letra》';
        const response = await fetch(`http://localhost:3000/buscar/${nombreMusica}`);
        const data = await response.json();

        video.src = data.video;
        audio.src = data.audio;

        segundaGrabacion.stop();
        grabar();

        const botonReanudar = document.querySelector("#botonReanudar");
        const botonPausar = document.querySelector("#botonPausar");
        const botonRegresar = document.querySelector("#botonRegresar");
        const botonAvanzar = document.querySelector("#botonAvanzar");

        const videoMaximo = document.querySelector("#videoMaximo");
        const videoMinimo = document.querySelector("#videoMinimo");
        const videoMayor = document.querySelector("#videoMayor");

        const iconoRegresar = document.querySelector("#iconoRegresar");
        const iconoAvanzar = document.querySelector("#iconoAvanzar");

        botonReanudar.onclick = (e) => {

            const br = botonPausar.classList.contains("desactivado");

            if (br) botonPausar.classList.remove("desactivado"), botonReanudar.classList.add("desactivado"), audio.play(), video.play();

        }

        botonPausar.onclick = (e) => {

            const br = botonReanudar.classList.contains("desactivado");

            if (br) botonReanudar.classList.remove("desactivado"), botonPausar.classList.add("desactivado"), audio.pause(), video.pause();

        }

        botonRegresar.onclick = (e) => {

            audio.currentTime -= 5;
            video.currentTime -= 5;

            iconoRegresar.classList.remove("desactivado");
            setTimeout(() => iconoRegresar.classList.add("desactivado"), 1000);
        }

        botonAvanzar.onclick = (e) => {

            audio.currentTime += 5;
            video.currentTime += 5;

            iconoRegresar.classList.remove("desactivado");
            iconoAvanzar.classList.remove("desactivado");
            iconoRegresar.style.opacity = 0;

            setTimeout(() => {
                iconoAvanzar.classList.add("desactivado");
                iconoRegresar.classList.add("desactivado");
                iconoRegresar.style.opacity = 1;
            }, 1000);

        }

        videoMaximo.onclick = (e) => {

            const vmi = videoMinimo.classList.contains("desactivado");
            const vm = videoMayor.classList.contains("pantallaCompleta");

            if (!vm && vmi) videoMayor.requestFullscreen();

        }

        videoMinimo.onclick = (e) => {

            const vma = videoMaximo.classList.contains("desactivado");
            const vm = videoMayor.classList.contains("pantallaCompleta");

            if (vm && vma) document.exitFullscreen();

        }

    } else {

        datos.opciones = false;
        guardardatos("usuario", datos);

        contenedor.insertAdjacentHTML("afterbegin", `<img src="./Imagenes/cara.webp" alt="Cara" id="Cara" class="Cara" />`);

        const contenedorVideo = document.querySelector("#contenedorVideo");
        
        contenedorVideo.remove();
        
        segundaGrabacion.stop();
        grabar();
    }




    // const video = document.querySelector("#video");
    // const audio = document.querySelector("#audio");

    // const botonReanudar = document.querySelector("#botonReanudar");
    // const botonPausar = document.querySelector("#botonPausar");
    // const botonRegresar = document.querySelector("#botonRegresar");
    // const botonAvanzar = document.querySelector("#botonAvanzar");

    // const videoMaximo = document.querySelector("#videoMaximo");
    // const videoMinimo = document.querySelector("#videoMinimo");
    // const videoMayor = document.querySelector("#videoMayor");

    // const iconoRegresar = document.querySelector("#iconoRegresar");
    // const iconoAvanzar = document.querySelector("#iconoAvanzar");

    // const menuAjustes = document.querySelector("#menuAjustes");
    // const videoTiempo = document.querySelector("#videoTiempo");
    // const videoIconos = document.querySelector("#videoIconos");

    // async function insertarVideoYAudio() {
    //     const nombreMusica = 'Los Prisioneros - Tren Al Sur 🚉 ;《Letra》';
    //     const response = await fetch(`http://localhost:3000/buscar/${nombreMusica}`);
    //     const data = await response.json();

    //     video.src = data.video;
    //     audio.src = data.audio;
    // }

    // insertarVideoYAudio();

    // function actualizar() {

    //     const vt = video.currentTime;
    //     const at = audio.currentTime;

    //     videoTiempo.innerHTML = `${segundos(video.currentTime)} / ${segundos(video.duration)}`;

    //     if (vt < at) video.currentTime = at;
    //     else if (at < vt) audio.currentTime = vt;

    // }

    // botonReanudar.onclick = (e) => {

    //     const br = botonPausar.classList.contains("desactivado");

    //     if (br) botonPausar.classList.remove("desactivado"), botonReanudar.classList.add("desactivado"), audio.play(), video.play();

    // }

    // botonPausar.onclick = (e) => {

    //     const br = botonReanudar.classList.contains("desactivado");

    //     if (br) botonReanudar.classList.remove("desactivado"), botonPausar.classList.add("desactivado"), audio.pause(), video.pause();

    // }

    // botonRegresar.onclick = (e) => {

    //     audio.currentTime -= 5;
    //     video.currentTime -= 5;

    //     iconoRegresar.classList.remove("desactivado");
    //     setTimeout(() => iconoRegresar.classList.add("desactivado"), 1000);
    // }

    // botonAvanzar.onclick = (e) => {

    //     audio.currentTime += 5;
    //     video.currentTime += 5;

    //     iconoRegresar.classList.remove("desactivado");
    //     iconoAvanzar.classList.remove("desactivado");
    //     iconoRegresar.style.opacity = 0;

    //     setTimeout(() => {
    //         iconoAvanzar.classList.add("desactivado");
    //         iconoRegresar.classList.add("desactivado");
    //         iconoRegresar.style.opacity = 1;
    //     }, 1000);

    // }

    // videoMaximo.onclick = (e) => {

    //     const vmi = videoMinimo.classList.contains("desactivado");
    //     const vm = videoMayor.classList.contains("pantallaCompleta");

    //     if (!vm && vmi) videoMayor.requestFullscreen();

    // }

    // videoMinimo.onclick = (e) => {

    //     const vma = videoMaximo.classList.contains("desactivado");
    //     const vm = videoMayor.classList.contains("pantallaCompleta");

    //     if (vm && vma) document.exitFullscreen();

    // }

    // document.onfullscreenchange = () => {

    //     const vm = videoMayor.classList.contains("pantallaCompleta");
    //     const vma = videoMaximo.classList.contains("desactivado");
    //     const vmi = videoMinimo.classList.contains("desactivado");

    //     if (!vm && vmi) {

    //         videoMinimo.classList.remove("desactivado");

    //         videoMaximo.classList.add("desactivado");
    //         videoMayor.classList.add("pantallaCompleta");
    //         menuAjustes.classList.add("pantalla");
    //         videoIconos.classList.add("pantalla");

    //     } else if (vm && vma) {

    //         videoMinimo.classList.add("desactivado");

    //         videoMaximo.classList.remove("desactivado");
    //         videoMayor.classList.remove("pantallaCompleta");
    //         menuAjustes.classList.remove("pantalla");
    //         videoIconos.classList.remove("pantalla");

    //     }

    // }

    // function segundos(segundos) {

    //     const d = new Date(segundos * 1000);
    //     const m = (d.getMinutes() < 9) ? "0" + d.getMinutes() : d.getMinutes();
    //     const s = (d.getSeconds() < 9) ? "0" + d.getSeconds() : d.getSeconds();

    //     return `${m}:${s}`
    // };

}


export { musica };