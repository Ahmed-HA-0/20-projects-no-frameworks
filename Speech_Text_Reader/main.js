const mainEl = document.querySelector('main');
const toggleBtn = document.querySelector('#toggle');
const textBox = document.querySelector('#text-box');
const closeTextBoxBtn = document.querySelector('#close');
const voicesEl = document.querySelector('#voices');
const textareaEl = document.querySelector('#voices');
const readBtn = document.querySelector('#read');
const message = new SpeechSynthesisUtterance();

let voices = [];

const data = [
  {
    img: './img/angry.jpg',
    text: `I'm Angry`,
  },
  {
    img: './img/drink.jpg',
    text: `I'm Thirsty`,
  },
  {
    img: './img/food.jpg',
    text: `I'm Hungry`,
  },
  {
    img: './img/grandma.jpg',
    text: `I want to go to grandmas`,
  },
  {
    img: './img/happy.jpg',
    text: `I'm Happy`,
  },
  {
    img: './img/home.jpg',
    text: `I wanna go home`,
  },
  {
    img: './img/hurt.jpg',
    text: `I'm Hurt`,
  },
  {
    img: './img/outside.jpg',
    text: `I wanna go outside`,
  },
  {
    img: './img/sad.jpg',
    text: `I'm sad`,
  },
  {
    img: './img/scared.jpg',
    text: `I'm scared`,
  },
  {
    img: './img/school.jpg',
    text: `I wanna go to school`,
  },
  {
    img: './img/tired.jpg',
    text: `I'm Tired`,
  },
];

function createBox() {
  data.forEach((item) => {
    const box = document.createElement('div');
    box.classList.add('box');
    const { img, text } = item;
    box.innerHTML = `
      <img src="${img}" alt="${text}">
      <p class="box-info">${text}</p>
    `;

    box.addEventListener('click', () => {
      setTextMssg(text);
      speakText();
      box.classList.add('active');

      // remove the class
      setTimeout(() => box.classList.remove('active'), 1000);
    });

    mainEl.appendChild(box);
  });
}

function setTextMssg(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesEl.appendChild(option);
  });
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

function init() {
  createBox();
  toggleBtn.addEventListener('click', () => textBox.classList.toggle('show'));
  closeTextBoxBtn.addEventListener('click', () =>
    textBox.classList.remove('show')
  );
  speechSynthesis.addEventListener('voiceschanged', getVoices);
  voicesEl.addEventListener('change', setVoice);
  readBtn.addEventListener('click', (e) => {
    const textarea = e.target.previousElementSibling.value;
    setTextMssg(textarea);
    speakText();
  });
}

document.addEventListener('DOMContentLoaded', init);
