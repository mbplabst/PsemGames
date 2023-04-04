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

// WERTE DER EINZELNEN STATISTIKEN
let statsRight = 0;
let statsStreak = 0;
let statsWrong = 0;

/*********************** FUNKTIONEN ***********************/

function startQuiz() {

    startGameButton.classList.add("hide");

    question.classList.remove('hide');
    category.classList.remove('hide');
    statistics.classList.remove('hide');
    questionContainer.classList.remove('hide');

}

function loadNewQuestion() {
    nextQuestionButton.classList.add('hide');
}


function showQuestion() {

}


function selectAnswer() {
    nextQuestionButton.classList.remove('hide');
}