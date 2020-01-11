const topoJSONPromise = d3.json('../data/topoJSON.json');
topoJSONPromise
  .then((data) => topojson.feature(data, data.objects.collection))
  .then((data) => {
    const path = d3.geoPath();
    const width = 600;
    const height = 600;

    d3.select('svg')
      .attr('width', width)
      .attr('height', height)
      .selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', (d) => d.properties.color);
  });
