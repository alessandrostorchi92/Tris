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

    for(let i = 1; i < 10; i++) {
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

    console.log(this.dataset.numberSquare);
    console.log(this.dataset.user);
    
    if(userPlaying === 1){
        this.classList.add("clicked-square-player1");
        this.innerHTML = "<i class='fas fa-xmark'>";
    }else{
        this.classList.add("clicked-square-player2");
        this.innerHTML = "<i class='fa-solid fa-o'></i>";
    }

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