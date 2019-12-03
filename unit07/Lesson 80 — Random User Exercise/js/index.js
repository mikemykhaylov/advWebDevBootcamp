const photo = document.querySelector('.photo');
const name = document.querySelector('.name');
const nick = document.querySelector('.nick');
const mail = document.querySelector('.mail');
const city = document.querySelector('.city');
const button = document.querySelector('button');

function getUser() {
  fetch('https://randomuser.me/api/')
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      const personphoto = data.results[0].picture.large;
      const personname = `${data.results[0].name.first} ${data.results[0].name.last}`;
      const personnick = data.results[0].login.username;
      const personmail = data.results[0].email;
      const personcity = data.results[0].location.city;
      photo.style.backgroundImage = `url(${personphoto}`;
      name.textContent = personname;
      nick.textContent = personnick;
      mail.textContent = `Email: ${personmail}`;
      city.textContent = `City: ${personcity}`;
    });
}

window.onload = getUser();
button.addEventListener('click', getUser);
