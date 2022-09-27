
const music = new Audio('./assets/music.wav');
music.volume = 0.2;
music.loop = true;
const myGunSound = new Audio('./assets/toy-gun-shot.wav');
const enemyGunSound = new Audio('./assets/toy-gun-shot.wav');
enemyGunSound.volume = 0.6;
const oofSound = new Audio('./assets/oof.wav')

healthPoints = 100;

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
    }, 1000);

    setTimeout( () => {
        enemy.classList.remove('showing');
    }, 3000);
}

function enemyShoots(enemy){
    if(enemy.classList.contains('dead')) return;

    enemyGunSound.play();

    enemy.classList.add('shooting');
    updateHealthPoints(healthPoints - 25);

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

    let randomDelay = Math.random() * 2000 + 1000;

    setTimeout( () => {
        enemyAppears(enemy);
        randomEnemyAttacks();
    }, randomDelay)
}

function newGame(){
    randomEnemyAttacks();
    document.querySelector('#start-btn').style.display = 'none';
    music.play();
}