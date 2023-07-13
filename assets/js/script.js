// Header Section
var headerEl = document.querySelector('header');
var headerHighScoresEl = document.getElementById('high-scores-link');
var headerTimeLeftEl = document.getElementById('time-left-span');

// Intro Step
var introStepEl = document.getElementById('intro-section');
var introStartQuizEl = document.getElementById('start-quiz-button');

// Quiz Step
var quizStepEl = document.getElementById('quiz-section');
var quizQuestionEl = document.getElementById('question-heading');
var quizAnswerEls = document.getElementsByClassName('answer-button');

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

// Intro Step

/**
 * Handles initialization and visibility of Introduction step.
 */
function showIntroStep() {

}

// Quiz Step

/**
 * Handles initialization and visibility of Quiz step.
 */
function showQuizStep() {

}

/**
 * Updates question shown to the user.
 */
function updateQuestion() {

}

/**
 * Updates answers shown to the user.
 */
function updateAnswers() {

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
