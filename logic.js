let humanScore = 0;
let computerScore = 0;
let count = 0;

const choice = document.querySelectorAll(".choice");
const outcome = document.querySelector(".outcome");
const outcomeList = document.querySelector("#outcome-list");
const round = document.querySelector("#round");
const scoreBanner = document.querySelector(".score-banner");
const originalScore = scoreBanner.innerHTML;
const originalHTML = outcome.innerHTML;

function getComputerChoice() {
  let num = Math.random() * 10;

  if (num < 3) {
    return "rock";
  } else if (num < 6) {
    return "paper";
  } else {
    return "scissors";
  }
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice == computerChoice) {
    insertList("Tie");
    return "It's a tie, no points!";
  } else if (humanChoice == "rock" && computerChoice == "scissors") {
    humanScore += 1;
    insertList("Win");
    return "You win! Rock beats Scissors";
  } else if (humanChoice == "rock" && computerChoice == "paper") {
    computerScore += 1;
    insertList("Lose");
    return "You lose! Paper beats Rock";
  } else if (humanChoice == "paper" && computerChoice == "rock") {
    humanScore += 1;
    insertList("Win");
    return "You win! Paper beats Rock.";
  } else if (humanChoice == "paper" && computerChoice == "scissors") {
    computerScore += 1;
    insertList("Lose");
    return "You lose! Scissors beats Paper.";
  } else if (humanChoice == "scissors" && computerChoice == "rock") {
    computerScore += 1;
    insertList("Lose");
    return "You lose! Rock beats Scissors.";
  } else if (humanChoice == "scissors" && computerChoice == "paper") {
    humanScore += 1;
    insertList("Win");
    return "You win! Scissors beats Paper.";
  } else {
    return "You have entered a incorrect option!";
  }
}

function insertList(value) {
  const listValue = document.createElement("li");
  listValue.textContent = value;
  outcomeList.appendChild(listValue);

  if (value === "Win") {
    listValue.style.color = "#58a550";
  } else if (value === "Lose") {
    listValue.style.color = "#f35361";
  }
}

function displayScore() {
  const elementHumanScore = document.querySelector("#human-score");
  const elementComputerScore = document.querySelector("#computer-score");
  elementHumanScore.textContent = `Your Score: ${humanScore}`;
  elementComputerScore.textContent = `Computer Score: ${computerScore}`;
}

choice.forEach((button) => {
  button.addEventListener("click", (event) => {
    count += 1;
    let human = event.target.value;
    let computer = getComputerChoice();
    const text = playRound(human, computer);
    displayScore();
    displayOutcome(text, human, computer);
  });
});

function displayOutcome(text, human, computer) {
  const result = document.querySelector("#result");
  const outcomeHuman = document.querySelector("#outcome-human");
  const outcomeComputer = document.querySelector("#outcome-computer");
  outcomeHuman.textContent = `You chose: ${human}`;
  outcomeComputer.textContent = `Computer Chose: ${computer}`;
  result.textContent = text;
  round.textContent = `Round: ${count}`;

  if (count === 5) {
    if (humanScore > computerScore) {
      result.textContent = "Congratulations! You win!";
      result.style.border = "4px solid #58a550";
      result.style.color = "#58a550";
    } else if (humanScore === computerScore) {
      result.textContent = "It's a tie!";
    } else {
      result.textContent = "You lost! Better luck next time.";
      result.style.border = "4px solid #f35361";
      result.style.color = "#f35361";
    }

    choice.forEach((button) => (button.disabled = true));
    const playAgain = document.createElement("button");
    playAgain.classList = "choice";
    playAgain.textContent = "Play Again?";
    outcome.appendChild(playAgain);

    playAgain.addEventListener("click", () => {
      humanScore = 0;
      computerScore = 0;
      count = 0;
      choice.forEach((button) => (button.disabled = false));
      outcome.innerHTML = originalHTML;
      scoreBanner.innerHTML = originalScore;
      playAgain.remove();
    });
  }
}
