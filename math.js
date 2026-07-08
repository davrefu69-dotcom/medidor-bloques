;const METRICAS = {
    calcularTodo: function() {
        if (!CONFIG.IMAGEN_ORIGINAL.src || CONFIG.PUNTOS_TACTILES[0].x === 0) return;

        // Se reparó la lectura secuencial de los índices de las esquinas
        let anchoSup = Math.hypot(CONFIG.PUNTOS_TACTILES[1].x - CONFIG.PUNTOS_TACTILES[0].x, CONFIG.PUNTOS_TACTILES[1].y - CONFIG.PUNTOS_TACTILES[0].y);
        let anchoInf = Math.hypot(CONFIG.PUNTOS_TACTILES[2].x - CONFIG.PUNTOS_TACTILES[3].x, CONFIG.PUNTOS_TACTILES[2].y - CONFIG.PUNTOS_TACTILES[3].y);
        let promedioAnchoPx = (anchoSup + anchoInf) / 2;

        let altoIzq = Math.hypot(CONFIG.PUNTOS_TACTILES[3].x - CONFIG.PUNTOS_TACTILES[0].x, CONFIG.PUNTOS_TACTILES[3].y - CONFIG.PUNTOS_TACTILES[0].y);
        let altoDer = Math.hypot(CONFIG.PUNTOS_TACTILES[2].x - CONFIG.PUNTOS_TACTILES[1].x, CONFIG.PUNTOS_TACTILES[2].y - CONFIG.PUNTOS_TACTILES[1].y);
        let promedioAltoPx = (altoIzq + altoDer) / 2;

        let cmPixel = parseFloat(document.getElementById('cmPixel').value);
        let fondo = parseFloat(document.getElementById('fondoMetros').value);
        let densidad = parseFloat(document.getElementById('tipoPiedra').value);

        let anchoMetros = (promedioAnchoPx * cmPixel) / 100;
        let altoMetros = (promedioAltoPx * cmPixel) / 100;
        let volumenM3 = anchoMetros * altoMetros * fondo;
        let pesoToneladas = volumenM3 * densidad;

        UI.actualizarTarjetas(anchoMetros, altoMetros, volumenM3, pesoToneladas);
    }
};
