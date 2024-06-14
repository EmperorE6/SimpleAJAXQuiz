const questionField = document.getElementById('question');
const answerField = document.getElementById('answer');
const score = document.getElementById("scoreCount");
const startAgain=document.getElementById("start_again");
const startQuiz = document.getElementById("start");
const submitAnswers = document.getElementById('submit');

let questionNumber = 0;
let scoreCounter=0;

//Funkcija za dobivanje na prasanjata od XML fajlot preku AJAX biblioteka
function getQuestions() {
    questionField.textContent = "(please wait)";
    ajaxCallback = nextQuestion;
    ajaxRequest("questions.xml");
    submitAns
}

//Funkcija za dobivanje na sledno prasanje
function nextQuestion() {
    const questions = ajaxreq.responseXML.getElementsByTagName("question");
    if (questionNumber < questions.length) {
        const question = questions[questionNumber].firstChild.nodeValue;
        questionField.textContent = question;
    } else {
        questionField.textContent = "*No more questions*"; 
        submitAnswers.disabled=true;
    }
}

//Funkcija za proverka na odgovorite so prasanjata od XML fajlot
function checkAnswer() {
    const answers = ajaxreq.responseXML.getElementsByTagName("answer");
    const answer = answers[questionNumber].firstChild.nodeValue;

    if (answer == answerField.value) {
        alert("Correct!");
        scoreCounter++
        
    } else {
        alert("Incorrect");
        scoreCounter--
    }
    questionNumber++;
    answerField.value = "";
    nextQuestion();
    score.textContent="Score: " + scoreCounter;
    
}

startQuiz.onclick = getQuestions;
submitAnswers.onclick = checkAnswer;

startAgain.addEventListener("click",function (){
    questionNumber=0;
    scoreCounter=0;
    score.textContent="Score: " + scoreCounter;
    getQuestions()
})
