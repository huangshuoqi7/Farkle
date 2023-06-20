var diceArr = [];
var prevclick = [];
var scorev = 0;
var prevscorev = 0;
var sum = 0;
let NUMBER_OF_PLAYER = 0;
let numberOfRolls = 0;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	rollDice();
}

/*Rolling dice values*/
function rollDice(){
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();
	numberOfRolls += 1;
	if(numberOfRolls == 3){
		resetDice();
		numberOfRolls = 1;
	}
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + diceArr[i].value + ".png";
		if(diceArr[i].clicked == 0){
			document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
		}
	}
}

/*Hold the dice after click*/
function diceClick(img){
	var i = img.getAttribute("data-number");
	img.classList.toggle("transparent");
	if(diceArr[i].clicked == 0){
		diceArr[i].clicked = 1;
	}
	else{
		diceArr[i].clicked = 0;
	}
}

function resetDice(){
	for(var i=0; i<6; i++){
		if(diceArr[i].clicked === 1){
			var img = document.getElementById(diceArr[i].id);
			img.classList.remove("transparent");
			diceArr[i].clicked = 0;
		}
	}
}


/*Calculate the score and print it to the webpage*/
function score(){
	index = 0;
	click = [];
	dif = [];

	/*Store the previous score*/
	prevscorev = scorev;

	for(var i = 0; i < 6; i++){
		if(diceArr[i].clicked == 1){
			click[index] = diceArr[i].value;
			index += 1;
		}
	}
	click.sort();

	dif = click.filter(el => !prevclick.includes(el));

	/*The added element appeared before*/
	if(dif.length != (click.length-prevclick.length)){
		for(let e of click){
			var c = click.filter(n => n === e).length;
			var d = prevclick.filter(n => n === e).length;
			if(c!=d){
				for(var i=0;i<(c-d); i++){
					dif.push(e);
				}
				break;
			}
		}	
	}
	dif.sort(); 

	/*Update the previous selected dice*/
	prevclick = [];
	for (let el of click) {
		prevclick.push(el);
	}
	
	/*Calculate the score*/
	for(var i = 0; i < dif.length; i++){
		j = dif[i];
		var count = dif.filter(n => n === dif[i]).length;
		if(count>2){
			if(j == 1){
				scorev += 1000;
				i += 2;
			}
			else {
				scorev += j*100;
				i += 2;
			}
		}
		else{
			if(dif[i] == 1){
				scorev += 100;
			}
			else if(dif[i] == 5){
				scorev += 50;
			}
		}
	}
	
	var divs = document.querySelector("#rowscore");	
	divs.innerHTML = "Score: " + scorev;
	
	/*Calculate the score difference*/
	score_dif = scorev - prevscorev;

	/*If cannot add more score, Frankle!*/
	if(score_dif == 0){
		var divs = document.querySelector("#rowscore");	
		scorev = 0;
		divs.innerHTML = "Score: " + scorev;
		alert("Farkle!");
		resetDice();
		rollDice();
	}

	/*Calculate the total score and update the sum*/
	prevclick = [];
	sum += scorev;
	var divs = document.querySelector("#scoresum");	
	divs.innerHTML = "Sum: " + sum;
	scorev = 0;
	numberOfRolls = 0;
	resetDice();
	rollDice();
	

	if(sum >= 10000){
		scorev = 0;
		sum = 0;
		prevscorev = 0;
		alert("Game Finished!");
		resetDice();
		var divs = document.querySelector("#rowscore");	
		divs.innerHTML = "Score: " + scorev;
		var divs = document.querySelector("#scoresum");	
		divs.innerHTML = "Sum: " + sum;
	}
}

/*Get the number of Players*/
const container = document.querySelector(".container");
container.innerHTML = "";

function getValue() {
    var textField = document.getElementById("Players");
    var textValue = textField.value;
    NUMBER_OF_PLAYER = textValue;
	initializePlayer(container, NUMBER_OF_PLAYER);
}

/*Show the number of players*/
function initializePlayer(playerContainer, NUMBER_OF_PLAYER){
	for (let i = 0; i < NUMBER_OF_PLAYER; i++) {
		const players = document.createElement("div");
		players.classList.add("players");
		players.innerHTML = "Player " + (i+1) + ":";
		console.log(players);
		playerContainer.appendChild(players);
	}
}

