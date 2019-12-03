const button = document.querySelector('.btn');
const img = document.querySelector('.img');
const xhr = new XMLHttpRequest();

function getDog() {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const link = JSON.parse(xhr.responseText).message;
      img.setAttribute('src', link);
    }
  };
  xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');
  xhr.send();
}

window.onload = getDog();
button.addEventListener('click', getDog);
