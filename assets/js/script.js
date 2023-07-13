// Header Section
var headerEl = document.querySelector('header');
var headerHighScoresEl = document.getElementById('high-scores-link');
var headerTimeLeftEl = document.getElementById('time-left-span');

// Intro Step
var introStepEl = document.getElementById('intro-section');
var introStartQuizEl = document.getElementById('start-quiz-button');

introStartQuizEl.addEventListener('click', introStartQuizClicked);

// Quiz Step
var quizStepEl = document.getElementById('quiz-section');
var quizQuestionEl = document.getElementById('question-heading');
var quizAnswerEls = document.querySelectorAll('.answer-button');

// Summary Step
var summaryStepEl = document.getElementById('summary-section');
var summaryFinalScoreEl = document.getElementById('final-score-span');

// Evaluation Section
var evaluationEl = document.getElementById('evaluation-div');
var evaluationResultEl = document.getElementById('evaluation-paragraph');

// High Scores Step
var highScoresStepEl = document.getElementById('high-scores-section');
var highScoresListEl = document.getElementById('high-scores-list');
var highScoresBackEl = document.getElementById('back-button');
var highScoresClearEl = document.getElementById('clear-high-scores-button');

// Data
var currentStepIndex = 0;
var secondsLeft;
var scoreInterval;
var currentQuestionIndex= 0;

// Questions
var questions = [
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

// Intro Step

/**
 * Handles initialization and visibility of Introduction step.
 */
function showIntroStep() {

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

// Summary Step

/**
 * Handles initialization and visibility of Summary step.
 */
function showSummaryStep() {

}

// High Scores Step

/**
 * Handles initialization and visibility of High Scores step.
 */
function showHighScoresStep() {

}
