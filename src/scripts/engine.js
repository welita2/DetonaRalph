const state = { 
    view: {      //Funções visuais
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {   //Valores de funcionamento interno
        
        gameVelocity:800,  //velocidade da mov do enemy
        hitPosition: 0,     //posicao enemy
        result:0,        //pontuacao
        currentTime: 60,  //tempo
    },
    actions:{ 
        timerId:null,  
        countDownTimerId: setInterval(countDown, 1000), // chama tempo
    }
};

function playSound(){
    let audio = new Audio("src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){  //função remove o inimigo de um local fixo
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9); // nmr aleatório de 1 a 9
    let randomSquare  = state.view.squares[randomNumber]; // quadrado aleatório
    randomSquare.classList.add("enemy");  // colocando o inimigo em um quadrado aleatório
    state.values.hitPosition = randomSquare.id; //guarda o ID do quadrado aleatório que está enemy
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity); // a cada x tempo vai chamar a função
}

function countDown(){
    state.values.currentTime--; //diminui timer
    state.view.timeLeft.textContent = state.values.currentTime; 
    
    if(state.values.currentTime <= 0){ //verifica se o tempo acabou
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game over!O se resultado foi: " + state.values.result);
    }
}
function addListenerHitbox(){  //espera um evento acontecer
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
           if(square.id === state.values.hitPosition){ //compara quadrado clicado com quadrado onde está enemy
            state.values.result++;   // se for igual adiciona +1
            state.view.score.textContent = state.values.result; //muda o texto da pontuação
            state.values.hitPosition = null; //nao pontuar ao clicar mais no mesmo lugar;
            playSound();
            }
        });
    } );
}

function init(){ //funcao principal
   moveEnemy();
   addListenerHitbox();
}

init();