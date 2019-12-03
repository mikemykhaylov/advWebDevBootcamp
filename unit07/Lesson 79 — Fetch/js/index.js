const button = document.querySelector('button');

button.addEventListener('click', () => {
  fetch('https://api.github.com/users/octocat/orgsasda')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response;
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
