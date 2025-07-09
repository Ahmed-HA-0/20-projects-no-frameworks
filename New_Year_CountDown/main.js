const year = document.getElementById('year');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const loader = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`${currentYear + 1}-01-01T00:00:00`);

function displayCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerText = d;
  hours.innerText = h < 10 ? `0${h}` : h;
  minutes.innerText = m < 10 ? `0${m}` : m;
  seconds.innerText = s < 10 ? `0${s}` : s;
}

function init() {
  setInterval(displayCountdown, 1000);
  year.innerText = currentYear + 1;
  setTimeout(() => {
    loader.remove();
    countdown.style.display = 'flex';
  }, 1000);
}

document.addEventListener('DOMContentLoaded', init);
