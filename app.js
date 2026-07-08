// Orquestador principal que une y enciende todos los archivos al abrir la web
document.getElementById('btnCamara').addEventListener('click', () => document.getElementById('inputCamara').click());
document.getElementById('btnGaleria').addEventListener('click', () => document.getElementById('inputGaleria').click());
document.getElementById('btnExcel').addEventListener('click', () => EXCEL.exportarArchivo());
document.getElementById('btnRegistrar').addEventListener('click', () => EXCEL.agregarRegistro());
document.getElementById('btnLimpiar').addEventListener('click', limpiarTodoElLote);

['tipoPiedra', 'fondoMetros', 'cmPixel'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => { METRICAS.calcularTodo(); VISOR.redibujar(); });
});

// Inicializar cargadores y motores de gestos
inicializarCargaArchivo(document.getElementById('inputCamara'));
inicializarCargaArchivo(document.getElementById('inputGaleria'));
MOTOR_TACTIL.conectar();
MOTOR_MOUSE.conectar();

function limpiarTodoElLote() {
    if (confirm("¿Vaciar registro?")) {
        CONFIG.LOTE_HISTORIAL = [];
        UI.actualizarTabla();
        UI.actualizarTarjetas(0,0,0,0);
        VISOR.canvas.style.display = 'none';
        document.getElementById('textoEspera').style.display = 'block';
        document.getElementById('instrucciones').style.display = 'none';
        document.getElementById('btnRegistrar').disabled = true;
    }
}
