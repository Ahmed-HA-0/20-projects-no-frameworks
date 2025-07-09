import './style.css';
const productsContainer = document.getElementById('products-wrapper');
const checkEls = document.querySelectorAll('input[type=checkbox]');
const filterContainer = document.getElementById('filter-items');
const searchInput = document.getElementById('search');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');

let cartItemCount = 0;

let prodcutsEls = [];

const products = [
  {
    name: 'Sony Playstation 5',
    url: 'images/playstation_5.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'images/samsung_galaxy.png',
    type: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'images/cannon_eos_camera.png',
    type: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    type: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'images/lg_tv.png',
    type: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    type: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'images/samsung_tv.png',
    type: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    type: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    type: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'images/toshiba_tv.png',
    type: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    type: 'smartphones',
    price: 999.99,
  },
];

function createProducts() {
  products.forEach((product) => {
    const div = document.createElement('div');
    div.classList.add('w-full', 'item');
    div.innerHTML = `
        <div
          class="bg-gray-100 group cursor-pointer border rounded w-full relative overflow-hidden" data-type="${
            product.type
          }"
        >
          <img
            class="rounded-2xl w-full"
            src="${product.url}"
            alt=""
          />
          <div
            class="absolute inset-0 w-full h-full group-hover:bg-black/20 transition duration-400"
          ></div>

          <button
            class="status block cursor-pointer absolute bottom-0 left-0 right-0 w-full bg-black py-2 text-white transition-all duration-200 translate-y-full group-hover:translate-y-0"
          >
            Add to cart
          </button>
        </div>
        <div class="text-left text-white mt-2">
          <h2 id="product-title" class="capitalize text-xl">
            ${product.name}
          </h2>
          <span id="product-price" class="font-bold">$${product.price.toLocaleString()}</span>
        </div>
    `;
    prodcutsEls.push(div);
    productsContainer.appendChild(div);
  });
  const addCartBtn = document.querySelectorAll('.status');
  addEventToBtn(addCartBtn);
}

function addEventToBtn(addCartBtn) {
  addCartBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      addToCart(e);
    });
  });
}

function onFilterProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const checkedCategories = Array.from(checkEls)
    .filter((check) => check.checked)
    .map((check) => check.id);

  prodcutsEls.forEach((productEl, indx) => {
    const product = products[indx];

    const matchedSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const matchedcheckedType =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.type);

    if (matchedSearchTerm && matchedcheckedType) {
      productEl.classList.remove('hidden');
    } else {
      productEl.classList.add('hidden');
    }
  });
}

function addToCart(e) {
  const statusBtnEl = e.target;

  if (statusBtnEl.classList.contains('added')) {
    statusBtnEl.classList.remove('added');
    statusBtnEl.innerText = 'Add to cart';
    statusBtnEl.classList.remove('bg-red-600');
    statusBtnEl.classList.add('bg-black');
    cartItemCount--;
  } else {
    statusBtnEl.classList.add('added');
    statusBtnEl.innerText = 'Remove from cart';
    statusBtnEl.classList.add('bg-red-600');
    statusBtnEl.classList.remove('bg-black');
    cartItemCount++;
  }
  cartCount.innerHTML = cartItemCount;
}

function init() {
  createProducts();
  searchInput.addEventListener('input', onFilterProducts);
  filterContainer.addEventListener('change', onFilterProducts);
}

document.addEventListener('DOMContentLoaded', init);
