const question=document.getElementById('question')
const choices=Array.from(document.getElementsByClassName("choice-text"));
const questionNo=document.getElementById("progressText");
const innerBar= document.getElementById("progress-bar-fill");
const Finalscore=document.getElementById("score")
let currentQuestion={};
let acceptAnswers=false;
let score=0;
let questionCounter=0
let availableQuestions=[];
//let questions=[];
/*fetch('questions.json')
.then(res=>{
    return res.json()
}) 
.then(loadedQuestions=>{
questions=loadedQuestions;
startgame()
})*/
let questions=[{
    question:"what doest HTML stands for",
    choice1:"Hyper text markup language",
    choice2:"hello text my language",
    choice3:"hii there more language",
    choice4:"invalid answer",
    answer:1
},
{
    question:"Choose the correct HTML tag for the largest heading",
    choice1:"Head",
    choice2:"h1",
    choice3:"h6",
    choice4:"heading",
    answer:2

},
{
question:"What is the correct HTML tag for inserting a line break?",
choice1:"break /",
choice2:"br",
choice3:"lb /",
choice4:"br /",
answer:2
}]
const CORRECT_BONUS=10
const MAX_QUESTIONS=3

startgame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions]
    getNewQuestion();
}
getNewQuestion=()=>{
    if(availableQuestions.length===0||questionCounter>=MAX_QUESTIONS){
        return window.location.assign("result.html")
    }
    questionCounter++;
    questionNo.innerText=`Question ${questionCounter}/${MAX_QUESTIONS}`
    innerBar.style.width=(questionCounter/MAX_QUESTIONS*100)+"%"
    const quetionIndex=Math.floor(Math.random()*availableQuestions.length)
    currentQuestion=availableQuestions[quetionIndex]
    // console.log(currentQuestion)
    question.innerText=currentQuestion.question;

    choices.forEach(choice=>{
        const number=choice.dataset['number']
        choice.innerText=currentQuestion['choice'+number]

    })
    availableQuestions.splice(quetionIndex,1);
    acceptAnswers=true;
}
choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        
        if(!acceptAnswers) return;
        acceptAnswers=false;
        const selectedChoice=e.target;
       
        const selectedAnswer=selectedChoice.dataset["number"];
       
        const classToApply=selectedAnswer==currentQuestion.answer?'correct':'incorrect'
        if(classToApply==="correct"){
            incrementScore(CORRECT_BONUS)
        }
        selectedChoice.classList.add(classToApply)
        setTimeout(()=>{
            selectedChoice.classList.remove(classToApply)
            getNewQuestion()
        },1000)
        
       
    })
})
incrementScore=(num)=>{
    score=score+num;
    Finalscore.innerText=score
    localStorage.setItem('finalScore',score)

}
function resetLocalStorage(){
    localStorage.clear();
}
startgame()


