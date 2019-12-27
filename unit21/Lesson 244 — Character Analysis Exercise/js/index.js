

const currentLetters = new Map();

function updateGraph(stats) {
  const D3currentLetters = Array.from(stats.entries());
  const updateBars = d3
    .select('#letters')
    .selectAll('rect')
    .data(D3currentLetters, (d) => d[0])
    .attr('fill', '#fbc531');
  d3.select('#count').text(`(New Letters: ${updateBars.enter().nodes().length})`);
  updateBars.exit().remove();
  const allBars = updateBars
    .enter()
    .append('rect')
    .attr('fill', '#4cd137')
    .merge(updateBars);
  const barPadding = 20;
  const barNumber = allBars.nodes().length;
  const barWidth = (800 - (barNumber - 1) * barPadding) / barNumber;
  allBars
    .attr('width', barWidth)
    .attr('height', (d) => 20 * d[1])
    .attr('x', (d, i) => i * (barWidth + barPadding))
    .attr('y', (d) => 400 - 40 * d[1]);
  d3.select('input').property('value', '');

  const updateLetters = d3
    .select('#letters')
    .selectAll('text')
    .data(D3currentLetters, (d) => d[0])
    .text((d) => d[0]);
  updateLetters.exit().remove();
  const allLetters = updateLetters
    .enter()
    .append('text')
    .text((d) => d[0])
    .merge(updateLetters);
  allLetters
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('x', (d, i) => i * (barWidth + barPadding) + barWidth / 2)
    .attr('y', 390)
    .text();
  d3.select('input').property('value', '');
}
d3.select('form').on('submit', () => {
  currentLetters.clear();
  d3.event.preventDefault();
  const currentText = d3.select('input').property('value');
  d3.select('#phrase').text(`Analysis of: ${currentText}`);
  [...currentText].sort().forEach((char) => {
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
