// Header Section
const headerEl = document.querySelector('header');
const headerHighScoresEl = document.getElementById('high-scores-link');
const headerTimeLeftEl = document.getElementById('time-left-span');

headerHighScoresEl.addEventListener('click', headerHighScoresElClicked);

// Intro Step
const introStepEl = document.getElementById('intro-section');
const introStartQuizEl = document.getElementById('start-quiz-button');

introStartQuizEl.addEventListener('click', introStartQuizClicked);

// Quiz Step
const quizStepEl = document.getElementById('quiz-section');
const quizQuestionEl = document.getElementById('question-heading');
const quizAnswerEls = document.querySelectorAll('.answer-button');

quizAnswerEls.forEach(function(button, index) {
  button.addEventListener('click', function(event) {
    quizAnswerElClicked(event, index);
  });
});

// Summary Step
const summaryStepEl = document.getElementById('summary-section');
const summaryFinalScoreEl = document.getElementById('final-score-span');
const summaryInitialsEl = document.getElementById('initials-input');
const summarySubmitEl = document.getElementById('submit-button');

summarySubmitEl.addEventListener('click', summarySubmitElClicked);

// Evaluation Section
const evaluationEl = document.getElementById('evaluation-div');
const evaluationResultEl = document.getElementById('evaluation-paragraph');

// High Scores Step
const highScoresStepEl = document.getElementById('high-scores-section');
const highScoresListEl = document.getElementById('high-scores-list');
const highScoresBackEl = document.getElementById('back-button');
const highScoresClearEl = document.getElementById('clear-high-scores-button');

highScoresBackEl.addEventListener('click', highScoresBackElClicked);
highScoresClearEl.addEventListener('click', highScoresClearElClicked);

// Data
let currentStepIndex = 0;
let secondsLeft;
let scoreInterval;
let currentQuestionIndex= 0;
let validationInterval;
let validationSecondsLeft;
let highScores = [];
const localStorageHighScoresKey = 'highScores';

// Questions
const questions = [
  {
    text: 'What is the name of the JavaScript object notation format?',
    answers: ['HTML', 'JSON', 'XML', 'YAML'],
    correct: 1,
  },
  {
    text: 'Which method can be used to add an element to an array?',
    answers: ['append', 'push', 'increase', 'attach'],
    correct: 1,
  },
  {
    text: 'How do you denote a string in JavaScript?',
    answers: ['{...}', '(...)', '[...]', '\"...\"'],
    correct: 3,
  },
];

// Entry point
processStep();

/**
 * Quiz App State Machine
 */
function processStep() {
  switch (currentStepIndex) {
    case 0:
      showIntroStep();
      break;
    case 1:
      showQuizStep();
      updateQuestion();
      updateAnswers();
      break;
    case 2:
      showSummaryStep();
      break;
    case 3:
      showHighScoresStep();
      break;
  }
}

// Header Section

/**
 * Handles updating the score shown to the user.
 */
function updateScore() {
  headerTimeLeftEl.textContent = secondsLeft;
}

/**
 * Callback function that handles clicking the View High Scores link.
 */
function headerHighScoresElClicked() {
  showHighScoresStep();
}

// Intro Step

/**
 * Handles initialization and visibility of Introduction step.
 */
function showIntroStep() {
  if (highScores.length === 0) {
    const item = localStorage.getItem(localStorageHighScoresKey);
    if (item !== null) {
      highScores = JSON.parse(item);
      updateHighScores();
    }
  }

  currentStepIndex = 0;
  currentQuestionIndex = 0;

  secondsLeft = 0;
  headerTimeLeftEl.textContent = secondsLeft;

  highScoresStepEl.classList.add('display-none');
  headerEl.classList.remove('visibility-hidden');
  introStepEl.classList.remove('display-none');
  evaluationEl.classList.add('display-none');
}

/**
 * Handles Start Quiz button click in Introduction Step.
 */
function introStartQuizClicked() {
  processStep(++currentStepIndex);
}

// Quiz Step

/**
 * Handles initialization and visibility of Quiz step.
 */
function showQuizStep() {
  secondsLeft = 100;
  introStepEl.classList.add('display-none');
  quizStepEl.classList.remove('display-none');
  quizStepEl.classList.add('quiz-step');
  startScoreInterval();
}

/**
 * Creates timer that handles decreasing secondsLeft every second.
 */
function startScoreInterval() {
  scoreInterval = setInterval(function() {
    secondsLeft--;
    updateScore();

    if (secondsLeft === 0) {
      clearInterval(scoreInterval);
      showSummaryStep();
    }
  }, 1000);
}

/**
 * Updates question shown to the user.
 */
function updateQuestion() {
  quizQuestionEl.textContent = questions[currentQuestionIndex].text;
}

/**
 * Updates answers shown to the user.
 */
function updateAnswers() {
  quizAnswerEls.forEach(function(element, index) {
    element.textContent = index + 1 + '. ' +
      questions[currentQuestionIndex].answers[index];
  });
}

/**
 * Callback function that handles clicking one of the answer buttons.
 * @param {Event} event The click event.
 * @param {number} index The element index.
 */
function quizAnswerElClicked(event, index) {
  processAnswer(index);
}

