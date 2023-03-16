const cards = document.querySelectorAll(".card");

const foundPairs = document.querySelector('.found-pairs');
const roundTries = document.querySelector('.round-tries');
const resetButton = document.querySelector('#reset');

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

let statsTries = 0;
let statsPairs = 0;

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
        // GEFUNDENE PAARE + 1 
        foundPairs.innerHTML = ++statsPairs;
        if (matched == 14) {
            // BUTTON UMBENENNEN
            resetButton.innerHTML = " Neues Spiel";
        }
        cardOne.removeEventListener("click", flipCard);
        cardOne.classList.add("foundPair");
        cardTwo.removeEventListener("click", flipCard);
        cardTwo.classList.add("foundPair");
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        // FEHLVERSUCHE + 1 
        roundTries.innerHTML = ++statsTries;
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 750);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    for (let i = 0; i < 51; i++) {
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    }
    cards.forEach((card, i) => {
        card.classList.remove("flip", "foundPair");
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
            
            // VERSUCHE RESET [X]
            statsTries = 0;
            roundTries.innerHTML = statsTries;

            // GEFUNDENE PAARE RESET
            statsPairs = 0;
            foundPairs.innerHTML = statsPairs;

            resetButton.innerHTML = "Zurücksetzen";
        });
        shuffleCard();
    }, 1200);

}