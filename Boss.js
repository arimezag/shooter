class Boss extends Character {
    /**
     * @param game {Game}
     */
    constructor(game) {
        const height = OPPONENT_HEIGHT * game.width / 100,
            width = OPPONENT_WIDTH * game.width / 100,
            x = getRandomNumber(game.width - width / 2),
            y = 0,
            speed = OPPONENT_SPEED * 2, // Velocidad del jefe es el doble que la del oponente normal
            myImage = 'assets/boss.png', // Imagen del jefe
            myImageDead = 'assets/boss_dead.png'; // Imagen del jefe cuando está muerto

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.direction = "R"; // Dirección inicial hacia la derecha
    }

    /**
     * Sobreescribe el método shoot para que el jefe dispare con mayor frecuencia
     */
    shoot() {
        if (!this.dead && !this.game.ended) {
            if (!this.game.paused) {
                this.game.shoot(this);
            }
            setTimeout(() => this.shoot(), 500 + getRandomNumber(1500)); // Disparos más frecuentes que los oponentes normales
        }
    }

    /**
     * Sobreescribe el método collide para manejar cuando el jefe es derrotado
     * @param shot {Shot} El disparo que alcanza al jefe
     */
         collide(shot) {
            if (!this.dead) {
                this.dead = true;
                this.myImage = this.myImageDead; // Cambiar a la imagen de jefe muerto
                setTimeout(() => {
                    this.game.removeOpponent(); // Eliminar al jefe del juego
                    if (!this.game.ended) {
                        this.game.endGame(); // Terminar el juego si el jefe es derrotado
                    }
                }, 2000); // Esperar 2 segundos antes de eliminar al jefe
            }
        }

    /**
     * Actualiza la posición del jefe
     */
    update() {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.y = 0;
            }
            if (this.direction === "R") { // Hacia la derecha
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.direction = "L";
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.direction = "R";
            }
        }
    }
}
