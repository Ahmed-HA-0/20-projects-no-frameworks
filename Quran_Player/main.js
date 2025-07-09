const quran_container = document.getElementById('quran-container');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playBtn = document.getElementById('play-btn');

const title = document.getElementById('title');

const progress_container = document.getElementById('progress-container');
const progress_bar = document.getElementById('progress');

const cover = document.getElementById('cover');
const audio = document.getElementById('audio');

const quran = ['quran1', 'quran2', 'quran3'];
let quranIndex = 2;
let isPlaying;

function loadQuran(quran) {
  title.innerHTML = quran;
  audio.src = `./audio/${quran}.mp3`;
  cover.src = `./images/${quran}.jpg`;
}

function playQuran() {
  audio.play();
  const i = playBtn.firstElementChild;
  i.classList.remove('fa-play');
  i.classList.add('fa-pause');
  isPlaying = true;
  quran_container.classList.add('play');
}

function pauseQuran() {
  audio.pause();
  const i = playBtn.firstElementChild;
  i.classList.add('fa-play');
  i.classList.remove('fa-pause');
  isPlaying = false;
  quran_container.classList.remove('play');
}

function toggleQuran() {
  if (isPlaying) {
    pauseQuran();
  } else {
    playQuran();
  }
}

function prevQuran() {
  quranIndex--;
  if (quranIndex < 0) {
    quranIndex = quran.length - 1;
  }
  loadQuran(quran[quranIndex]);
  playQuran();
}

function nextQuran() {
  quranIndex++;
  if (quranIndex > quran.length - 1) {
    quranIndex = 0;
  }
  loadQuran(quran[quranIndex]);
  playQuran();
}

function setProgress(e) {
  const { currentTime, duration } = e.srcElement;

  const formula = (currentTime / duration) * 100;
  progress_bar.style.width = `${formula}%`;
}

function changeDuration(e) {
  const duration = audio.duration;
  const formula = (e.offsetX / this.clientWidth) * duration;
  audio.currentTime = formula;
}

function init() {
  loadQuran(quran[quranIndex]);
  playBtn.addEventListener('click', toggleQuran);
  prevBtn.addEventListener('click', prevQuran);
  nextBtn.addEventListener('click', nextQuran);
  audio.addEventListener('timeupdate', setProgress);
  audio.addEventListener('ended', nextQuran);
  progress_container.addEventListener('click', changeDuration);
}

document.addEventListener('DOMContentLoaded', init);
