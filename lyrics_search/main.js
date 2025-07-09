const formEl = document.getElementById('form');
const resultsEl = document.getElementById('results');
const more = document.getElementById('more');

function handleSearchSubmit(e) {
  e.preventDefault();
  const searchInput = e.target.querySelector('#search');
  if (!searchInput.value) {
    alert('Please fill in the fields');
  } else {
    fetchSongsLyrics(searchInput.value);
  }
}

async function fetchSongsLyrics(input) {
  try {
    const { data } = await axios(`https://api.lyrics.ovh/suggest/${input}`);

    addLyricsToDOM(data);
  } catch (error) {
    const status = error.response ? error.response.stauts : null;
    if (status === 404) {
      alert('Not Found');
    } else if (status === 500) {
      alert('Server Error');
    }
  }
}

function addLyricsToDOM(data) {
  resultsEl.innerHTML = '';
  data.data.forEach((song) => {
    const ul_El = document.createElement('ul');
    ul_El.classList.add('songs');
    ul_El.innerHTML = `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-song="${song.title}">Get Lyrics</button>
      </li>    
    `;
    resultsEl.appendChild(ul_El);
  });

  if (data.prev || data.next) {
    more.innerHTML = `
        ${data.prev ? `<button class="btn">Prev</button>` : ''}
        ${data.next ? `<button class="btn">Next</button>` : ''}
      `;
  } else {
    more.innerHTML = '';
  }
  const prevBtn = more.querySelector('button:first-of-type');
  const nextBtn = more.querySelector('button:last-of-type');

  prevBtn.addEventListener('click', () => fetchMoreSongsLyrics(data.prev));
  nextBtn.addEventListener('click', () => fetchMoreSongsLyrics(data.next));
}

async function fetchMoreSongsLyrics(url) {
  try {
    const { data } = await axios(`https://cors-anywhere.herokuapp.com/${url}`);

    console.log(data);
    addLyricsToDOM(data);
  } catch (error) {
    const status = error.response ? error.response.stauts : null;
    if (status === 404) {
      alert('Not Found');
    } else if (status === 500) {
      alert('Server Error');
    }
  }
}

async function fetchLyrics(artist, songTitle) {
  try {
    const { data } = await axios(
      `https://api.lyrics.ovh/v1/${artist}/${songTitle}`
    );

    if (data.error) {
      result.innerHTML = data.error;
    } else {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

      resultsEl.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;
    }
  } catch (error) {
    const status = error.response ? error.response.stauts : null;
    if (status === 404) {
      alert('Not Found');
    } else if (status === 500) {
      alert('Server Error');
    }
  }
}

function getLyricsData(e) {
  if (e.target.className === 'btn') {
    const artist = e.target.getAttribute('data-artist');
    const songTitle = e.target.getAttribute('data-song');
    fetchLyrics(artist, songTitle);
  }
}

function init() {
  formEl.addEventListener('submit', handleSearchSubmit);
  resultsEl.addEventListener('click', getLyricsData);
}

document.addEventListener('click', init);
