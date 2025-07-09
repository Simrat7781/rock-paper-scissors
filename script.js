let currentPlayer = 1;
let player1Choice = null;
let player2Choice = null;
let score1 = 0;
let score2 = 0;

let player1Name = "Player 1";
let player2Name = "Player 2";

function startGame() {
  const p1 = document.getElementById("player1-name").value.trim();
  const p2 = document.getElementById("player2-name").value.trim();

  if (!p1 || !p2) {
    alert("Please enter names for both players!");
    return;
  }

  player1Name = p1;
  player2Name = p2;

  document.getElementById("player1-display").textContent = player1Name;
  document.getElementById("player2-display").textContent = player2Name;

  document.getElementById("player1-choice").textContent = `${player1Name}: -`;
  document.getElementById("player2-choice").textContent = `${player2Name}: -`;
  document.getElementById("player-turn").textContent = `${player1Name}, choose your move:`;
  document.getElementById("winner").textContent = "Make your moves!";

  document.getElementById("name-inputs").style.display = "none";
  document.getElementById("game-area").style.display = "block";
}

function makeChoice(choice) {
  if (currentPlayer === 1) {
    player1Choice = choice;
    // Hide Player 1's choice after selecting
    document.getElementById("player1-choice").textContent = `${player1Name} has chosen!`;
    document.getElementById("player2-choice").textContent = `${player2Name}, it's your turn.`;

    currentPlayer = 2;
    document.getElementById("player-turn").textContent = `${player2Name}, choose your move:`;
  } else {
    player2Choice = choice;
    // Reveal choices
    document.getElementById("player1-choice").textContent = `${player1Name}: ${capitalize(player1Choice)}`;
    document.getElementById("player2-choice").textContent = `${player2Name}: ${capitalize(player2Choice)}`;

    const result = getWinner(player1Choice, player2Choice);
    document.getElementById("winner").textContent = result;

    if (result.includes(player1Name)) score1++;
    else if (result.includes(player2Name)) score2++;

    document.getElementById("score1").textContent = score1;
    document.getElementById("score2").textContent = score2;

    // Reset choices for next round
    player1Choice = null;
    player2Choice = null;
    currentPlayer = 1;

    // Prepare for next round
    document.getElementById("player-turn").textContent = `${player1Name}, choose your move:`;
  }
}

function getWinner(p1, p2) {
  if (p1 === p2) return "It's a Draw!";

  if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "paper" && p2 === "rock") ||
    (p1 === "scissors" && p2 === "paper")
  ) {
    return `🎉 ${player1Name} Wins!`;
  }
  return `🎉 ${player2Name} Wins!`;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function resetGame() {
  score1 = 0;
  score2 = 0;
  currentPlayer = 1;
  player1Choice = null;
  player2Choice = null;

  document.getElementById("score1").textContent = score1;
  document.getElementById("score2").textContent = score2;

  document.getElementById("player1-choice").textContent = `${player1Name}: -`;
  document.getElementById("player2-choice").textContent = `${player2Name}: -`;

  document.getElementById("winner").textContent = "Make your moves!";
  document.getElementById("player-turn").textContent = `${player1Name}, choose your move:`;
}
