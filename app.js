
const music = new Audio('./assets/music.wav');
music.volume = 0.2;
music.loop = true;
const myGunSound = new Audio('./assets/toy-gun-shot.wav');
const enemyGunSound = new Audio('./assets/toy-gun-shot.wav');
enemyGunSound.volume = 0.6;
const oofSound = new Audio('./assets/oof.wav')

let healthPoints = 100;
let enemies = [];
const enemyCount = 10;
const damageAmount = 25;

function updateHealthPoints(points){
    healthPoints = points;
    const healthBar = document.querySelector('#health-bar');
    healthBar.style.width = points + '%';
    oofSound.play();

    if(healthPoints <= 0){
        setTimeout(()=>{
            alert('GAME OVER!');
            window.location.reload();
        }, 1000)
    }
}

function iShoot(enemy){
    enemy.classList.add('dead');

    if(!livingEnemies().length){
        setTimeout(()=>{
            alert('VICTORY!');
            window.location.reload();
        }, 1000)
    }
}

function enemyAppears(enemy){
    enemy.classList.add('showing');

    setTimeout( () => {
        enemyShoots(enemy);
    }, 888);

    setTimeout( () => {
        enemy.classList.remove('showing');
    }, 1200);
}

function enemyShoots(enemy){
    if(enemy.classList.contains('dead') || !enemy.classList.contains('showing')) return;

    enemyGunSound.play();

    enemy.classList.add('shooting');
    updateHealthPoints(healthPoints - damageAmount);

    setTimeout( () => {
        enemy.classList.remove('shooting');
    }, 200);
}

function livingEnemies(){
    return document.querySelectorAll('.enemy:not(.dead)');
}

function randomEnemyAttacks(){
    let randomEnemyNumber = Math.random() * livingEnemies().length;
    randomEnemyNumber = Math.floor(randomEnemyNumber);
    let enemy = livingEnemies()[randomEnemyNumber];

    let randomDelay = Math.random() * 1500 + 500;

    setTimeout( () => {
        enemyAppears(enemy);
        randomEnemyAttacks();
    }, randomDelay)
}

function spawnEnemies(){
    for (let i = 0; i < enemyCount; i++ ){
        spawnNewEnemy();
    }
}

function spawnNewEnemy(){
    const gameFrame = document.getElementById('game-frame');
    const rect = gameFrame.getBoundingClientRect();
    let randomLeftPostion = Math.random() * rect.width;
    randomLeftPostion = Math.floor(randomLeftPostion);
    randomLeftPostion = Math.min(randomLeftPostion, rect.width - 150);

    const enemyElement = document.createElement('div');
    enemyElement.classList.add('enemy');
    enemyElement.setAttribute("onclick","iShoot(this)");
    enemyElement.style.left = randomLeftPostion + 'px';
    gameFrame.appendChild(enemyElement);

    enemies.push(enemyElement);
}

function newGame(){
    spawnEnemies();
    randomEnemyAttacks();
    document.querySelector('#start-btn').style.display = 'none';
    music.play();
}
