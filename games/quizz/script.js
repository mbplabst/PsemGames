// AUSGABE ÜBER HTML SCOREBOARD
const questions_right = document.querySelector('.questions_right');
const questions_streak = document.querySelector('.questions_streak');
const questions_wrong = document.querySelector('.questions_wrong');

const question = document.querySelector('.question');
const category = document.querySelector('.category')
const statistics = document.querySelector('.container-statistics');
const questionContainer = document.querySelector('.grid-container');
const nextQuestionButton = document.querySelector('.next-question');
const startGameButton = document.querySelector('.start-game');

const optionA = document.querySelector('.answer_A');
const optionB = document.querySelector('.answer_B');
const optionC = document.querySelector('.answer_C');
const optionD = document.querySelector('.answer_D');

const allButtons = document.querySelectorAll('.wrapper-questions');

let currentQuestion = null;
let allQuestions = [];
let answeredQuestions = [];

// WERTE DER EINZELNEN STATISTIKEN
let statsRight = 0;
let statsStreak = 0;
let statsWrong = 0;

/*********************** FUNKTIONEN ***********************/

async function startQuiz() {

    startGameButton.classList.add("hide");

    question.classList.remove('hide');
    category.classList.remove('hide');
    statistics.classList.remove('hide');
    questionContainer.classList.remove('hide');

    await logJSONData();
    loadNewQuestion();

}

function loadNewQuestion() {
    nextQuestionButton.classList.add('hide');

    let index = Math.floor(Math.random() * allQuestions.length);
    // console.log(index);

    currentQuestion = allQuestions[index];
    // console.log(currentQuestion);


    question.innerText = currentQuestion.question;
    category.innerHTML = currentQuestion.category;
    optionA.innerText = currentQuestion.options[0];
    optionB.innerText = currentQuestion.options[1];
    optionC.innerText = currentQuestion.options[2];
    optionD.innerText = currentQuestion.options[3];

    allButtons.forEach(b => b.disabled = false);
    allButtons.forEach(b => b.classList.remove('answer-correct', 'answer-wrong'));
}


async function logJSONData() {
    const response = await fetch("questions.json");
    const jsonData = await response.json();

    allQuestions = jsonData;

    // console.log(jsonData);
}

function selectAnswer(button, index) {
    nextQuestionButton.classList.remove('hide');

    allButtons.forEach(b => b.disabled = true);

    if (currentQuestion.answer === button.innerText) {
        console.log("richtig");
        button.classList.add('answer-correct')
    } else {
        console.log("falsch");
        button.classList.add('answer-wrong')
    }

    // console.log(index);

}

allButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectAnswer(button, index));
});