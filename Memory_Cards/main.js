const clearAllCards = document.getElementById('clear');
const cardsContainer = document.getElementById('cards-container');
const createNewCardBtn = document.getElementById('show');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const add_card_container = document.getElementById('add-container');
const hideBtn = document.getElementById('hide');
const currentCardPageEl = document.getElementById('current');
// const textarea_Q_El = document.getElementById('question');
// const textarea_A_El = document.getElementById('answer');
const applyNewCardBtn = document.getElementById('add-card');

let currentCardIndx = 0;
const cardsEl = [];

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

function createCards(cards) {
  // const cards = fetchFromStorage();

  cards.forEach((card, indx) => {
    createCard(card, indx);
  });
}

function createCard(cardData, indx) {
  const card = document.createElement('div');
  card.classList.add('card');
  if (indx === 0) {
    card.classList.add('active');
  }
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${cardData.question}</p>
      </div>
      <div class="inner-card-back">
        <p>A ${cardData.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updatePage();
}

function updatePage() {
  return (currentCardPageEl.innerText = `${currentCardIndx + 1}/${
    cardsEl.length
  }`);
}

function createNewCard(e) {
  const textarea_Q_El =
    e.target.previousElementSibling.previousElementSibling.lastElementChild;
  const textarea_A_El = e.target.previousElementSibling.lastElementChild;

  if (textarea_Q_El.value.trim() && textarea_A_El.value.trim()) {
    const newCard = {
      question: textarea_Q_El.value,
      answer: textarea_A_El.value,
    };
    addToStorage(newCard);
    displayFromStorage();
    updatePage();
    textarea_A_El.value = '';
    textarea_Q_El.value = '';
    add_card_container.classList.remove('show');
    window.location.reload();
  } else {
    alert('Please Fill in the Fields');
    return;
  }
}

function fetchFromStorage() {
  let cards = [];

  if (localStorage.getItem('meomry-cards') === null) {
    cards = [];
  } else {
    cards = JSON.parse(localStorage.getItem('meomry-cards'));
  }

  return cards;
}

function addToStorage(card) {
  const cards = fetchFromStorage();
  cards.push(card);
  localStorage.setItem('meomry-cards', JSON.stringify(cards));
}

function clearFromStorage() {
  localStorage.clear();
  window.location.reload();
}

function displayFromStorage() {
  const cards = fetchFromStorage();
  createCards(cards);
}

function init() {
  nextBtn.addEventListener('click', () => {
    if (currentCardIndx < cardsEl.length - 1) {
      cardsEl[currentCardIndx].classList.add('left');
      cardsEl[currentCardIndx].classList.remove('active');
      currentCardIndx++;
      cardsEl[currentCardIndx].classList.add('active');
      updatePage();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentCardIndx > 0) {
      cardsEl[currentCardIndx].classList.remove('active');
      currentCardIndx--;
      cardsEl[currentCardIndx].classList.add('active');
      cardsEl[currentCardIndx].classList.remove('left');
    }

    updatePage();
  });

  createNewCardBtn.addEventListener('click', () =>
    add_card_container.classList.add('show')
  );

  hideBtn.addEventListener('click', () =>
    add_card_container.classList.remove('show')
  );

  applyNewCardBtn.addEventListener('click', createNewCard);

  clearAllCards.addEventListener('click', clearFromStorage);

  displayFromStorage();
}

document.addEventListener('DOMContentLoaded', init);
