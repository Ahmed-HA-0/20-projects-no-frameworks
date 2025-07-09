const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const converter_one = document.getElementById('converter-one');
const converter_two = document.getElementById('converter-two');
const swapBtn = document.getElementById('swap-btn');
const rateEl = document.getElementById('rate');

async function calculate() {
  try {
    const currencyEl_oneValue = currencyEl_one.value;
    const currencyEl_twoValue = currencyEl_two.value;
    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${`2b89541a3efaed8d6937941d`}/latest/${currencyEl_oneValue}`
    );
    const rate = data.conversion_rates[currencyEl_twoValue];

    rateEl.innerText = `1 ${currencyEl_oneValue} = ${rate} ${currencyEl_twoValue}`;

    converter_two.value = (converter_one.value * rate).toFixed(2);
  } catch (error) {
    const status = error.response ? error.response.status : null;
    if (status === 404) {
      console.log('Not Found');
    } else if (status === 500) {
      console.log('Server Error');
    } else {
      console.log(error.message);
    }
  }
}

function init() {
  currencyEl_one.addEventListener('change', calculate);
  currencyEl_two.addEventListener('change', calculate);
  converter_one.addEventListener('input', calculate);
  converter_two.addEventListener('input', calculate);
  swapBtn.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
  });
}

document.addEventListener('DOMContentLoaded', init);
