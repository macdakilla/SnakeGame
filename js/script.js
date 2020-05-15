let field = document.createElement('div');

document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.querySelectorAll('.excel'),
    x = 1,
    y = 10;

for (let i = 0; i < excel.length; i++) {
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
    if(x == 11) {
        x = 1;
        y--;
    }
}

function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3),
        posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}

let cordinates = generateSnake(),
    snakeBody = [document.querySelector('[posX = "' + cordinates[0] + '"][posY = "' + cordinates[1] + '"]'), document.querySelector('[posX = "' + (cordinates[0] - 1) + '"][posY = "' + cordinates[1] + '"]'),document.querySelector('[posX = "' + (cordinates[0] - 2) + '"][posY = "' + cordinates[1] + '"]')];

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

let mouse;

function createMouse() {
    function generateMouse() {
        let posX = Math.round(Math.random() * (10 - 1) + 1),
            posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }
    let mouseCordinates = generateMouse();

    mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    while(mouse.classList.contains('snakeBody')) {
        let mouseCordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    }
    mouse.classList.add('mouse');
}

createMouse();

let direction = 'right',
    steps = false,
    input = document.createElement('div'),
    score = 0;
document.body.appendChild(input);
input.style.cssText = 'width: 50%; margin: auto; margin-top: 40px; border: 1px solid #000000; text-align: center; font-size: 30px;';
input.innerHTML = `Ваши очки: ${score}`

function move() {
    let snakeCordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();

    if(direction == 'right') {
        if(snakeCordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0]+1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCordinates[1] + '"]'));
        }
    } else if(direction == 'left') {
        if(snakeCordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0]-1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCordinates[1] + '"]'));
        }
    } else if(direction == 'up') {
        if(snakeCordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1]+1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "1"]'));
        }
    } else if(direction == 'down') {
        if(snakeCordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1]-1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "10"]'));
        }
    }

    if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length-1].getAttribute('posX'),
            b = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a +'"][posY = "' + b +'"]'));
        createMouse();
        score += 10;
        if(score == 960) {
            setTimeout(() => {
                input.style.backgroundColor = '#15ff00';
                input.innerHTML = `Вы победили! Ваши очки: ${score}`;
            });
    
            clearInterval(interval);
            snakeBody[0].style.background = '#15ff00';
        }
        input.innerHTML = `Ваши очки: ${score}`
    }

    if(snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            input.style.backgroundColor = '#ff0000';
            input.innerHTML = `Игра окончена! Ваши очки: ${score}`;
        });

        clearInterval(interval);
        snakeBody[0].style.background = '#ff0000';
    }

    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
    steps = true;
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', function(e) {
    if(steps == true) {
        if(e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        }
        else if(e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        }
        else if(e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        }
        else if(e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
});

