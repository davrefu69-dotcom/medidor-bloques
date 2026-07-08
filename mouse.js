// Maneja la compatibilidad extra para ratón en caso de que abras la web en PC
const MOTOR_MOUSE = {
    conectar: function() {
        VISOR.canvas.addEventListener('mousedown', function(e) {
            const coords = VISOR.obtenerCoordenadasCelular(e);
            const margenToque = CONFIG.RADIO_PUNTO * (VISOR.canvas.width / VISOR.canvas.clientWidth);
            CONFIG.PUNTO_SELECCIONADO = CONFIG.PUNTOS_TACTILES.find(p => Math.hypot(p.x - coords.x, p.y - coords.y) < margenToque);
        });

        VISOR.canvas.addEventListener('mousemove', function(e) {
            if (!CONFIG.PUNTO_SELECCIONADO) return;
            const coords = VISOR.obtenerCoordenadasCelular(e);
            CONFIG.PUNTO_SELECCIONADO.x = Math.max(0, Math.min(VISOR.canvas.width, coords.x));
            CONFIG.PUNTO_SELECCIONADO.y = Math.max(0, Math.min(VISOR.canvas.height, coords.y));
            VISOR.redibujar();
            METRICAS.calcularTodo();
        });

        window.addEventListener('mouseup', () => CONFIG.PUNTO_SELECCIONADO = null);
    }
};
