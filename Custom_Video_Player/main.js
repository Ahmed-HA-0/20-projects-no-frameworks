const video = document.getElementById('video');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updatePlayIcon() {
  const playIcon = playBtn.firstElementChild;
  if (video.paused) {
    playIcon.className = 'fa-solid fa-play';
  } else {
    playIcon.className = 'fa-solid fa-pause';
  }
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const formula = (currentTime / duration) * 100;
  progress.value = formula;

  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);

  mins = mins < 10 ? `0${mins}` : `${mins}`;
  secs = secs < 10 ? `0${secs}` : `${secs}`;

  timeStamp.innerText = `${mins}:${secs}`;
}

function setVedioProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

function init() {
  video.addEventListener('click', toggleVideoStatus);
  video.addEventListener('play', updatePlayIcon);
  video.addEventListener('pause', updatePlayIcon);
  video.addEventListener('timeupdate', updateProgress);
  playBtn.addEventListener('click', toggleVideoStatus);
  stopBtn.addEventListener('click', stopVideo);
  progress.addEventListener('change', setVedioProgress);
}

document.addEventListener('DOMContentLoaded', init);
