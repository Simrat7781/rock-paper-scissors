let currentPlayer = 1;
let player1Choice = null;
let player2Choice = null;
let score1 = 0;
let score2 = 0;
let player1Name = "Player 1";
let player2Name = "Player 2";
let vsComputer = false;

function startGame() {
  const p1 = document.getElementById("player1-name").value.trim();
  const p2 = document.getElementById("player2-name").value.trim();
  vsComputer = document.getElementById("vs-computer").checked;

  if (!p1 || (!p2 && !vsComputer)) {
    alert("Please enter valid name(s)!");
    return;
  }

  player1Name = p1;
  player2Name = vsComputer ? "Computer" : p2;

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
  document.getElementById("click-sound").play();
  document.querySelectorAll(".choice").forEach(btn => btn.classList.remove("selected"));

  if (currentPlayer === 1) {
    player1Choice = choice;
    if (vsComputer) {
      player2Choice = getRandomMove();
      document.getElementById("player1-choice").textContent = `${player1Name}: ${capitalize(player1Choice)}`;
      document.getElementById("player2-choice").textContent = `${player2Name}: ${capitalize(player2Choice)}`;
      showWinner();
    } else {
      document.getElementById("player1-choice").textContent = `${player1Name} has chosen!`;
      document.getElementById("player2-choice").textContent = `${player2Name}, it's your turn.`;
      currentPlayer = 2;
      document.getElementById("player-turn").textContent = `${player2Name}, choose your move:`;
    }
  } else {
    player2Choice = choice;
    document.getElementById("player1-choice").textContent = `${player1Name}: ${capitalize(player1Choice)}`;
    document.getElementById("player2-choice").textContent = `${player2Name}: ${capitalize(player2Choice)}`;
    showWinner();
  }
}

function showWinner() {
  const winnerText = getWinner(player1Choice, player2Choice);
  const winnerDiv = document.getElementById("winner");
  winnerDiv.textContent = winnerText;
  winnerDiv.classList.remove("winner-flash");
  void winnerDiv.offsetWidth; // restart animation
  winnerDiv.classList.add("winner-flash");

  if (winnerText.includes(player1Name)) {
    score1++;
    document.getElementById("win-sound").play();
  } else if (winnerText.includes(player2Name)) {
    score2++;
    document.getElementById("win-sound").play();
  } else {
    document.getElementById("draw-sound").play();
  }

  document.getElementById("score1").textContent = score1;
  document.getElementById("score2").textContent = score2;

  player1Choice = null;
  player2Choice = null;
  currentPlayer = 1;

  setTimeout(() => {
    document.getElementById("player1-choice").textContent = `${player1Name}: -`;
    document.getElementById("player2-choice").textContent = `${player2Name}: -`;
    document.getElementById("player-turn").textContent = `${player1Name}, choose your move:`;
  }, 1500);
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

function getRandomMove() {
  const moves = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * 3)];
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

function setTheme(theme) {
  if (theme === 'cricket') {
  document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1594224642624-d17d3f3f54e3')";
  document.body.style.color = "#1b3e20";
}
  else if (theme === 'nature') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')";
    document.body.style.color = "#2e4d2c";
  } else if (theme === 'classic') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d')";
    document.body.style.color = "#222";
  } else if (theme === 'dark') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1503264116251-35a269479413')";
    document.body.style.color = "#eee";
  }
}
