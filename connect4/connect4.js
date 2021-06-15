/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 let WIDTH = 7;
 let HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
 
 //  board.length = 6; for (let i = 0; i < board.length; i++) { board[i] = []; board[i].length = 7; } console.log(board);
 
   for (let y = 0; y < HEIGHT; y++) {
     board.push(Array.from({length: WIDTH}));
     }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // This function is missing the first line, that sets the board variable to the HTML board DOM node. Fix this.
   // Add comments to the code that dynamically creates the HTML table.
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.querySelector('#board');
   
   //Creates table top row and assigns id
   //Calls handleClick function when top row clicked
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   //Creates WIDTH number of td table elements with variable headcell using a loop
   //Assigns each td an id of x, where x is defined in the loop
   //Appends td to board
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   //Creates HEIGHT number of table row elements with variable row
   //For each row element, creates a td element with variable cell
   //Each td element is assigned the id of y-x, these being defined by the loop
   //Appends the td element to the row
   //Row is then appended to the table
 
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
 //Find the lowest empty spot in the game board and return the y coordinate (or null if the column is filled).
 
 //copied from solution..almost got it
   for (let y = HEIGHT - 1; y >= 0; y--) {
     if (!board[y][x]) {
       return y;
     }
   }
   return null;
 };
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
 // This div should have the piece class on it, and should have a class for whether the current player is 1 or 2, like p1 or p2.
   const playPiece = document.createElement('div');
   playPiece.classList.add('piece');
   playPiece.classList.add(`p${currPlayer}`);
   const spot = document.getElementById(`${y}-${x}`);
   spot.append(playPiece);
   }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id;
 
 
 // add code to switch currPlayer between 1 and 2. This would be a great place for a ternary function.
 currPlayer === 1? currPlayer = 2: currPlayer = 1;
 
 
 // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   board[y][x] = currPlayer; //copied from solution, without this checkForWin isn't executed
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   if (board.every(row => row.every(cell => cell))) {
     return endGame('Tie!');
   }
 
 };
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();