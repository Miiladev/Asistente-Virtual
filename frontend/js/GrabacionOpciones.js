import { recognition, Asistida, Grabar } from '../js/Grabadora.js';
import { GrabacionActivada } from '../js/Botones.js';




async function AsistenteFunciones(transcripcion) {

    await recognition.abort();

    if (GrabacionActivada == true && Asistida == false) {




        console.log(transcripcion);



        setTimeout(Grabar(), 10)


    }


};

export { AsistenteFunciones };