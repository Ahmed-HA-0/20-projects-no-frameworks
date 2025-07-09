const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieTicket = document.getElementById('select-movie');
let ticketPrice = +movieTicket.value;

function saveTicketPriceToStorage(movieTicket, ticketPrice) {
  localStorage.setItem('movieTicket', JSON.stringify(movieTicket));
  localStorage.setItem('ticketPrice', JSON.stringify(ticketPrice));
}

function fetchFromStorage() {
  const movieTicket = localStorage.getItem('movieTicket')
    ? JSON.parse(localStorage.getItem('movieTicket'))
    : null;

  const ticketPrice = localStorage.getItem('ticketPrice')
    ? JSON.parse(localStorage.getItem('ticketPrice'))
    : null;

  const selectedSeats = localStorage.getItem('selectedSeats')
    ? JSON.parse(localStorage.getItem('selectedSeats'))
    : null;

  return {
    movieTicket,
    ticketPrice,
    selectedSeats,
  };
}

function displayFromStorage() {
  const {
    movieTicket: selectedMovieIndex,
    ticketPrice: UpdatedTicketPrice,
    selectedSeats,
  } = fetchFromStorage();

  seats.forEach((seat, index) => {
    if (selectedSeats.indexOf(index) !== -1) {
      seat.classList.add('selected');
    }
  });

  movieTicket.selectedIndex = selectedMovieIndex;
  ticketPrice = +UpdatedTicketPrice;
  updatedSelected();
}

function updatedSelected() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatIndexs = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatIndexs));

  const seatsCount = +selectedSeats.length;
  count.innerText = seatsCount;

  const price = seatsCount * ticketPrice;
  total.innerText = price;
}

function onSelectedSeat(e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  updatedSelected();
}

function init() {
  container.addEventListener('click', onSelectedSeat);
  movieTicket.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    saveTicketPriceToStorage(e.target.selectedIndex, e.target.value);
    updatedSelected();
  });
  displayFromStorage();
}

document.addEventListener('DOMContentLoaded', init);
