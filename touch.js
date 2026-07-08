// Maneja de forma aislada las pulsaciones táctiles de pantallas móviles
const MOTOR_TACTIL = {
    conectar: function() {
        VISOR.canvas.addEventListener('touchstart', function(e) {
            const coords = VISOR.obtenerCoordenadasCelular(e);
            const margenDedo = CONFIG.RADIO_PUNTO * (VISOR.canvas.width / VISOR.canvas.clientWidth);
            CONFIG.PUNTO_SELECCIONADO = CONFIG.PUNTOS_TACTILES.find(p => Math.hypot(p.x - coords.x, p.y - coords.y) < margenDedo);
        }, { passive: false });

        VISOR.canvas.addEventListener('touchmove', function(e) {
            if (!CONFIG.PUNTO_SELECCIONADO) return;
            e.preventDefault(); // Detiene el scroll nativo del celular
            const coords = VISOR.obtenerCoordenadasCelular(e);
            CONFIG.PUNTO_SELECCIONADO.x = Math.max(0, Math.min(VISOR.canvas.width, coords.x));
            CONFIG.PUNTO_SELECCIONADO.y = Math.max(0, Math.min(VISOR.canvas.height, coords.y));
            VISOR.redibujar();
            METRICAS.calcularTodo();
        }, { passive: false });

        window.addEventListener('touchend', () => CONFIG.PUNTO_SELECCIONADO = null);
    }
};
