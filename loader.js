// Este nuevo archivo se encarga exclusivamente de desencadenar la carga de fotos sin bloqueos
function inicializarCargaArchivo(elementoInput) {
    elementoInput.addEventListener('change', function(e) {
        if (!e.target.files || e.target.files.length === 0) return;
        const archivo = e.target.files[0]; // Corrección estructural definitiva (.files[0])
        const lector = new FileReader();
        
        lector.onload = function(event) {
            CONFIG.IMAGEN_ORIGINAL.onload = function() {
                document.getElementById('textoEspera').style.display = 'none';
                VISOR.canvas.style.display = 'block';
                
                VISOR.canvas.width = CONFIG.IMAGEN_ORIGINAL.width;
                VISOR.canvas.height = CONFIG.IMAGEN_ORIGINAL.height;
                
                // Distribución limpia de vértices con índices numéricos fijos
                CONFIG.PUNTOS_TACTILES[0] = { x: VISOR.canvas.width * 0.25, y: VISOR.canvas.height * 0.25 };
                CONFIG.PUNTOS_TACTILES[1] = { x: VISOR.canvas.width * 0.75, y: VISOR.canvas.height * 0.25 };
                CONFIG.PUNTOS_TACTILES[2] = { x: VISOR.canvas.width * 0.75, y: VISOR.canvas.height * 0.75 };
                CONFIG.PUNTOS_TACTILES[3] = { x: VISOR.canvas.width * 0.25, y: VISOR.canvas.height * 0.75 };

                document.getElementById('instrucciones').style.display = 'block';
                document.getElementById('btnRegistrar').disabled = false;
                
                VISOR.redibujar();
                METRICAS.calcularTodo();
            };
            CONFIG.IMAGEN_ORIGINAL.src = event.target.result;
        };
        lector.readAsDataURL(archivo);
    });
}
