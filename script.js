let currentPlayer = 1;
let player1Choice = null;
let player2Choice = null;
let score1 = 0;
let score2 = 0;
let player1Name = "You";
let player2Name = "Friend";
let vsComputer = false;

function startGame() {
  const p1 = document.getElementById("player1-name").value.trim();
  const p2 = document.getElementById("player2-name").value.trim();
  vsComputer = document.getElementById("vs-computer").checked;

  if (!p1 || (!p2 && !vsComputer)) {
    alert("Please enter your name (and a friend’s if not using computer)!");
    return;
  }

  player1Name = p1 || "You";
  player2Name = vsComputer ? "Computer 🤖" : (p2 || "Friend");

  document.getElementById("player1-display").textContent = player1Name;
  document.getElementById("player2-display").textContent = player2Name;
  document.getElementById("player1-choice").textContent = `${player1Name}: -`;
  document.getElementById("player2-choice").textContent = `${player2Name}: -`;
  document.getElementById("player-turn").textContent = `${player1Name}, your turn!`;
  document.getElementById("winner").textContent = "Let's go!";

  document.getElementById("name-inputs").style.display = "none";
  document.getElementById("game-area").style.display = "block";
}

function makeChoice(choice) {
  document.getElementById("click-sound").play();

  if (currentPlayer === 1) {
    player1Choice = choice;
    if (vsComputer) {
      player2Choice = getRandomMove();
      showChoices();
      showWinner();
    } else {
      document.getElementById("player1-choice").textContent = `${player1Name} has picked!`;
      document.getElementById("player2-choice").textContent = `${player2Name}, it's your turn.`;
      currentPlayer = 2;
      document.getElementById("player-turn").textContent = `${player2Name}, your turn!`;
    }
  } else {
    player2Choice = choice;
    showChoices();
    showWinner();
  }
}

function showChoices() {
  document.getElementById("player1-choice").textContent = `${player1Name}: ${capitalize(player1Choice)}`;
  document.getElementById("player2-choice").textContent = `${player2Name}: ${capitalize(player2Choice)}`;
}

function showWinner() {
  const winnerText = getWinner(player1Choice, player2Choice);
  const winnerDiv = document.getElementById("winner");
  winnerDiv.textContent = winnerText;
  winnerDiv.classList.remove("winner-flash");
  void winnerDiv.offsetWidth;
  winnerDiv.classList.add("winner-flash");

  if (winnerText.includes(player1Name
