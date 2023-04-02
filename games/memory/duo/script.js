const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector('#reset');
let playerDisplay = document.querySelector('.display-player');

const foundPairs_ONE = document.querySelector('.found-pairs-ONE');
const roundTries_ONE = document.querySelector('.round-tries-ONE');
const roundWins_ONE = document.querySelector('.round-wins-ONE'); 

const foundPairs_TWO = document.querySelector('.found-pairs-TWO');
const roundTries_TWO = document.querySelector('.round-tries-TWO');
const roundWins_TWO = document.querySelector('.round-wins-TWO');

let statsTriesONE = 0;
let statsPairsONE = 0;
let statsWinONE = 0;

let statsTriesTWO = 0;
let statsPairsTWO = 0;
let statsWinTWO = 0;

let currentPlayer = 'ONE';
let isGameActive = true;
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

/** **************************************************************** **/

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;

        if (currentPlayer == 'ONE') {
            cardOne.removeEventListener("click", flipCard);
            cardOne.classList.add("player-one-found");
            cardTwo.removeEventListener("click", flipCard);
            cardTwo.classList.add("player-one-found");

            statsPairsONE++;
            foundPairs_ONE.innerHTML = statsPairsONE;


        }

        if (currentPlayer == 'TWO') {
            cardOne.removeEventListener("click", flipCard);
            cardOne.classList.add("player-two-found");
            cardTwo.removeEventListener("click", flipCard);
            cardTwo.classList.add("player-two-found");

            statsPairsTWO++;
            foundPairs_TWO.innerHTML = statsPairsTWO;

        }

        checkWin();

        cardOne = cardTwo = "";
        return disableDeck = false;
    }



    setTimeout(() => {
        if (img1 !== img2) {
            if (currentPlayer == 'ONE') {
                statsTriesONE++;
                roundTries_ONE.innerHTML = statsTriesONE;

            } else if (currentPlayer == 'TWO') {
                statsTriesTWO++;
                roundTries_TWO.innerHTML = statsTriesTWO;
            }
        }
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 750);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
        changePlayer();
    }, 1200);

}

function checkWin() {
    if (matched == 14) {
        if (statsPairsONE > statsPairsTWO) {

            statsWinONE++;
            roundWins_ONE.innerHTML = statsWinONE;
            playerDisplay.innerHTML = "HIER STEHT, DASS SPIELER UNO GEWONNEN HAT!"


        } else if (statsPairsTWO > statsPairsONE) {

            statsWinTWO++;
            roundWins_TWO.innerHTML = statsWinTWO;
            playerDisplay.innerHTML = "HIER STEHT, DASS SPIELER UNO GEWONNEN HAT!"

        } else if (statsPairsONE == statsPairsTWO) {

            playerDisplay.innerHTML = "HIER STEHT, DASS UNENTSCHIEDEN IST"

        }
    }
}

const changePlayer = () => {
    currentPlayer = currentPlayer === 'ONE' ? 'TWO' : 'ONE';
    if (currentPlayer == 'ONE') {
        playerDisplay.innerHTML = 'Spieler <i class="fa-solid fa-user-large player-one"></i> ist dran!';
    } else {
        playerDisplay.innerHTML = 'Spieler <i class="fa-solid fa-user-large player-two"></i> ist dran!';
    }
}

function shuffleCard() {
    currentPlayer = 'ONE';
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    for (let i = 0; i < 51; i++) {
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    }
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        card.classList.remove("player-one-found", "player-two-found");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `/assets/images/memory/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


function reset() {

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add("flip");
            disableDeck = true;
        });
    }, 300);

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove("flip");
        });
        shuffleCard();
    }, 1200);

    setTimeout(() => {
        cards.forEach((card) => {

            statsTriesONE = 0;
            roundTries_ONE.innerHTML = statsTriesONE;

            statsPairsONE = 0;
            foundPairs_ONE.innerHTML = statsPairsONE;

            statsTriesTWO = 0;
            roundTries_TWO.innerHTML = statsTriesTWO;

            statsPairsTWO = 0;
            foundPairs_TWO.innerHTML = statsPairsTWO;

            resetButton.innerHTML = "Zurücksetzen";
        });
        shuffleCard();
    }, 1200);

    currentPlayer = 'One';
    playerDisplay.innerHTML = 'Spieler <i class="fa-solid fa-user player-one"></i> ist dran!';

}