class MemoryGame {

    constructor(opts) {
        this.node = opts.selector;

        // duplicate the array entries once the game starts
        this.cards = opts.cards.concat(opts.cards);

        // how many moves the player has made?
        this.cardMoves = 0;

        // how many cards have been collected so far?
        this.cardsCollected = 0;

        // how many cards match?
        this.cardsMatch = 0;

        this.board = this.node.querySelector('.memory-board');
        this.memoryMoves = this.node.querySelector('#memoryMoves');
        this.memoryMatches = this.node.querySelector('#memoryMatches');

        this.startGame();
    }

    startGame() {
        // game logic goes here
    }
}

// file memory-cards.js
export default {

    // the directory or path of the images
    dir: '/img/fruits/',

    // the number of available images
    amount: 16,

    getCards() {
        let cards = [];
        for (let i=1; i<=this.amount; i++) {
            cards.push({
                id: i,
                img: `${this.dir}${i<10?'0':''}${i}.jpg`
            });
        }
        return cards;
    }
}

import MemoryCards from './js/memory-cards.js';
let memoryGame = new MemoryGame({
    selector: document.getElementById('memoryGame'),
    cards: MemoryCards.getCards()
});

class MemoryGame {
    
    // ...
  
    /**
     * render the cards and put them to the board element
     */
    render() {
        this.board.innerHTML = "";
        this.cards.forEach((card, i) => {
            this.board.innerHTML += this.renderCard(card, i);
        });
    }

    /**
     * Define the html for a card item
     * @param card - the card object
     * @returns {string} - html of the card item
     */
    renderCard(card) {
        return `
            <div class="memory-card-item" data-card="${card.id}">
                <div class="memory-card-item-inner">
                    <div class="memory-card-item-front"></div>
                    <div class="memory-card-item-back">
                        <img src="../${card.img}" />
                    </div>
                </div>
            </div>
        `;
    } 
    
    // ...
    
}