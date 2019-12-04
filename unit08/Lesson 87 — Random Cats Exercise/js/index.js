function getCat() {
  $.getJSON('http://aws.random.cat/meow')
    .done((data) => {
      $('.img').attr('src', data.file);
    })
    .fail(() => {
      console.log('Something is wrong');
    });
}

getCat();
$('.btn').click(getCat);
