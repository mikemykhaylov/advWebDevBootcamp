const span = document.querySelector('span');
const button = document.querySelector('button');
const xhr = new XMLHttpRequest();

function getPrice() {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const price = JSON.parse(xhr.responseText).bpi.USD.rate;
      span.textContent = `${price} USD`;
    }
  };
  xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
  xhr.send();
}

window.onload = getPrice();
button.addEventListener('click', getPrice);
