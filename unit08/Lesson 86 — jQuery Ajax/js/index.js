$('.btn').click(() => {
  $.ajax({
    method: 'GET',
    url: 'https://baconipsum.com/api/?type=meat-and-filler',
    dataType: 'json',
  })
    .done((data) => {
      $('.text').text(data);
    })
    .fail(() => {
      $('.text').text('Something is wrong');
    });
});

$('.getBtn').click(() => {
  $.get('https://baconipsum.com/api/?type=meat-and-filler').done((data) => console.log(data));
});

$('.postBtn').click(() => {
  $.post('https://catsarecoolandsoaredogs.com')
    .done((data) => console.log(data))
    .fail(() => {
      console.log('Error');
    });
});

$('.getJsonBtn').click(() => {
  $.getJSON('https://baconipsum.com/api/?type=meat-and-filler').done((data) => console.log(data));
});
