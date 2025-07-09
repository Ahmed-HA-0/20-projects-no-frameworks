const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
let data = [];

async function getUserData() {
  const res = await fetch('https://randomuser.me/api');
  const { results: userData } = await res.json();

  const user = userData[0].name;

  const userInfo = {
    name: `${user.first} ${user.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(userInfo);
}

function addData(userInfo) {
  data.push(userInfo);

  updateDOM();
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function filterMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

function sortRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth:<strong>$${formatCurrency(
    wealth
  )}</strong</h3>`;
  main;
  main.appendChild(wealthEl);
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
  providedData.forEach((user) => {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<strong>${user.name}</strong> $${formatCurrency(
      user.money
    )}
    `;
    main.appendChild(div);
  });
}

function formatCurrency(money) {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function init() {
  addUserBtn.addEventListener('click', getUserData);
  doubleMoneyBtn.addEventListener('click', doubleMoney);
  showMillionairesBtn.addEventListener('click', filterMillionaires);
  sortBtn.addEventListener('click', sortRichest);
  calculateWealthBtn.addEventListener('click', calculateWealth);
  getUserData();
  getUserData();
  getUserData();
}

document.addEventListener('DOMContentLoaded', init);
