// Constants
const svgSize = 800;
const svgPadding = 50;
const minYear = 1990;
const maxYear = 2012;
const title = d3.select('h1');
const yearInput = d3.select('#year');
const co2Input = d3.select('#maxCO2');
const tooltip = d3
  .select('body')
  .append('div')
  .classed('tooltip', true);
const notCountries = [
  'Arab World',
  'Central African Republic',
  'Central Europe and the Baltics',
  'Early-demographic dividend',
  'East Asia & Pacific (excluding high income)',
  'East Asia & Pacific (IDA & IBRD countries)',
  'East Asia & Pacific',
  'European Union',
  'Fragile and conflict affected situations',
  'Heavily indebted poor countries (HIPC)',
  'High income',
  'IBRD only',
  'IDA & IBRD total',
  'IDA blend',
  'IDA only',
  'IDA total',
  'Late-demographic dividend',
  'Latin America & Caribbean (excluding high income)',
  'Latin America & Caribbean',
  'Latin America & the Caribbean (IDA & IBRD countries)',
  'Least developed countries: UN classification',
  'Low & middle income',
  'Low income',
  'Lower middle income',
  'Middle East & North Africa (excluding high income)',
  'Middle East & North Africa (IDA & IBRD countries)',
  'Middle East & North Africa',
  'Middle income',
  'North America',
  'OECD members',
  'Other small states',
  'Post-demographic dividend',
  'Pre-demographic dividend',
  'Small states',
  'South Asia (IDA & IBRD)',
  'South Asia',
  'Sub-Saharan Africa (excluding high income)',
  'Sub-Saharan Africa (IDA & IBRD countries)',
  'Sub-Saharan Africa',
  'Upper middle income',
  'World',
];

// Getting data

async function parseCSVs(paths) {
  const parsedCSVPromises = [];
  for (let i = 0; i < paths.length; i += 1) {
    const path = paths[i];
    parsedCSVPromises.push(
      d3.csv(path, (row) => {
        const formattedRow = d3.autoType(row);
        if (notCountries.find((val) => val === formattedRow['Country Name'])) {
          return null;
        }
        for (let j = minYear; j < maxYear + 1; j += 1) {
          if (formattedRow[j] == null) {
            return null;
          }
        }
        return formattedRow;
      }),
    );
  }
  const parsedCSVs = await Promise.all(parsedCSVPromises);
  return parsedCSVs;
}

function formatDatasets(sets, dataNames) {
  const formattedDatasets = [];
  sets.forEach((set, i) => {
    const formatedDataset = [];
    for (let j = minYear; j < maxYear + 1; j += 1) {
      const yearObj = {};
      yearObj.year = j;
      yearObj.countries = [];
      set.forEach((country) => {
        const countryObj = {};
        countryObj.countryName = country['Country Name'];
        countryObj[dataNames[i]] = country[j];
        yearObj.countries.push(countryObj);
      });
      yearObj.countries.sort((a, b) => (a.countryName < b.countryName ? -1 : 1));
      formatedDataset.push(yearObj);
    }
    formattedDatasets.push(formatedDataset);
  });
  return formattedDatasets;
}

function mergeDatasets(sets) {
  const mergedSet = sets[0].map((firstSetYear) => {
    const yearObj = {};
    yearObj.year = firstSetYear.year;
    yearObj.countries = [];
    firstSetYear.countries.forEach((firstSetCountry) => {
      const secondSetCountry = sets[1]
        .find((val) => val.year === firstSetYear.year)
        .countries.find((val) => val.countryName === firstSetCountry.countryName);
      if (secondSetCountry === undefined) {
        return;
      }
      const mergedCountry = { ...firstSetCountry, ...secondSetCountry };
      yearObj.countries.push(mergedCountry);
    });
    return yearObj;
  });
  return sets[2] ? [mergedSet, ...sets.slice(2)] : mergedSet;
}

