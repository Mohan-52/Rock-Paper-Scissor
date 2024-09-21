function pickComputerMove(){
    const randomNumber=Math.random();
  
    if (randomNumber>=0 && randomNumber<1/3){
      computerMove="rock";
    }
    else if (randomNumber>=1/3 && randomNumber<2/3){
      computerMove="paper";
    }
    else if(randomNumber>=2/3 && randomNumber<1){
      computerMove="scissors";
    }
    return computerMove;
}



let score=JSON.parse(localStorage.getItem('score')) ||
{
  wins:0,
  losses:0,
  ties:0
};

updateScoreElement();

let isAutoPlay=false;
let intervalId;

function autoPlay(){
  if(!isAutoPlay){
  intervalId=setInterval(()=>{
    
    const playerMove=pickComputerMove();
    playGame(playerMove);

  },1000);
  isAutoPlay=true;
}else {
  clearInterval(intervalId);
  isAutoPlay=false;
}
}

function playGame(playerMove){
  
  const computerMove= pickComputerMove();

  let result='';

  if (playerMove==="scissors"){
      if (computerMove === 'rock'){
        result='You Lose.';

      }
      else if (computerMove === 'paper'){
        result='You Win.';
      }
      else if (computerMove === 'scissors'){
        result='Tie.';
      }
  }else if (playerMove==="paper"){
    

    if (computerMove === 'rock'){
      result='You Win.';

    }
    else if (computerMove === 'paper'){
      result='Tie.';
    }
    else if (computerMove === 'scissors'){
      result='You Lose.';
    }
  }else if (playerMove==="rock"){
    if (computerMove === 'rock'){
      result='Tie.';

    }
    else if (computerMove === 'paper'){
      result='You Lose.';
    }
    else if (computerMove === 'scissors'){
      result='You Win.';
    }
  }

  if (result==="You Win."){
    score.wins+=1;
  }else if(result === "You Lose."){
    score.losses+=1;
 }
 else if(result === "Tie."){
  score.ties+=1;
}

  localStorage.setItem('score',JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerHTML=result;
  document.querySelector(".js-moves")
  .innerHTML=`You <img src="assets/images/${playerMove}-emoji.png" class="icons"/>  <img src="assets/images/${computerMove}-emoji.png" class="icons"/>  Computer`
  
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML=`
Wins: ${score.wins}, Loses: ${score.losses}, Ties:${score.ties}`;

}



