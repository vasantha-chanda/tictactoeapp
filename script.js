const elements=document.querySelectorAll('[data-cell]');
const X_CLASS='x';
const CIRCLE_CLASS='o';
const combinations=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
const winningmessageelement=document.getElementById('message');
const winningmessage=document.querySelector('[data-winning-text]');
const button=document.getElementById('restart');
const container=document.getElementById('container');
let circleturn;
startGame();
button.addEventListener('click',startGame)
function startGame(){
    circleturn=false;
    elements.forEach(cell=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click',handlingClick)
        cell.addEventListener('click',handlingClick,{once:true});
    })

     setHoverClass()
     winningmessageelement.classList.remove('show')

}

function handlingClick(e){
    const cell=e.target;
    const currentclass=circleturn?CIRCLE_CLASS:X_CLASS;
    mark(cell,currentclass);
    if(checkWin(currentclass)){
       endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        switching()
        setHoverClass()
    }
   
    
}
function endGame(draw){
  if(draw){
    winningmessage.innerText='Draw';
  }
  else{
      
winningmessage.innerText=`${
    circleturn?"o's":"x's"}wins`

  }
  winningmessageelement.classList.add('show')
}
function isDraw(){
    return [...elements].every(cell=>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })
}
function mark(cell,currentclass){
    cell.classList.add(currentclass);

}
function switching(){
    circleturn=!circleturn;
}
function setHoverClass(){
    container.classList.remove(X_CLASS);
    container.classList.remove(CIRCLE_CLASS);
    if(circleturn){
      container.classList.add(CIRCLE_CLASS);
  
    }
    else{
      container.classList.add(X_CLASS);
    }
   
  }
  function checkWin(currentclass){
    return combinations.some(combination=>{
        return combination.every(idx=>{
            return elements[idx].classList.contains(currentclass)
        })
    })
}





