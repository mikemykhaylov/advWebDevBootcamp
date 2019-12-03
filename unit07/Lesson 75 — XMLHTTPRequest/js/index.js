const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  console.log(`Ready state change is ${xhr.readyState}`);
  if (xhr.readyState === 4) {
    switch (xhr.status) {
      case 200:
        console.log(xhr.responseText);
        break;
      default:
        console.log(xhr.status);
        break;
    }
  }
};
xhr.open('GET', 'https://api.github.com/zen');
xhr.send();
