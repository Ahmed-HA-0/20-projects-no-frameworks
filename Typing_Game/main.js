const wordEl = document.getElementById('word');
const textInput = document.getElementById('text');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const endgameContainer = document.getElementById('end-game-container');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let time = 10;
let score = 0;
let randomWord;
let timeIntervalId;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    displayGameOver();
    clearInterval(timeIntervalId);
  }
}

function addToDom() {
  randomWord = getRandomWord();
  wordEl.innerHTML = randomWord;
}

function displayGameOver() {
  endgameContainer.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button class="reload-btn">Reload</button>
  `;

  endgameContainer.style.display = 'flex';

  const reloadBtn = document.querySelector('.reload-btn');

  reloadBtn.addEventListener('click', () => window.location.reload());
}

function onTypeText(e) {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addToDom();
    score++;
    e.target.value = '';
    time += 2;
  }

  scoreEl.innerHTML = score;
}

function init() {
  addToDom();
  textInput.addEventListener('input', onTypeText);
  textInput.focus();
  timeIntervalId = setInterval(updateTime, 1000);
}

document.addEventListener('DOMContentLoaded', init);
