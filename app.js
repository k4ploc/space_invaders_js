const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.results');
let currentShooterIndex = 202;
const width = 15;
const aliensRemoved = [];
let invidersId;
let isGoingRight = true;
let direction = 1;
let results = 0;

for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));
console.log(squares);

const alienInviders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInviders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInviders[i]].classList.add('invader');
        }
    }
}

draw();

squares[currentShooterIndex].classList.add('shooter');

function moveShooter(event) {
    squares[currentShooterIndex].classList.remove('shooter');
    switch (event.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -= 1;
            }
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1;
            }
            break;
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter);

function remove() {
    for (const element of alienInviders) {
        squares[element].classList.remove('invader');
    }
}

function moveInvaders() {
    const leftEdge = alienInviders[0] % width === 0;
    const rightEdge = alienInviders[alienInviders.length - 1] % width === width - 1;

    remove();
    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInviders.length; i++) {
            alienInviders[i] += width + 1;
            direction = -1
            isGoingRight = false;
        }
    }
    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInviders.length; i++) {
            alienInviders[i] += width - 1;
            direction = 1
            isGoingRight = true;
        }
    }
    for (let i = 0; i < alienInviders.length; i++) {
        alienInviders[i] += direction;
    }
    draw();

    if (squares[currentShooterIndex].classList.contains('invader')) {
        resultDisplay.innerHTML = 'GAME OVER';
        clearInterval(invidersId);
    }
    // console.log('aliensRemoved', aliensRemoved.length)
    // console.log('alienInviders', alienInviders.length)
    if (aliensRemoved.length === alienInviders.length) {
        resultDisplay.innerHTML = 'YOU WIN';
        clearInterval(invidersId);
    }
}

invidersId = setInterval(moveInvaders, 600);

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;

        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId);

            const alienRemoved = alienInviders.indexOf(currentLaserIndex);
            console.log('alienRemoved2::', alienRemoved);

            if (!aliensRemoved.includes(alienRemoved)) {
                aliensRemoved.push(alienRemoved);
                results++;
                resultDisplay.innerHTML = results.toString();
            }
            console.log(aliensRemoved);

        }
    }

    if (e.key === 'ArrowUp') {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot)


function touchMoveShooter(event) {
    squares[currentShooterIndex].classList.remove('shooter');
    if (event.touches[0].clientX < window.innerWidth / 2) {
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
    } else {
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
    }
    squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('touchstart', touchMoveShooter);

function touchShoot() {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId);

            const alienRemoved = alienInviders.indexOf(currentLaserIndex);
            console.log('alienRemoved2::', alienRemoved);

            if (!aliensRemoved.includes(alienRemoved)) {
                aliensRemoved.push(alienRemoved);
                results++;
                resultDisplay.innerHTML = results.toString();
            }
            console.log(aliensRemoved);
        }
    }

    laserId = setInterval(moveLaser, 100);
}

document.addEventListener('touchend', touchShoot);
