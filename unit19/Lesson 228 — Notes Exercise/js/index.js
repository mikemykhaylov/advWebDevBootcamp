d3.select('.newnote').on('submit', () => {
  d3.event.preventDefault();
  const input = d3.select('.notetext');
  d3.select('.preview').classed('preview', false);
  input.property('value', '');
});

d3.select('.notetext').on('input', () => {
  const currentPreview = d3.select('.preview');
  const currentText = d3.select('.notetext').property('value');
  if (currentText !== '') {
    if (currentPreview.empty()) {
      d3.select('.notes')
        .append('p')
        .classed('note', true)
        .classed('preview', true)
        .text(d3.select('.notetext').property('value'));
    } else {
      currentPreview.text(currentText);
    }
  } else {
    d3.select('.preview').remove();
  }
});

d3.select('#removenotes').on('click', () => {
  d3.selectAll('.note').remove();
});

d3.select('#feelinglucky').on('click', () => {
  d3.selectAll('.note').style('font-size', () => `${Math.floor(Math.random() * 40 + 10)}px`);
});
