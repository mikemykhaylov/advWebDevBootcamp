const svgSize = 800;
const svg = d3
  .select('svg')
  .attr('width', svgSize)
  .attr('height', svgSize);
const linksGroup = svg.append('g').classed('links', true);
const nodesGroup = svg.append('g').classed('nodes', true);
d3.csv('../data/senateData.csv', (row, i, cols) => {
  const committees = cols.slice(2).filter((h) => row[h] === '1');
  return {
    name: row.name,
    party: row.party,
    committees,
  };
}).then((nodes) => {
  const links = makeLinks(nodes);
  const simulation = d3
    .forceSimulation(nodes)
    .force('center', d3.forceCenter(svgSize / 2, svgSize / 2))
    .force('nodes', d3.forceManyBody().strength(-120))
    .force(
      'links',
      d3
        .forceLink(links)
        .id((d) => d.name)
        .distance((d) => 25 * Math.max(d.source.committees.length, d.target.committees.length)),
    )
    .on('tick', () => {
      linksGroup
        .selectAll('line')
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
      nodesGroup
        .selectAll('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
    });
  updateGraph(nodes, links, simulation);
  setUpCheckboxes(nodes.columns.slice(2), nodes, simulation);
});

function makeLinks(nodes) {
  const links = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const s1 = nodes[i];
      const s2 = nodes[j];
      for (let k = 0; k < s1.committees.length; k += 1) {
        const committee = s1.committees[k];
        if (s2.committees.includes(committee)) {
          links.push({
            source: s1,
            target: s2,
          });
          break;
        }
      }
    }
  }
  return links;
}

function updateGraph(nodesData, linksData, simulation) {
  const patryScale = d3
    .scaleOrdinal()
    .domain(['D', 'R', 'I'])
    .range(['#4b7bec', '#fc5c65', '#a5b1c2']);
  const nodes = nodesGroup.selectAll('circle').data(nodesData, (d) => d.name);
  nodes.exit().remove();
  nodes
    .enter()
    .append('circle')
    .attr('r', 15)
    .attr('fill', (d) => patryScale(d.party))
    .on('mousemove touchmove', showTooltip)
    .on('mouseout touchedn', hideTooltip)
    .call(
      d3
        .drag()
        .on('start', (d) => startDrag(d, simulation))
        .on('drag', (d) => drag(d))
        .on('end', (d) => endDrag(d, simulation)),
    );
  const links = linksGroup.selectAll('line').data(linksData, (d) => d.source.name + d.target.name);
  links.exit().remove();
  links.enter().append('line');
}

function startDrag(d, simulation) {
  simulation.alphaTarget(0.5).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function endDrag(d, simulation) {
  simulation.alphaTarget(0).restart();
  d.fx = null;
  d.fy = null;
}

function showTooltip(d) {
  const tooltip = d3.select('.tooltip');
  tooltip
    .style('opacity', 1)
    .style('left', `${d3.event.x - tooltip.node().offsetWidth / 2}px`)
    .style('top', `${d3.event.y + 10}px`)
    .html(() => {
      const committees = d.committees.map((c) => `<li>${c}</li>`).join('');
      return `
          <p>${d.name} (${d.party})</p>
          <p>Committees</p>
          <ol>${committees}</ol>
        `;
    });
}

function hideTooltip() {
  d3.select('.tooltip').style('opacity', 0);
}

function setUpCheckboxes(committees, nodes, simulation) {
  const boxAreas = d3
    .select('#checkboxes')
    .selectAll('div')
    .data(committees)
    .enter()
    .append('div');
  boxAreas
    .append('label')
    .property('for', (d) => d)
    .text((d) => d);
  boxAreas
    .append('input')
    .property('type', 'checkbox')
    .property('name', 'committee')
    .property('value', (d) => d)
    .property('checked', true)
    .on('click', () => {
      const active = committees.filter((val) =>
        d3.select(`input[value="${val}"]`).property('checked'),
      );
      const newNodes = nodes
        .map((node) => ({
          name: node.name,
          party: node.party,
          committees: node.committees.filter((val) => active.includes(val)),
          x: node.x,
          y: node.y,
          vx: node.vx,
          vy: node.vy,
        }))
        .filter((val) => val.committees.length > 0);
      const newLinks = makeLinks(newNodes);
      updateGraph(newNodes, newLinks, simulation);
      simulation
        .nodes(newNodes)
        .force('links')
        .links(newLinks);
      simulation.alpha(0.5).restart();
    });
}
