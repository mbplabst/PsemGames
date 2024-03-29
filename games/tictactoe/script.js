window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    let playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const display = document.querySelector('.display');
    const winCountX = document.querySelector('.total-winsX');
    const winCountO = document.querySelector('.total-winsO');
    const tieCount = document.querySelector('.total-tie');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    let statsTotalWinsX = 0;
    let statsTotalWinsO = 0;
    let statsTotalTies = 0;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // function playSound(audioName) {
    //     let audio = new Audio(audioName);
    //     audio.play();
    // }

    function handleResultValidation() {
        let roundWon = false;
        let winningCombination = [];
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningCombination = winCondition;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            markWinningCombination(winningCombination);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
            isGameActive = false;
            tiles.forEach(tile => {
                tile.classList.add('marked');
            });
            return;
        }
    }

    function markWinningCombination(combination) {
        tiles.forEach((tile, index) => {
            if (combination.includes(index)) {
                tile.classList.add(`player${currentPlayer}-win`);
            } else {
                tile.classList.add('marked');
            }
        });
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                winCountO.innerHTML = ++statsTotalWinsO;
                announcer.innerHTML = 'Spieler <span class="playerO">O</span> gewinnt!';
                break;
            case PLAYERX_WON:
                winCountX.innerHTML = ++statsTotalWinsX;
                announcer.innerHTML = 'Spieler <span class="playerX">X</span> gewinnt!';
                break;
            case TIE:
                tieCount.innerHTML = ++statsTotalTies;
                announcer.innerHTML = 'Unentschieden!';
        }
        display.innerHTML = 'Das Spiel ist beendet!';
        announcer.classList.remove('hide');
        resetButton.innerHTML = "Neues Spiel";
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
            tile.classList.remove('marked');
        });

        display.innerHTML = 'Spieler <span class="display-player playerX">X</span> ist dran!';
        playerDisplay = document.querySelector('.display-player');
        resetButton.innerHTML = "Zurücksetzen";
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
    resetBoard();
});