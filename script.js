const questionField = document.getElementById('question');
const answerField = document.getElementById('answer');

let questionNumber = 0;

function getQuestions() {
    questionField.textContent = "(please wait)";
    ajaxCallback = nextQuestion;
    ajaxRequest("questions.xml");
}

function nextQuestion() {
    const questions = ajaxreq.responseXML.getElementsByTagName("question");
    if (questionNumber < questions.length) {
        const question = questions[questionNumber].firstChild.nodeValue;
        questionField.textContent = question;
    } else {
        questionField.textContent = "(no more questions)";
    }
}

function checkAnswer() {
    const answers = ajaxreq.responseXML.getElementsByTagName("answer");
    const answer = answers[questionNumber].firstChild.nodeValue;
    console.log(answer);
    console.log(answerField.value)
    if (answer == answerField.value) {
        alert("Correct!");
    } else {
        alert("Incorrect");
    }
    questionNumber++;
    answerField.value = "";
    nextQuestion();
}

const startQuiz = document.getElementById("start");
const submitAnswers = document.getElementById('submit');
startQuiz.onclick = getQuestions;
submitAnswers.onclick = checkAnswer;