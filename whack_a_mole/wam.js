let wamMsg = document.getElementById('wamMsg');
let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let moleInterval, plantInterval;
let moleSpeed = 1000;
let plantSpeed = 2000;
let level = 1;

window.onload = function() {
    setGame();
}

function setGame() {
    if (!document.getElementById('board').children.length) {
        for (let i = 0; i < 9; i++) {
            let tile = document.createElement("div");
            tile.id = i.toString();
            tile.addEventListener('click', selectTile);
            document.getElementById('board').appendChild(tile);
        }
    }
    clearIntervals();
    startIntervals();
}

function startIntervals() {
    // Start the mole and plant intervals with the current speeds
    moleInterval = setInterval(setMole, moleSpeed);
    plantInterval = setInterval(setPlant, plantSpeed);
}

function clearIntervals() {
    clearInterval(moleInterval);
    clearInterval(plantInterval);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement('img');
    mole.src = 'media/monty-mole.png';

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement('img');
    plant.src = 'media/piranha-plant.png';

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

let resetWamButton = document.getElementById('reset-wam-button');
function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById('score').innerText = "Score: " + score.toString(); //update score html
        checkScoreForSpeedIncrease();
    }
    else if (this == currPlantTile) {
        document.getElementById('score').innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
        resetWamButton.classList.remove('hidden');
    }
}

function checkScoreForSpeedIncrease() {
    // Every 100 points, decrease the interval speed
    if (score % 100 === 0) {
        increaseGameSpeed();
    }
}

function increaseGameSpeed() {
    // Decrease the speed, ensuring it doesn't go too fast
    moleSpeed = Math.max(300, moleSpeed - 100);
    plantSpeed = Math.max(300, plantSpeed - 200);
    level = (level + 1);

    wamMsg.textContent = 'Level ' + level;
    wamMsg.classList.add('flourish');
    setTimeout(() => {
        wamMsg.classList.remove('flourish');
    }, 1000);

   clearIntervals();
   startIntervals();
}

resetWamButton.addEventListener('click', function(e) {
  e.preventDefault();

  score = 0;
  gameOver = false;
  level = 1;
  moleSpeed = 1000;
  plantSpeed = 2000;

  document.getElementById('score').innerText = "Score: 0";

  resetWamButton.classList.add('hidden');

  setGame();
});
