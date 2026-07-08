const VISOR = {
    canvas: document.getElementById('canvasPreview'),
    ctx: document.getElementById('canvasPreview').getContext('2d'),

    redibujar: function() {
        if (!CONFIG.IMAGEN_ORIGINAL.src || CONFIG.PUNTOS_TACTILES[0].x === 0) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(CONFIG.IMAGEN_ORIGINAL, 0, 0);

        this.ctx.beginPath();
        this.ctx.moveTo(CONFIG.PUNTOS_TACTILES[0].x, CONFIG.PUNTOS_TACTILES[0].y);
        this.ctx.lineTo(CONFIG.PUNTOS_TACTILES[1].x, CONFIG.PUNTOS_TACTILES[1].y);
        this.ctx.lineTo(CONFIG.PUNTOS_TACTILES[2].x, CONFIG.PUNTOS_TACTILES[2].y);
        this.ctx.lineTo(CONFIG.PUNTOS_TACTILES[3].x, CONFIG.PUNTOS_TACTILES[3].y);
        this.ctx.closePath();
        this.ctx.strokeStyle = "#2ecc71";
        this.ctx.lineWidth = Math.max(6, this.canvas.width * 0.008);
        this.ctx.stroke();

        CONFIG.PUNTOS_TACTILES.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, Math.max(20, this.canvas.width * 0.016), 0, 2 * Math.PI);
            this.ctx.fillStyle = "rgba(231, 76, 60, 0.95)";
            this.ctx.fill();
            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        });
    },

    obtenerCoordenadasCelular: function(e) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        return {
            x: (touch.clientX - rect.left) * (this.canvas.width / rect.width),
            y: (touch.clientY - rect.top) * (this.canvas.height / rect.height)
        };
    }
};
