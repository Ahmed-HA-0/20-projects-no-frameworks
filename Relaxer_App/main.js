const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breatheAnimation = () => {
  text.innerText = 'Breathe In';
  container.classList.remove('shrink');
  container.classList.add('grow');
  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out';
      container.classList.remove('grow');
      container.classList.add('shrink');
    }, holdTime);
  }, breatheTime);
};

const init = () => {
  breatheAnimation();
  setInterval(breatheAnimation, totalTime);
};

document.addEventListener('DOMContentLoaded', init);
