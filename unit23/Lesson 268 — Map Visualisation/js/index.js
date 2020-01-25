const topoJSONPromise = d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
const countryDataPromise = d3.csv('../data/countryData.csv', (row) => ({
  country: row.country,
  countryCode: row.countryCode,
  population: +row.population,
  populationDensity: +row.population / +row.landArea,
  medianAge: +row.medianAge,
  fertilityRate: +row.fertilityRate,
}));
const svgWidth = 960;
const svgHeight = 600;
const colorRanges = {
  population: ['#ffffff', '#e84118'],
  populationDensity: ['#ffffff', '#273c75'],
  medianAge: ['#ffffff', '#4cd137'],
  fertilityRate: ['#ffffff', '#8c7ae6'],
};
function updateGraph(dataType, worldData) {
  const dataScale = d3
    .scaleLinear()
    .domain(d3.extent(worldData, (d) => d.properties[dataType]))
    .range(colorRanges[dataType]);
  const projection = d3
    .geoMercator()
    .scale(125)
    .translate([svgWidth / 2, svgHeight / 1.4]);
  const path = d3.geoPath().projection(projection);
  const countries = d3
    .select('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)
    .selectAll('.country')
    .data(worldData);
  countries.exit().remove();
  countries
    .enter()
    .append('path')
    .classed('country', true)
    .attr('d', path)
    .merge(countries)
    .transition()
    .attr('fill', (d) =>
      dataScale(d.properties[dataType]) ? dataScale(d.properties[dataType]) : '#cccccc',
    );
}

Promise.all([topoJSONPromise, countryDataPromise]).then(([topoJSON, countriesData]) => {
  const worldData = topojson
    .feature(topoJSON, topoJSON.objects.countries)
    .features.map((polygonObj) => {
      const countryData = countriesData.find((val) => val.countryCode === polygonObj.id);
      polygonObj.properties = countryData;
      return polygonObj;
    })
    .filter((val) => val.properties !== undefined);

  updateGraph('population', worldData);
  d3.select('#selection').on('change', () => {
    updateGraph(d3.event.target.value, worldData);
  });
});
