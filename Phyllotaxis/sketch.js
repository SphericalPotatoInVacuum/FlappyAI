var n = 6000;
var cSlider;
var updateBtn;

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    colorMode(HSB);
    background(0);
    noStroke();
    updateBtn = createButton("Update").addClass("update");
    updateBtn.mouseClicked(update);
    cSlider = createSlider(0, 50, 12, 1).addClass("cSlider");
    update();
}

function draw() {

}

function update() {
    background(0);
    let c = cSlider.value();
    translate(width / 2, height / 2);
    for (let i = 0; i < n; i++) {
        let angle = 137.5 * i;
        let r = c * Math.sqrt(i);
        let x = r * sin(angle);
        let y = r * cos(angle);
        fill(r * 2 % 350, 255, 255);
        ellipse(x, y, 40);
    }
}