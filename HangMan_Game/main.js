const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notificationContainer = document.getElementById('notification-container');
const finalMssgEl = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = ['programming', 'interface', 'potato', 'hamster', 'application'];
let selectedWords = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
  ${selectedWords
    .split('')
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\ng/, '');

  if (innerWord === selectedWords) {
    finalMssgEl.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;
    if (error > index) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMssgEl.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notificationContainer.classList.add('show');

  setTimeout(() => {
    notificationContainer.classList.remove('show');
  }, 2000);
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();

    if (selectedWords.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWords = words[Math.floor(Math.random() * words.length)];
  popup.style.display = 'none';
  displayWord();
  updateWrongLettersEl();
});

displayWord();
