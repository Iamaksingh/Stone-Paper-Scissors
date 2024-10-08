// Selecting the HTML elements
const userScoreElement = document.querySelector('.score_shower:nth-child(1) p');
const computerScoreElement = document.querySelector('.score_shower:nth-child(2) p');
const userChoiceButtons = document.querySelectorAll('.choices .buttons_choices');
const userDisplay = document.querySelectorAll('.showcases .cont img')[0]; // User display image
const computerDisplay = document.querySelectorAll('.showcases .cont img')[1]; // Computer display image
const resetButton = document.querySelector('.reset_button');

// Scores
let userScore = 0;
let computerScore = 0;

// Images for each choice
const choicesImages = {
    rock: 'assets/rock.png',
    paper: 'assets/paper.png',
    scissor: 'assets/scissors.png'
};

// Possible choices
const choices = ['rock', 'paper', 'scissor'];



// Function to get computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to update the displayed score
function updateScore() {
    userScoreElement.textContent = `User : ${userScore}`;
    computerScoreElement.textContent = `Computer : ${computerScore}`;
}

// Function to determine winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }

    if (
        (userChoice === 'rock' && computerChoice === 'scissor') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissor' && computerChoice === 'paper')
    ) {
        userScore++;
        return 'user';
    } else {
        computerScore++;
        return 'computer';
    }
}

// Function to play one round of the game
function playRound(userChoice) {
    const computerChoice = getComputerChoice();

    // Update displayed images
    userDisplay.src = choicesImages[userChoice];
    computerDisplay.src = choicesImages[computerChoice];

    // Determine winner
    const winner = determineWinner(userChoice, computerChoice);
    
    // Update the score based on the result
    if (winner !== 'draw') {
        updateScore();
    }
}

// Event listeners for user choice buttons
userChoiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        const userChoice = this.id; // Get the choice (rock, paper, scissor) based on the button's ID
        playRound(userChoice);
    });
});

// Event listener for reset button
resetButton.addEventListener('click', function() {
    userScore = 0;
    computerScore = 0;
    updateScore();

    // Reset images to thinking state
    userDisplay.src = 'assets/user_think.png';
    computerDisplay.src = 'assets/computer_think.jpg';
});
