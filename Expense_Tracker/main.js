const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');

function addTransactionDom(transaction) {
  transaction.forEach((transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(`${transaction.amount < 0 ? 'minus' : 'plus'}`);
    const button = document.createElement('button');
    button.classList.add('delete-btn');
    button.innerHTML = 'x';
    button.addEventListener('click', () =>
      removeItemFromStorage(transaction.id)
    );

    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>`;

    item.appendChild(button);
    list.appendChild(item);
  });
}

function updatedValues() {
  const transactions = fetchFromLocalStorage();
  const amounts = transactions.map((item) => item.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function addTransaction(e) {
  e.preventDefault();
  const textInput = e.target.firstElementChild.lastElementChild;
  const amountInput = e.target.querySelector(
    '.form-control:last-of-type'
  ).lastElementChild;
  if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
    alert('Please fill in the text and amount fields');
    return;
  }

  const transaction = {
    id: generateID(),
    text: textInput.value.trim(),
    amount: +amountInput.value,
  };

  textInput.value = '';
  amountInput.value = '';

  addToStorage(transaction);

  addTransactionDom([transaction]);
  updatedValues();
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addToStorage(newTransactions) {
  const transaction = fetchFromLocalStorage();
  transaction.push(newTransactions);
  localStorage.setItem('expense-tracker', JSON.stringify(transaction));
}

function fetchFromLocalStorage() {
  let transactions = [];

  if (localStorage.getItem('expense-tracker') === null) {
    transactions = [];
  } else {
    transactions = JSON.parse(localStorage.getItem('expense-tracker'));
  }

  return transactions;
}

function removeItemFromStorage(id) {
  let transactions = fetchFromLocalStorage();
  list.innerHTML = '';
  transactions = transactions.filter((item) => item.id !== id);
  addTransactionDom(transactions);
  localStorage.setItem('expense-tracker', JSON.stringify(transactions));
  updatedValues();
}

function displayFromStorage() {
  const transactions = fetchFromLocalStorage();
  addTransactionDom(transactions);
}

function init() {
  displayFromStorage();
  form.addEventListener('submit', addTransaction);
  updatedValues();
}

document.addEventListener('DOMContentLoaded', init);
