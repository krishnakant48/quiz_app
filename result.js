let highScore=document.getElementById("score");
const getScore=localStorage.getItem('finalScore');
highScore.innerText=getScore
function reset(){
    localStorage.clear()
}

