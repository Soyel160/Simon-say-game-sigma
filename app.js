//Simon says game

let gameSeq=[];
let userSeq=[]; 

let btns=["yellow","red","blue","green"];

let started=false;
let level=0;
let h2=document.querySelector("h2");

let maxScore=0;

document.getElementById("stBtn").addEventListener("click",function(){
    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
 });

 function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },300);
 }

 function userFlash(btn){
   btn.classList.add("userflash");
   setTimeout(function(){
       btn.classList.remove("userflash");
   },300);
}


 function levelUp(){
   userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randcolor=btns[randIdx];
    let randBtn=document.querySelector(`.${randcolor}`);

   gameSeq.push(randcolor);
   console.log(gameSeq);
    gameFlash(randBtn);
 }


 function checkAns(idx){
if(userSeq[idx]===gameSeq[idx]){

   if(userSeq.length==gameSeq.length){
      setTimeout(levelUp,1000); //to give a delay
   }
}else{

   //after finish the max score will be updated
   if(level>maxScore){
      maxScore=level;
      document.getElementById("maxScore").innerText=`Max Score: ${maxScore}`;
   }
 h2.innerHTML=`Game Over! Your score is <b>${level}</b>  `;  
 document.querySelector("body").style.backgroundColor="red";
 setTimeout(function(){
   document.querySelector("body").style.backgroundColor="rgb(7, 7, 46)";
 },150);

 //to restart the game
  let btn=document.createElement("button");
  btn.textContent="Restart Game";

   //adding click event to restartthe game
   btn.addEventListener("click",function(){
      reset(); //reset function
      levelUp(); //start again
      btn.remove(); //remove button after restart
   });

   //append button below h2
   h2.insertAdjacentElement("afterend",btn);
  
 reset();
}
 }


 function btnPress(){
  console.log(this);
  let btn=this;
  userFlash(btn);


 let userColor=btn.getAttribute("id");
 userSeq.push(userColor);
 console.log(userColor); 

 checkAns(userSeq.length-1);
 }

 let allBtns=document.querySelectorAll(".btn");
 for(btn of allBtns){
   btn.addEventListener("click",btnPress);
 }

 function reset(){
   started=false;
   gameSeq=[];
   userSeq=[];
   level=0;
 }