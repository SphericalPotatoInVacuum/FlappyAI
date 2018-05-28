var nSlider;
var nText;
var n = 0;
var cSlider;
var cText;
var c = 0;
var aSlider;
var aText;
var angle = 0;
var sSlider;
var sText;
var s = 0;
var updateBtn;

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    colorMode(HSB);
    background(0);
    noStroke();
    updateBtn = createButton("Update").addClass("update");
    updateBtn.mouseClicked(update);
    cSlider = createSlider(0, 50, 10, 1).addClass("cSlider");
    cText = createP().addClass("cText");
    nSlider = createSlider(0, 6000, 2000, 100).addClass("nSlider");
    nText = createP().addClass("nText");
    aSlider = createSlider(137, 138, 137.78, 0.02).addClass("aSlider");
    aText = createP().addClass("aText");
    sSlider = createSlider(1, 50, 32, 1).addClass("sSlider");
    sText = createP().addClass("sText");
    update();
}

function draw() {
    if (c != cSlider.value() | n != nSlider.value() | angle != aSlider.value() | s != sSlider.value()) {
        update();
        console.log("FUCK");
    }
}

function update() {
    background(0);
    translate(width / 2, height / 2);
    c = cSlider.value();
    cText.html("Radius coeff.: " + c);
    n = nSlider.value();
    nText.html("Total count: " + n);
    angle = aSlider.value();
    aText.html("Angle delta: " + angle);
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