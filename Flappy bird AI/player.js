class Player {
    constructor(brain) {
        this.x = width / 2;
        this.y = height / 2;
        this.w = 30;
        this.v = 0;
        this.a = 0.5;

        this.hitbox = {
            x1: this.x - this.w / 2,
            x2: this.x + this.w / 2,
            y1: this.y - this.w / 2,
            y2: this.y + this.w / 2
        }

        this.score = 0;
        this.fitness = 0;

        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 16, 2);
        }
    }

    display() {
        stroke(0);
        strokeWeight(1);
        fill(0, 50);
        ellipse(this.x, this.y, this.w);
    }

    think(pipes) {
        let closest = null;
        let diff, minDiff = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            diff = pipes[i].x - this.x;
            if (diff < minDiff && diff > -pipeWidth / 2 - 15) {
                closest = pipes[i];
                minDiff = diff;
            }
        }
        closest.closest = true;
        let input = [];
        input[0] = map(this.y, 0, height, 0, 1);
        input[1] = map(closest.y2, 0, height, 0, 1);
        input[2] = map(closest.y3, 0, height, 0, 1);
        input[3] = map(closest.x1, this.x, width, 0, 1);
        input[4] = map(this.v, -10, 10, 0, 1);

        let output = this.brain.predict(input);

        if (output[1] > output[0]) {
            this.jump();
        }
    }

    update() {
        this.v += this.a;
        this.y += this.v;

        this.hitbox = {
            x1: this.x - this.w / 2,
            x2: this.x + this.w / 2,
            y1: this.y - this.w / 2,
            y2: this.y + this.w / 2
        }

        this.score++;
    }

    mutate() {
        function mutate(x) {
            if (random(1) < 0.1) {
                let offset = randomGaussian() * 0.5;
                let newx = x + offset;
                return newx;
            } else {
                return x;
            }
        }
        this.brain.mutate(mutate);
    }

    jump() {
        this.v = -10;
    }
}