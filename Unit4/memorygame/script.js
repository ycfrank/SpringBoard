const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClick = false;
let flippedCards = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClick) return;
  if (e.target.classList.contains("flipped")) return;

  let current = e.target;
  current.style.backgroundColor = current.classList[0];

  if (!card1 || !card2) {
    current.classList.add("flipped");
    card1 = card1 || current;
    card2 = current === card1 ? null : current;
  }

  if (card1 && card2) {
    noClick = true;
    // debugger
    let color1 = card1.className;
    let color2 = card2.className;

    if (color1 === color2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClick = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClick = false;
      }, 1000);
    }
  }

  if (flippedCards === COLORS.length) alert("game over!");
}


// when the DOM loads
createDivsForColors(shuffledColors);
