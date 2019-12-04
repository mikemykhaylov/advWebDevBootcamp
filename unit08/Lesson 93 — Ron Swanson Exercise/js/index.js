const xhrBtn = document.querySelector('#xhr');
const fetchBtn = document.querySelector('#fetch');
const axiosBtn = document.querySelector('#axios');
const quote = document.querySelector('#quote');
const XHR = new XMLHttpRequest();
const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

xhrBtn.addEventListener('click', () => {
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      switch (XHR.status) {
        case 200:
          [quote.textContent] = JSON.parse(XHR.responseText);
          break;
        default:
          console.log(xhrBtn.status);
          break;
      }
    }
  };
  XHR.open('GET', url);
  XHR.send();
});

fetchBtn.addEventListener('click', () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      [quote.textContent] = data;
    });
});

$('#jquery').click(() => {
  $.getJSON(url).done((data) => $('#quote').text(data));
});

axiosBtn.addEventListener('click', () => {
  axios.get(url).then((response) => {
    quote.textContent = response.data;
  });
});
