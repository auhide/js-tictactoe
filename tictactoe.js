/*
 * @file A simple tic-tac-toe game
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * boxes - gets an array of all the <td> tags in the <table>
 * restart - connects with the Restart button on our page
 * player - connects with the <h3> that changes when the turns change
 */
var boxes 	= document.querySelectorAll("td");
let restart = document.querySelector("#rs");
let player  = document.querySelector("#player")
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * turn - helps us determine whether it is Player X's or Player O's turn; 
 * turn_flag - checks if we click on already chosen position; when we click on an empty box - True; else - False
 */
var turn 	  = 0;
var turn_flag = false
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * winningCombo - all possible winning combinations 
 * player_x - all of Player X's choices
 * player_o - all of Player O's choices
 * gameOver - flag to check whether Player X or Player O won, or it is a Draw; 1 - Player X , 2 - Player O, 3 - Draw
 */
var winningCombo = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
];
var player_x = []
var player_o = []
var gameOver = 0
var rr_game  = 0
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * change() - changes the html file using DOM and JS depending on the click of the user
 */
function change(){
	if(turn % 2 === 0 && this.textContent !== "O" && this.textContent === ""){
			this.textContent = "X";
			player_x.push(Number(this.id))
			if(player_x.length >= 3){
				console.log("PLAYER X.LENGTH > 3")
				for( let i in winningCombo ){
					if( player_x.includes(winningCombo[i][0]) && player_x.includes(winningCombo[i][1]) && player_x.includes(winningCombo[i][2]) ){
						swal({title: "Player X Won", text: "Click OK to play again",});
						gameOver = 1
					}
				}
			}
			turn_flag = true
	}
	else if(this.textContent === "" && this.textContent !== "X" && this.textContent === ""){
			this.textContent = "O";
			player_o.push(Number(this.id))
			if(player_o.length >= 3){
				for( let i in winningCombo ){
					if( player_o.includes(winningCombo[i][0]) && player_o.includes(winningCombo[i][1]) && player_o.includes(winningCombo[i][2]) ){
						swal({title: "Player O Won", text: "Click OK to play again",});
						gameOver = 2
					}
				}
			}			
			turn_flag = true
	}
	else{
		turn_flag = false;
	}

	if(turn_flag){
		turn++;
	}

	if( (player_o.length + player_x.length) === 9 && gameOver == 0){
		gameOver = 3
	}

	if(!gameOver){
		if(turn % 2 === 0 && turn <= 9){
			player.textContent = "Player X";
		}
		else if(turn % 2 !== 0 && turn <= 9){
			player.textContent = "Player O";
		}
	}
	else if(gameOver === 1 || gameOver === 2){
		gameOver = 0
		clear_boxes()
		rr_game  = 1
	}
	else if(gameOver === 3){
		gameOver = 0
		clear_boxes()
		swal({title: "DRAW", text: "Click OK to play again",});
		rr_game  = 1
	}

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * clear_boxes - empties each box of the table and gives default values to certain variables (player.TextContent; player_x; player_o; turn)
 */
function clear_boxes(){
	for(let i = 0; i < boxes.length; i++){
		boxes[i].textContent = "";
	}
	player.textContent 	= "Player X";
	player_x 			= []
	player_o 			= []
	turn 	 			= 0
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Detecting which box has been clicked and calling the change function
for(let i = 0; i < boxes.length; i++){
	boxes[i].addEventListener("click", change);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Checking if the Restart button is clicked and if so, the clear_boxes function is called
restart.addEventListener("click", clear_boxes);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////