const currentLetters = new Map();

function updateGraph(stats) {
  const D3currentLetters = Array.from(stats.entries());
  const update = d3
    .select('#letters')
    .selectAll('div')
    .data(D3currentLetters, (d) => d[0])
    .classed('new', false);
  d3.select('#count').text(`(New Letters: ${update.enter().nodes().length})`);
  update.exit().remove();
  update
    .enter()
    .append('div')
    .classed('letter', true)
    .classed('new', true)
    .text((d) => d[0])
    .style('height', (d) => `${20 * d[1]}px`);
  d3.select('input').property('value', '');
}
d3.select('form').on('submit', () => {
  currentLetters.clear();
  d3.event.preventDefault();
  const currentText = d3.select('input').property('value');
  d3.select('#phrase').text(`Analysis of: ${currentText}`);
  [...currentText].forEach((char) => {
    if (!currentLetters.get(char)) {
      currentLetters.set(char, 1);
    } else {
      currentLetters.set(char, currentLetters.get(char) + 1);
    }
  });
  updateGraph(currentLetters);
});

d3.select('#reset').on('click', () => {
  d3.select('#phrase').text('');
  currentLetters.clear();
  updateGraph(currentLetters);
});
