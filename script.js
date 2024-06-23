const questionField = document.getElementById('question');
const answerField = document.getElementById('answer');
const score = document.getElementById("scoreCount");
const startAgain=document.getElementById("start_again");
const startQuiz = document.getElementById("start");
const submitAnswers = document.getElementById('submit');
const finished=document.getElementById('finishedquiz');
const plusOne=document.getElementById("plusOne");
const minusOne=document.getElementById("minusOne");
const notYetQuestion=document.getElementById("searchquestion")
let questionNumber = 0;
let scoreCounter = 0;

//Funkcija za dobivanje na prasanjata od XML fajlot preku AJAX biblioteka
function getQuestions() {
    finished.style.display="none";
    questionNumber=0;
    scoreCounter=0;
    score.textContent=scoreCounter;
    submitAnswers.disabled=false;
    ajaxCallback = nextQuestion;
    ajaxRequest("questions.xml");
}
//Funkcija za dobivanje na sledno prasanje
function nextQuestion() {
    const questions = ajaxreq.responseXML.getElementsByTagName("question");
    if (questionNumber < questions.length) {
        const question = questions[questionNumber].firstChild.nodeValue;
        questionField.textContent = question;
questionField.style.display="block";
notYetQuestion.style.display="none";

    } else {
        questionField.style.display="none";
        finished.style.display="block"
        submitAnswers.disabled=true;
        setTimeout(()=>alert(`You have finished the quiz with ${scoreCounter} points.Click ,,Start Quiz" to start again.`),500);//na delay od pola sekunda se pojavuva porakata po zavrsuvanje na kvizot
    }
 
}

//Funkcija za proverka na odgovorite so prasanjata od XML fajlot
function checkAnswer() {
    const answers = ajaxreq.responseXML.getElementsByTagName("answer");
    const answer = answers[questionNumber].firstChild.nodeValue;
    submitAnswers.disabled = true;
    if (answer == answerField.value) {

        questionField.style.color = "green";//otkako se odgvoore tocno svetnuva zeleno
        setTimeout(() => questionField.style.color = "", 1000); // Za edna sekunda delay se resetira nazad prasanjeto vo prvobitna boja(bela)

        plusOne.style.display="block";
        setTimeout(()=>plusOne.style.display="none",1000);
       
        scoreCounter++

        score.style.color= "green";
        setTimeout(()=>score.style.color="", 1000);
        
    } else {
        questionField.style.color = "red";
        setTimeout(()=> questionField.style.color = "", 1000);

        minusOne.style.display="block";
        setTimeout(()=> minusOne.style.display="none", 1000);
        scoreCounter--

        score.style.color= "red";
        setTimeout(()=>score.style.color="", 1000);


    }
    questionNumber++;
    answerField.value = "";
   setTimeout(()=>submitAnswers.disabled=false,1000);
   setTimeout(()=>nextQuestion(),1000);
    score.textContent=scoreCounter;
}

startQuiz.onclick = getQuestions;
submitAnswers.onclick = checkAnswer;

