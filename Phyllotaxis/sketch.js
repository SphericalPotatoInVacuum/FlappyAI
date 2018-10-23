let nSlider;
let nText;
let n = 0;
let cSlider, cText; // Radius Coefficient slider and text element
let c = 0; // Radius Coefficient itself
let aSlider;
let aText;
let angle = 0;
let sSlider;
let sText;
let s = 0;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    angleMode(DEGREES);
    colorMode(HSB);
    background(0);
    noStroke();

    cText = select('#rCoef');
    cSlider = select('#rCoefSlider');
    nText = select('#dotCount');
    nSlider = select('#dotCountSlider');
    aText = select('#aDelta');
    aSlider = select('#aDeltaSlider');
    sText = select('#dotSize');
    sSlider = select('#dotSizeSlider');

    update();
}

function draw() {
    if (c != cSlider.value() | n != nSlider.value() | angle != aSlider.value() | s != sSlider.value()) {
        update();
    }
}

function update() {
    background(0);
    translate(width / 2, height / 2);
    c = cSlider.value();
    cText.html(c);
    n = nSlider.value();
    nText.html(n);
    angle = aSlider.value();
    aText.html(angle);
    s = sSlider.value();
    sText.html("Dot size: " + s);
    for (let i = 0; i < n; i++) {
        let a = angle * i;
        let r = c * Math.sqrt(i);
        let x = r * sin(a);
        let y = r * cos(a);
        fill(-(r - a / 2) % 360, 255, 255);
        ellipse(x, y, s);
    }
}