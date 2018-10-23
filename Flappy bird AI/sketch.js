const pipeSpeed = 4;
const pipeWidth = 80;
const pipeGap = 150;
const POPULATION = 300;

let pipes = [];
let players = [];
let savedPlayers = [];
let counter = 0;
let gen = 1;
let speedSlider, speedSpan;
let score = 0;
let scoreSpan;
let highScore = 0;
let highScoreSpan;
let bestBrain = null;
let loadedBrain = null;
let saveBrainB;
let loadBrainB;
let runLoadedB;
let fileInput;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');

    scoreSpan = select('#score');
    highScoreSpan = select('#highScore');

    saveBrainB = select('#saveButton');
    saveBrainB.mousePressed(saveBest);

    loadBrainB = select('#loadButton');
    loadBrainB.mousePressed(loadBest);

    runLoadedB = select('#runLoaded');
    runLoadedB.mousePressed(runLoaded);

    fileInput = document.getElementById('fileInput');
    fileInput.addEventListener("change", handleFiles, false);

    for (let i = 0; i < POPULATION; i++) {
        players.push(new Player());
    }
}

function draw() {
    for (let n = 0; n < speedSlider.value(); n++) {

        if (counter % 75 == 0) {
            pipes.push(new Pipe(height / 2 + random(300) - 150, pipeGap, pipeWidth, pipeSpeed));
        }
        counter++;

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            if (pipes[i].x2 < 0) {
                pipes.splice(i, 1);
            }
        }

        for (let i = players.length - 1; i >= 0; i--) {
            let player = players[i];
            player.think(pipes);
            player.update();

            score = players[0].score;
            if (score > highScore) {
                highScore = score;
            }

            if (check_hits(player)) {
                savedPlayers.push(players.splice(i, 1)[0]);
            }
        }

        if (players.length == 0) {
            counter = 0;
            if (savedPlayers[POPULATION - 1].score == highScore) {
                bestBrain = savedPlayers[POPULATION - 1].brain.copy();
            }
            nextGen();
            gen++;
            pipes = [];
        }
    }

    // All the drawing stuff

    background(168, 208, 255);

    for (let player of players) {
        player.display();
    }

    for (let pipe of pipes) {
        pipe.display();
    }

    speedSpan.html(speedSlider.value());
    scoreSpan.html(score);
    highScoreSpan.html(highScore);

    noStroke();
    fill(0);
    text("Gen: " + gen.toString(), 10, 10, 100, 30);
}

function check_hits(player) {
    let hitbox = player.hitbox;
    if (hitbox.y1 < 0 || hitbox.y2 > height) {
        return true;
    }
    for (let pipe of pipes) {
        if (pipe.check_hit(hitbox.x1, hitbox.y1, hitbox.x2, hitbox.y2)) {
            return true;
        }
    }
    return false;
}

function saveBest() {
    if (score > highScore) {
        bestBrain = players[0].brain.copy();
    }
    let savedGen = gen;
    if (bestBrain) {
        bestBrain.gen = savedGen;
        saveJSON(bestBrain, 'best.json');
    }
}

function loadBest() {
    fileInput.click();
}

function handleFiles() {
    if (fileInput.files.length != 1) {
        alert('Upload ONE file');
    }

    let file = fileInput.files[0];

    let fr = new FileReader();
    fr.onload = (e) => {
        try {
            loadedBrain = JSON.parse(e.target.result);
        } catch (ex) {
            alert('Upload a valid file!');
        }
    }
    fr.readAsText(file);
}

function runLoaded() {
    if (!loadedBrain) {
        alert('Upload something first!');
        return;
    }
    counter = 0;
    pipes = [];
    gen = loadedBrain.gen;
    let brain = NeuralNetwork.deserialize(loadedBrain);
    savedPlayers = [new Player(brain)];
    nextGen();
}