/**
 * Handles processing the answer.
 * @param {Number} answerIndex The user's answer index.
 */
function processAnswer(answerIndex) {
  showAnswerEvaluation();

  const correct = isCorrectAnswer(answerIndex);

  if (correct) {
    const correctAudio = new Audio('./assets/audio/correct.wav');
    correctAudio.play().then(() => console.log('correct.wav played.'));
  } else {
    secondsLeft -= 10;
    const incorrectAudio = new Audio('./assets/audio/incorrect.wav');
    incorrectAudio.play().then(() => console.log('incorrect.wav played.'));
  }

  updateEvaluationMessage(correct);

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    updateQuestion();
    updateAnswers();
  } else {
    showSummaryStep();
  }
}

/**
 * Handles showing the answer evaluation result to the user.
 */
function showAnswerEvaluation() {
  validationSecondsLeft = 3;
  startValidationInterval();
  evaluationEl.classList.remove('display-none');
}

/**
 * Creates timer that handles the seconds the answer evaluation is shown.
 */
function startValidationInterval() {
  validationInterval = setInterval(function() {
    validationSecondsLeft--;

    if (validationSecondsLeft === 0) {
      evaluationEl.classList.add('display-none');
      clearInterval(validationInterval);
    }
  }, 2000);
}

/**
 * Handles checking the answer provided with the known right answer.
 * @param {Number} index The user's answer index.
 * @return {boolean} Whether the answer is correct or not.
 */
function isCorrectAnswer(index) {
  return questions[currentQuestionIndex].correct === index;
}

/**
 * Handles updating the evaluation message shown to the user.
 * @param {boolean} correct Whether the answer is correct or not.
 */
function updateEvaluationMessage(correct) {
  if (correct) {
    evaluationResultEl.textContent = 'Correct!';
  } else {
    evaluationResultEl.textContent = 'Wrong!';
  }
}

// Summary Step

/**
 * Handles initialization and visibility of Summary step.
 */
function showSummaryStep() {
  currentStepIndex = 2;
  summaryInitialsEl.value = '';
  quizStepEl.classList.add('display-none');
  quizStepEl.classList.remove('quiz-step');
  summaryStepEl.classList.remove('display-none');
  updateFinalScore();
  clearInterval(scoreInterval);
}

/**
 * Handles updating the final score shown to the user.
 */
function updateFinalScore() {
  summaryFinalScoreEl.textContent = secondsLeft;
}

/**
 * Callback function that handles submit button clicked.
 */
function summarySubmitElClicked() {
  if (validateInitials()) {
    showHighScoresStep();

    highScores.push({initials: summaryInitialsEl.value, score: secondsLeft});
    highScores.sort(function(a, b) {
      return b.score - a.score;
    });
    if (highScores.length > 10) {
      highScores.length = 10;
    }
    localStorage.setItem(localStorageHighScoresKey, JSON.stringify(highScores));
    updateHighScores();
    currentStepIndex++;
  }
}

/**
 * Handles validation the initials entered by user.
 * @return {boolean} Whether the initials are valid or not.
 */
function validateInitials() {
  const valid = summaryInitialsEl.value.length > 1 &&
    summaryInitialsEl.value.length < 5 &&
    !/[^a-z]/i.test(summaryInitialsEl.value);
  if (!valid) {
    // eslint-disable-next-line max-len
    window.alert('Valid initials are in the form of 2 to 4 letters in length. Please try again.');
    summaryInitialsEl.value = '';
  }
  return valid;
}

// High Scores Step

/**
 * Handles initialization and visibility of High Scores step.
 */
function showHighScoresStep() {
  switch (currentStepIndex) {
    case 0: {
      hideIntroStep();
      break;
    }
    case 1: {
      clearInterval(scoreInterval);
      hideQuizStep();
      break;
    }
  }

  currentStepIndex = 3;

  headerEl.classList.add('visibility-hidden');
  summaryStepEl.classList.add('display-none');
  highScoresStepEl.classList.remove('display-none');
}

/**
 * Handles hiding Introduction step.
 */
function hideIntroStep() {
  introStepEl.classList.add('display-none');
}

/**
 * Handles hiding Quiz step.
 */
function hideQuizStep() {
  quizStepEl.classList.add('display-none');
}

/**
 * Callback function that handles clicking the Back button.
 */
function highScoresBackElClicked() {
  showIntroStep();
}

/**
 * Callback function that handles clicking the Clear High Scores button.
 */
function highScoresClearElClicked() {
  highScores = [];
  localStorage.removeItem(localStorageHighScoresKey);
  updateHighScores();
  showIntroStep();
}

/**
 * Handles updating the high scores shown to the user.
 */
function updateHighScores() {
  highScoresListEl.innerHTML = '';

  if (highScores.length === 0) {
    highScoresClearEl.classList.add('display-none');
  } else {
    for (const [index, highScore] of highScores.entries()) {
      const newListItem = document.createElement('li');
      newListItem.innerHTML = (index + 1) + '. ' +
        highScore.initials + ' - ' + highScore.score;
      highScoresListEl.appendChild(newListItem);
    }
    highScoresClearEl.classList.remove('display-none');
  }
}

