
document.onfullscreenchange = () => {

    const menuAjustes = document.querySelector("#menuAjustes");
    const videoIconos = document.querySelector("#videoIconos");

    const vm = videoMayor.classList.contains("pantallaCompleta");
    const vma = videoMaximo.classList.contains("desactivado");
    const vmi = videoMinimo.classList.contains("desactivado");

    if (!vm && vmi) {

        videoMinimo.classList.remove("desactivado");

        videoMaximo.classList.add("desactivado");
        videoMayor.classList.add("pantallaCompleta");
        menuAjustes.classList.add("pantalla");
        videoIconos.classList.add("pantalla");

    } else if (vm && vma) {

        videoMinimo.classList.add("desactivado");

        videoMaximo.classList.remove("desactivado");
        videoMayor.classList.remove("pantallaCompleta");
        menuAjustes.classList.remove("pantalla");
        videoIconos.classList.remove("pantalla");

    }

}

function actualizar() {

    const video = document.querySelector("#video");
    const audio = document.querySelector("#audio");
    const videoTiempo = document.querySelector("#videoTiempo");

    if (video && audio) {
        const vt = video.currentTime;
        const at = audio.currentTime;

        videoTiempo.innerHTML = `${segundos(video.currentTime)} / ${segundos(video.duration)}`;

        if (vt < at) video.currentTime = at;
        else if (at < vt) audio.currentTime = vt;
    }

}

function segundos(segundos) {

    const d = new Date(segundos * 1000);
    const m = (d.getMinutes() < 9) ? "0" + d.getMinutes() : d.getMinutes();
    const s = (d.getSeconds() < 9) ? "0" + d.getSeconds() : d.getSeconds();

    return `${m}:${s}`
};
