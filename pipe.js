class Pipe {
    constructor(y, gap, w, speed) {
        this.speed = speed;
        let x = width + w / 2;
        this.x = x;
        this.x1 = x - w / 2;
        this.x2 = x + w / 2;
        this.y1 = 0;
        this.y2 = y - gap / 2;
        this.y3 = y + gap / 2;
        this.y4 = height;
        this.closest = false;
    }

    display() {
        strokeWeight(5);
        if (this.closest) {
            stroke(200, 0, 0);
            fill(255, 0, 0);
        } else {
            stroke(0, 200, 0);
            fill(64, 255, 64);
        }
        this.closest = false;
        rectMode(CORNERS);
        rect(this.x1, this.y1, this.x2, this.y2);
        rect(this.x1, this.y3, this.x2, this.y4);
    }

    update() {
        this.x1 -= this.speed;
        this.x2 -= this.speed;
        this.x -= this.speed;
    }

    check_hit(x1, y1, x2, y2) {
        return x2 > this.x1 && x1 < this.x2 && (y1 < this.y2 || y2 > this.y3);
    }
}