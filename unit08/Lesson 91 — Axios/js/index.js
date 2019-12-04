const button = document.querySelector('.btn');
const text = document.querySelector('.text');

function getBacon() {
  axios
    .get('https://baconipsum.com/api/?type=meat-and-filler')
    .then((response) => {
      const link = response.data;
      text.textContent = link;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
}

window.onload = getBacon();
button.addEventListener('click', getBacon);
