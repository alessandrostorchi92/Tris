"use strict"

/* -------------------------------------------------------

PREPARATION SESSION: Collection of the Html elements and global variables I need

-------------------------------------------------------- */

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const trisGridContainer = document.querySelector(".tris-grid-container");

/**
 * @type {HTMLTitleElement}
 */
// @ts-ignore
const playingUser = document.querySelector(".playing-user");

let userPlaying = 1;

let user1Moves = [];
let user2Moves = [];
const possibleSolutions = [
  // Orizzontale
  "0,1,2",
  "3,4,5",
  "6,7,8",
  // Verticale
  "0,3,6",
  "1,4,7",
  "2,5,8",
  // Diagonale
  "0,4,8",
  "6,4,2",
];



/* ----------

GAME SESSION: Implementaion of the tris game

----------- */

updatePlayingUser(false);

// TODO: Generation of the squares of the tris grid

//* Invocation of the function which prints the tris grid 
createGrid(trisGridContainer);

/**
 * This function creates and prints the grid game
 * @param {HTMLElement} container 
 */
function createGrid(container) {

    for(let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.numberSquare = i.toString();
        square.addEventListener("click", onSquareClick);



        //? console.dir(square); OK!
        container.append(square);
    }

}

// TODO: Setting up of the features of the addEventListener
/**
 * This function activates features once you click on the square
 * @this {HTMLDivElement} the keyword this has "square" as value, on the
 which the addEventListener has been added.
 */
function onSquareClick() {

    if(this.dataset.user !== undefined) {
        return;
    }

    //? console.log(this.dataset.numberSquare); OK!
    //? console.log(this.dataset.user);OK!

    // Initialisation of the variable without assigning it any initial value.
    let result;
    
    if(userPlaying === 1){
        this.classList.add("clicked-square-player1");
        this.innerHTML = "<i class='fas fa-xmark'>";

        user1Moves.push(this.dataset.numberSquare);
        console.log(user1Moves);
        result = checkResult(user1Moves);

    }else{
        this.classList.add("clicked-square-player2");
        this.innerHTML = "<i class='fa-solid fa-o'></i>";

        user2Moves.push(this.dataset.numberSquare);
        console.log(user2Moves);
        result = checkResult(user2Moves);
    }

    if (result) {
        console.log(`L'utente ${userPlaying} ha vinto!`);
        return;
    }
    console.log("Result:", result);

    this.dataset.user = userPlaying.toString();
    updatePlayingUser(true);
}

// TODO: player turn management

/**
 * This function change the turn of the players
 * @param {boolean} changePlayer if the value is true the turn of the player changes
 */
function updatePlayingUser(changePlayer) {

    if(changePlayer) {
        if (userPlaying === 1) {
            userPlaying = 2;
        } else {
            userPlaying = 1;
        }
    }
    playingUser.textContent = "Turn of the player" + " " + userPlaying;
}

// TODO: checking of players's moves

/**
 * This function checks if a player won
 * @param {string[]} userMoves These represent the moves made by each player
 * @returns {boolean}
 */

function checkResult(userMoves) {
    const moves = userMoves.sort().join();
    let hasWon = false;

    for(let i = 0; i < possibleSolutions.length; i++ ) {
        const solutions = possibleSolutions[i];

        if(moves.includes(solutions)) {
            hasWon = true;
        }
    }

    return hasWon
}