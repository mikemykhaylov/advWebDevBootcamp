d3.selectAll('li')
  .style('background-color', (_, idx) => (idx % 2 === 0 ? 'gray' : 'lightgray'))
  .style('font-size', () => `${Math.floor(Math.random() * 40 + 10)}px`)
  .classed('listitem', true);
