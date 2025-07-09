const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');
const filterInput = document.getElementById('filter');
let limit = 5;
let page = 1;

async function getPosts() {
  try {
    const data = await axios(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    return data;
  } catch (error) {
    const status = error.response ? error.response.status : null;

    if (status === 404) {
      alert('Not Found');
    } else if (status === 500) {
      alert('Server Error');
    } else {
      alert('Error');
    }
  }
}

async function displayPosts() {
  const { data } = await getPosts();
  data.forEach((post) => {
    const div = document.createElement('div');
    div.id = 'post';
    div.classList.add('post');
    div.innerHTML = `
        <div id="post-id" class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
           ${post.body}
          </p>
        </div>
    `;
    postsContainer.appendChild(div);
  });
}

function showLoading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    // Fetch new posts
    setTimeout(() => {
      page++;
      getPosts();
      displayPosts();
    }, 300);
  }, 1000);
}

function getSpecificHeight() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  scrollTop + clientHeight >= scrollHeight ? showLoading() : '';
}

function filterPosts(e) {
  const textInput = e.target;
  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    if (
      title.includes(textInput.value.toLowerCase()) ||
      body.includes(textInput.value.toLowerCase())
    ) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

function init() {
  displayPosts();
  window.addEventListener('scroll', getSpecificHeight);
  filterInput.addEventListener('input', filterPosts);
}

document.addEventListener('DOMContentLoaded', init);
