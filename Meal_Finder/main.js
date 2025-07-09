// const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const submit = document.getElementById('submit');
const randomBtn = document.getElementById('random-btn');
const mealsEl = document.getElementById('meals');
const resultSearch = document.getElementById('result-search');
const singleMealsContainer = document.getElementById('single-meals-container');

const searchMeal = async (e) => {
  try {
    e.preventDefault();
    const searchInput = e.target.querySelector('input');
    if (searchInput.value.trim()) {
      const { data } = await axios(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`
      );
      createSearchTitle(searchInput.value, (type = 'found'));

      if (data.meals === null) {
        createSearchTitle(
          'There are no search results. Try again!',
          (type = 'error')
        );
      } else {
        singleMealsContainer.innerHTML = '';
        mealsEl.innerHTML = '';
        data.meals.forEach((meal) => {
          const div = document.createElement('div');
          div.classList.add('meal');
          div.innerHTML = `
            <img src="${meal.strMealThumb}" alt="">
            <div class="meal-info" data-meal-id="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          `;
          mealsEl.appendChild(div);
        });
      }

      searchInput.value = '';
    } else {
      alert('Please Enter a Search Term');
      return;
    }
  } catch (error) {
    const status = error.response ? error.response.status : null;

    if (status === 404) {
      alert('Not Found');
    } else if (status === 500) {
      alert('Server Error');
    }
  }
};

const fetchMealById = async (mealId) => {
  try {
    const { data } = await axios(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );

    const meal = data.meals[0];

    addMealToDom(meal);
  } catch (error) {
    const status = error.response ? error.response.status : null;

    if (status === 404) {
      alert('Not Found');
    } else if (status === 500) {
      alert('Server Error');
    }
  }
};

const getRandomMeal = async () => {
  mealsEl.innerHTML = '';
  resultSearch.innerHTML = '';

  const { data } = await axios(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );

  const meal = data.meals[0];
  addMealToDom(meal);
};

const createSearchTitle = (message, result = 'found') => {
  resultSearch.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.innerHTML =
    result === 'found'
      ? `Search result for '${message}':`
      : `'There are no search results. Try again!'`;
  resultSearch.appendChild(h2);
  return h2;
};

const singleMealId = (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-meal-id');
    fetchMealById(mealId);
  }
};

const addMealToDom = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealsContainer.innerHTML = '';

  const singleMealEl = document.createElement('div');
  singleMealEl.classList.add('single-meal');
  singleMealEl.innerHTML = `
  <h1>${meal.strMeal}</h1>
      <div class="single-meal-img">
      <img src="${meal.strMealThumb}" alt="">
        </div>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        <p>${meal.strInstructions}</p>
        </div>
        <div class="ingredients">
          <h2>Ingredients</p>
          <ul>
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join('')}
  `;

  singleMealsContainer.appendChild(singleMealEl);
};

const init = () => {
  submit.addEventListener('submit', searchMeal);
  mealsEl.addEventListener('click', singleMealId);
  randomBtn.addEventListener('click', getRandomMeal);
};

document.addEventListener('click', init);