function updateGraph(year, maxCO2, worldData) {
  const yearData = worldData
    .find((val) => val.year === year)
    .countries.filter((val) => val.co2 <= maxCO2);
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(yearData, (d) => d.co2 / 1000))
    .range([svgPadding, svgSize - svgPadding]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(yearData, (d) => d.methane / 1000))
    .range([svgSize - svgPadding, svgPadding]);
  const sizeScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([5, 30]);
  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(yearData, (d) => d.renewables))
    .range(['#130f40', '#4cd137']);
  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(-svgSize + 2 * svgPadding)
    .tickSizeOuter(0);
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-svgSize + 2 * svgPadding)
    .tickSizeOuter(0);
  d3.select('svg')
    .attr('height', svgSize)
    .attr('width', svgSize)
    .selectAll('.axis')
    .remove();
  const circles = d3
    .select('svg')
    .selectAll('circle')
    .data(yearData, (d) => d.countryName);
  circles
    .exit()
    .transition()
    .duration(200)
    .attr('r', 0)
    .remove();
  circles
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.co2 / 1000))
    .attr('cy', (d) => yScale(d.methane / 1000))
    .merge(circles)
    .on('mousemove touchstart', showTooltip)
    .on('mouseout touchend', hideTooltip)
    .transition()
    .duration(500)
    .ease(d3.easePolyInOut)
    .delay((d, i) => i * 5)
    .on('start', (d, i) => {
      if (i === 0) {
        title.text(`Updating to ${year} data...`);
      }
    })
    .on('end', (d, i, nodes) => {
      if (i === nodes.length - 1) {
        title.text(`CO2 vs Methane emissions in ${year}`);
      }
    })
    .attr('cx', (d) => xScale(d.co2 / 1000))
    .attr('cy', (d) => yScale(d.methane / 1000))
    .attr('r', (d) => sizeScale(d.urbanPopulation / d.allPopulation))
    .attr('fill', (d) => colorScale(d.renewables));
  d3.select('svg')
    .append('g')
    .classed('axis', true)
    .attr('transform', `translate(0, ${svgSize - svgPadding})`)
    .call(xAxis);
  d3.select('svg')
    .append('g')
    .classed('axis', true)
    .attr('transform', `translate(${svgPadding}, 0)`)
    .call(yAxis);
  d3.select('svg')
    .append('text')
    .attr('x', svgSize / 2)
    .attr('y', svgSize - svgPadding)
    .attr('dy', '2em')
    .style('text-anchor', 'middle')
    .text('CO2 Emissions (kTons):');
  d3.select('svg')
    .append('text')
    .attr('x', svgPadding)
    .attr('y', svgSize / 2)
    .attr('dy', '-2.2em')
    .attr('transform', `rotate(-90, ${svgPadding}, ${svgSize / 2})`)
    .style('text-anchor', 'middle')
    .text('Methane Emissions (kTons):');
}

function showTooltip(data) {
  tooltip
    .style('opacity', 1)
    .style('left', `${d3.event.x - tooltip.node().offsetWidth / 2}px`)
    .style('top', `${d3.event.y + 25}px`).html(`
      <h3>Country: ${data.countryName}</h3>
      <p>CO2 Emissions: ${data.co2.toFixed(2).toLocaleString()} tons</p>
      <p>Methane Emissions: ${data.methane.toFixed(2).toLocaleString()} tons</p>
      <p>Urban population: ${((data.urbanPopulation / data.allPopulation) * 100).toFixed(2)}%</p>
      <p>Renewable energy: ${data.renewables.toFixed(2)}%</p>
    `);
}

function hideTooltip() {
  tooltip.style('opacity', 0);
}

const pipe = (...fns) => (arg) => fns.reduce((v, fn) => fn(v), arg);

parseCSVs([
  '../data/co2Emissions.csv',
  '../data/methaneEmissions.csv',
  '../data/urbanPopulation.csv',
  '../data/renewableEnergy.csv',
  '../data/allPopulation.csv',
]).then((datasets) => {
  const formattedDatasets = formatDatasets(datasets, [
    'co2',
    'methane',
    'urbanPopulation',
    'renewables',
    'allPopulation',
  ]);
  const mergedDatasets = pipe(
    mergeDatasets,
    mergeDatasets,
    mergeDatasets,
    mergeDatasets,
  )(formattedDatasets);
  updateGraph(maxYear, 11000000, mergedDatasets);
  yearInput
    .attr('min', minYear)
    .attr('max', maxYear)
    .attr('value', maxYear)
    .on('input', () => {
      const year = +yearInput.property('value');
      const maxCO2 = +co2Input.property('value');
      updateGraph(year, maxCO2, mergedDatasets);
    });
  co2Input.on('input', () => {
    const year = +yearInput.property('value');
    const maxCO2 = +co2Input.property('value');
    updateGraph(year, maxCO2, mergedDatasets);
  });
});
