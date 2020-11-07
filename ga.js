function nextGen() {

    calculateFitness();

    for (let i = 0; i < POPULATION; i++) {
        players[i] = pickOne();
    }

    savedPlayers = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - savedPlayers[index].fitness;
        index++;
    }
    index--;
    let bird = savedPlayers[index];
    let child = new Player(bird.brain.copy());
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    for (let player of savedPlayers) {
        player.score = pow(player.score, 2);
    }
    for (let player of savedPlayers) {
        sum += player.score;
    }
    for (let player of savedPlayers) {
        player.fitness = player.score / sum;
    }
}