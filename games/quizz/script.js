// AUSGABE ÜBER HTML SCOREBOARD
const questions_right = document.querySelector('.questions_right');
const questions_streak = document.querySelector('.questions_streak');
const questions_wrong = document.querySelector('.questions_wrong');

const question = document.querySelector('.question');
const category = document.querySelector('.category');
const categoryText = document.querySelector('.category-text');
const categoryImage = document.querySelector('.category-image');

const statistics = document.querySelector('.container-statistics');
const questionContainer = document.querySelector('.grid-container');
const nextQuestionButton = document.querySelector('.next-question');
const startGameButton = document.querySelector('.start-game');
const timeBar = document.querySelector('.time-bar')

const optionA = document.querySelector('.answer_A');
const optionB = document.querySelector('.answer_B');
const optionC = document.querySelector('.answer_C');
const optionD = document.querySelector('.answer_D');

const allButtons = document.querySelectorAll('.wrapper-questions');
let currentQuestion = null;
let allQuestions = [];
let answeredQuestions = [];
let countaaa = 0;
const maxCountaaa = 14;

// WERTE DER EINZELNEN STATISTIKEN
let statsRight = 0;
let statsStreak = 0;
let statsWrong = 0;

/*********************** FUNKTIONEN ***********************/

async function startQuiz() {

    startGameButton.classList.add("hide");
    // timeBar.style.width = "100%;";

    question.classList.remove('hide');
    category.classList.remove('hide');
    categoryText.classList.remove('hide');
    categoryImage.classList.remove('hide');
    statistics.classList.remove('hide');
    questionContainer.classList.remove('hide');

    await fetchQuestionpool();
    loadNewQuestion();

    setInterval(timaa, 1000);
}

function loadNewQuestion() {
    nextQuestionButton.classList.add('hide');

    let index = Math.floor(Math.random() * allQuestions.length);

    currentQuestion = allQuestions[index];
    question.innerText = currentQuestion.question;
    categoryText.innerText = currentQuestion.category;
    categoryImage.src = currentQuestion.img;
    optionA.innerText = currentQuestion.options[0];
    optionB.innerText = currentQuestion.options[1];
    optionC.innerText = currentQuestion.options[2];
    optionD.innerText = currentQuestion.options[3];

    countaaa = maxCountaaa;

    allButtons.forEach(b => {
        b.disabled = false;
        b.classList.remove('answer-correct', 'answer-wrong');
    });
}


async function fetchQuestionpool() {
    const response = await fetch("questions.json");
    const jsonData = await response.json();

    allQuestions = jsonData;
}

// function selectAnswer(button) {

//     countaaa = null;
//     timeBar.style.width = "97%";
//     nextQuestionButton.classList.remove('hide');

//     allButtons.forEach(b => {
//         b.disabled = true;
//         if (currentQuestion.answer === b.innerText) {
//             b.classList.add('answer-correct');

//         } else if (button === null) {
//             b.classList.add('answer-wrong');
//         }
//     });

//     if (button !== null) {
//         if (currentQuestion.answer === button.innerText) {
//             questions_right.innerText = ++statsRight;
//             questions_streak.innerText = ++statsStreak;
//         } else {
//             button.classList.add('answer-wrong');
//             questions_wrong.innerText = ++statsWrong;
//             statsStreak = 0;
//             questions_streak.innerText = statsStreak;
//         }
//     } else {
//         questions_wrong.innerText = ++statsWrong;
//         statsStreak = 0;
//         questions_streak.innerText = statsStreak;
//     }
// }

function selectAnswer(button) {
    countaaa = null;
    timeBar.classList.add('animation-paused');
    timeBar.style.background = "green";
    nextQuestionButton.classList.remove('hide');
    allButtons.forEach(b => {
        b.disabled = true;
        if (currentQuestion.answer === b.innerText) {
            b.classList.add('answer-correct');
        } else if (button === null) {
            b.classList.add('answer-wrong');
        }
    });
    timeBar.style.background = "green";
    if (button !== null) {
        if (currentQuestion.answer === button.innerText) {
            questions_right.innerText = ++statsRight;
            questions_streak.innerText = ++statsStreak;
        } else {
            button.classList.add('answer-wrong');
            questions_wrong.innerText = ++statsWrong;
            statsStreak = 0;
            questions_streak.innerText = statsStreak;
        }
    } else {
        questions_wrong.innerText = ++statsWrong;
        statsStreak = 0;
        questions_streak.innerText = statsStreak;
    }
    timeBar.style.background = "green";
    setTimeout(() => {
        timeBar.classList.remove('animation-paused');
        timeBar.style.width = "97%";
        timeBar.style.background = "green";
    }, 0);
    timeBar.style.background = "green";
}

allButtons.forEach((button) => {
    button.addEventListener('click', () => selectAnswer(button));
});

function timaa() {
    if (countaaa == null) {
        return;
    } else if (countaaa == -1) {
        selectAnswer(null);
        return;
    }

    countaaa--;
    let percent = Math.round(100 * countaaa / maxCountaaa);
    timeBar.style.width = percent + "%";
}