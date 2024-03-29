function obtenerTranscripcion(event) {
    let transcripcion = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcripcion += event.results[i][0].transcript.trim();
    }
    return transcripcion;
}

export { obtenerTranscripcion };