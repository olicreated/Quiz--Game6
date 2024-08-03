
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const messageElement = document.createElement('div');
const gameOverElement = document.createElement('h1');
const endGameContainer = document.getElementById('end-game-container');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    answers: ['Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Jane Austen'],
    correctAnswer: 2
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 2
  },
  {
    question: 'Which element has the chemical symbol O?',
    answers: ['Gold', 'Oxygen', 'Osmium', 'Oganesson'],
    correctAnswer: 1
  },
  {
    question: 'Which country is known as the Land of the Rising Sun?',
    answers: ['China', 'Japan', 'South Korea', 'Thailand'],
    correctAnswer: 1
  },
  {
    question: 'What is the capital city of Australia?',
    answers: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2
  },
  {
    question: 'In which year did the Titanic sink?',
    answers: ['1905', '1912', '1920', '1935'],
    correctAnswer: 1
  }
];

function initializeGame() {
  scoreElement.style.visibility = 'hidden';
  nextButton.classList.add('hide');
  startButton.classList.remove('hide');
  startButton.addEventListener('click', startGame);
}

startButton.addEventListener('click', () => {
  if (startButton.innerText === 'Start') {
    startGame();
  } else {
    resetGame();
  }
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  questionContainerElement.appendChild(messageElement);
  questionContainerElement.appendChild(gameOverElement);
  shuffledQuestions = questions.slice();
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = `Score: ${score}`;
  scoreElement.style.display = 'block';
  questionContainerElement.classList.remove('hide');
  gameOverElement.innerText = '';
  document.body.style.backgroundColor = '#f0f0f0';
  setNextQuestion();
}

function resetGame() {
  score = 0;
  scoreElement.innerText = `Score: ${score}`;
  startButton.innerText = 'Start';
  startButton.classList.remove('hide');
  questionContainerElement.classList.add('hide');
  endGameContainer.classList.add('hide'); // Hide end game container
  scoreElement.style.visibility = 'hidden';
  document.body.style.backgroundColor = 'white';
}


function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('btn');
    if (index === question.correctAnswer) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  messageElement.innerText = '';
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  if (correct) {
    score++;
    messageElement.innerText = 'Correct!';
  } else {
    messageElement.innerText = 'Wrong! The correct answer is: ' + 
      shuffledQuestions[currentQuestionIndex].answers[shuffledQuestions[currentQuestionIndex].correctAnswer];
  }

  scoreElement.innerText = `Score: ${score}`;
  scoreElement.style.visibility = 'visible';

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    endGame();
  }
}


function endGame() {
  questionContainerElement.classList.add('hide');
  endGameContainer.classList.remove('hide');
  endGameContainer.innerHTML = `
    <h1>GAME OVER</h1>
    <p>Your total score is: ${score}/${shuffledQuestions.length}</p>
     `;
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

initializeGame();














