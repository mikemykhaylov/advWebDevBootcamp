//  Global variables

const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight - 150;
const svgPadding = 20;
const minYear = 1960;
const maxYear = 2014;
let currentYearGlobal = minYear;
let currentCountryGlobal = '';
let currentDataTypeGlobal = 'co2';
const topoJSONPromise = d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
const continentsPromise = d3.json('../data/continents.json');
const continentColors = new Map([
  ['AF', '#e74c3c'],
  ['AN', '#e67e22'],
  ['AS', '#f1c40f'],
  ['EU', '#4cd137'],
  ['NA', '#00a8ff'],
  ['OC', '#1e3799'],
  ['SA', '#8c7ae6'],
]);

//  D3 Selections
const svg = d3
  .select('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);
const mapSpace = svg
  .append('g')
  .classed('mapSpace', true)
  .attr('transform', `translate(${svgWidth / 4}, ${svgHeight / 2})`);
const pieSpace = svg
  .append('g')
  .classed('pieSpace', true)
  .attr('transform', `translate(${(svgWidth * 3) / 4}, ${svgHeight / 4})`);
const barSpace = svg
  .append('g')
  .classed('barSpace', true)
  .attr('transform', `translate(${(svgWidth * 3) / 4}, ${(svgHeight * 3) / 4})`);
const yearInput = d3
  .select('#year')
  .attr('min', minYear)
  .attr('max', maxYear)
  .attr('value', minYear);
const dataTypeInput = d3.selectAll('input[name="datatype"]');

//  Graphs setup

mapSpace
  .append('text')
  .classed('graphHeader', true)
  .attr('x', 0)
  .attr('y', -svgHeight / 2 + 2.5 * svgPadding)
  .style('text-anchor', 'middle')
  .text('Carbon dioxide emissions in 1960');
pieSpace
  .append('text')
  .classed('graphHeader', true)
  .attr('x', 0)
  .attr('y', -svgHeight / 4 + 2.5 * svgPadding)
  .style('text-anchor', 'middle')
  .text('Total emissions by continent and country in 1960');
barSpace
  .append('text')
  .classed('graphHeader', true)
  .attr('x', 0)
  .attr('y', -svgHeight / 4 + 2.5 * svgPadding)
  .style('text-anchor', 'middle')
  .text('Click on country to see annual trends');

const xAxisSVG = barSpace
  .append('g')
  .classed('axis', true)
  .append('g')
  .classed('xAxis', true);

const yAxisSVG = barSpace
  .select('.axis')
  .append('g')
  .classed('yAxis', true);

//  Tooltip

const tooltip = d3
  .select('body')
  .append('div')
  .classed('tooltip', true);

function showTooltip(data, dataType) {
  let number;
  if (data && data[dataType]) {
    number = data[dataType].toFixed(2).toLocaleString();
  } else {
    number = 'Unknown';
  }
  const tooltipText = `
  <h3>Country: ${data.countryName}</h3>
  <p>Country ID: ${data.countryCode}</p>
  <p>Percent of overall: ${data.percents ? data.percents.toFixed(2) : 0}%</p>
  <p>${
  dataType === 'co2'
    ? `Emissions: ${number} kiloTonnes`
    : `Emissions per capita: ${number} tonnes per capita`
}
  </p>`;
  tooltip
    .style('opacity', 1)
    .style('left', `${d3.event.x - tooltip.node().offsetWidth / 2}px`)
    .style('top', `${d3.event.y + 25}px`)
    .html(tooltipText);
}

function hideTooltip() {
  tooltip.style('opacity', 0);
}

//  Functions

async function parseCSV(path) {
  const parsedCSV = await d3.csv(path, (row) => {
    const parsedRow = d3.autoType(row);
    const rowObj = {};
    rowObj.countryName = parsedRow['Country Name'];
    rowObj.countryCode = parsedRow['Country Code'];
    for (let i = minYear; i < maxYear + 1; i += 1) {
      rowObj[i] = parsedRow[i];
    }
    return rowObj;
  });
  return parsedCSV;
}

function addContinents(sets, continents) {
  const updatedSets = [];
  sets.forEach((set) => {
    const updatedSet = set
      .filter(
        (countryObj) => continents.find(
          (country) => country.Three_Letter_Country_Code === countryObj.countryCode,
        ) !== undefined,
      )
      .map((countryObj) => ({
        ...countryObj,
        continentCode: continents.find(
          (country) => country.Three_Letter_Country_Code === countryObj.countryCode,
        ).Continent_Code,
        countryCode: continents
          .find((country) => country.Three_Letter_Country_Code === countryObj.countryCode)
          .Country_Number.toString(10)
          .padStart(3, '0'),
      }));
    updatedSets.push(updatedSet);
  });
  return updatedSets;
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
        countryObj.countryName = country.countryName;
        countryObj.countryCode = country.countryCode;
        countryObj.continentCode = country.continentCode;
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

function updateMap(year, dataType, dataset, topoJSON) {
  const yearData = dataset.find((val) => val.year === year).countries;
  yearData.forEach((country) => {
    country.percents = (100 * country[dataType])
      / yearData.reduce((accum, next) => {
        accum += next[dataType];
        return accum;
      }, 0);
  });
  const geoData = topojson
    .feature(topoJSON, topoJSON.objects.countries)
    .features.sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((val) => {
      const countryObj = yearData.find((country) => country.countryCode === val.id);
      //  If there is no matching data in dataset, we are just saving the country name
      if (!countryObj) {
        val.properties.countryName = val.properties.name;
        if (val.id) {
          val.properties.countryCode = val.id;
        } else {
          val.properties.countryCode = 'Unknown';
        }
      } else {
        val.properties = countryObj;
      }
      return val;
    });
  const colorScale = d3
    .scaleLinear()
    .domain(
      d3.extent(
        geoData.filter(
          (val) => val.properties !== undefined && val.properties[dataType] !== undefined,
        ),
        (d) => d.properties[dataType],
      ),
    )
    .range(['#FFC312', '#e84118']);
  const projection = d3
    .geoMercator()
    .scale(110)
    .translate([0, 0]);
  const path = d3.geoPath().projection(projection);
  const countries = mapSpace.selectAll('.country').data(geoData, (d) => d.id);
  countries.exit().remove();
  countries
    .enter()
    .append('path')
    .classed('country', true)
    .attr('d', path)
    .merge(countries)
    .on('mousemove touchstart', (d) => showTooltip(d.properties, dataType), {
      passive: true,
    })
    .on('mouseout touchend', hideTooltip, { passive: true })
    .on('click', (d) => {
      d3.selectAll('.selected').classed('selected', false);
      d3.event.target.classList.add('selected');
      currentCountryGlobal = d.properties.countryName;
      updateBar(year, currentCountryGlobal, dataType, dataset);
    })
    .transition()
    .attr('fill', (d) => (d.properties && d.properties[dataType] ? colorScale(d.properties[dataType]) : '#cccccc'));
  mapSpace
    .select('.graphHeader')
    .text(`Carbon dioxide emissions ${dataType === 'co2PerCapita' ? 'per capita' : ''} in ${year}`);
}

function updatePie(year, dataType, dataset) {
  const yearData = dataset.find((val) => val.year === year).countries;
  yearData.forEach((country) => {
    country.percents = (100 * country[dataType])
      / yearData.reduce((accum, next) => {
        accum += next[dataType];
        return accum;
      }, 0);
  });
  const arcs = d3
    .pie()
    .value((d) => d[dataType])
    .sort((a, b) => {
      if (a.continentCode > b.continentCode) {
        return 1;
      }
      if (a.continentCode < b.continentCode) {
        return -1;
      }
      if (a[dataType] > b[dataType]) {
        return 1;
      }
      return -1;
    })(yearData);
  const path = d3
    .arc()
    .innerRadius(0)
    .outerRadius(svgHeight / 4 - 3 * svgPadding);
  const paths = pieSpace.selectAll('path').data(arcs, (d) => d.data.countryName);
  paths.exit().remove();
  const newPaths = paths
    .enter()
    .append('path')
    .classed('arc', true);
  newPaths
    .merge(paths)
    .attr('fill', (d) => continentColors.get(d.data.continentCode))
    .attr('d', path)
    .on('mousemove touchstart', (d) => showTooltip(d.data, dataType), {
      passive: true,
    })
    .on('mouseout touchend', hideTooltip, { passive: true });
  pieSpace.select('.graphHeader').text(`Total emissions by continent and country in ${year}`);
}

function updateBar(activeYear, currentCountry, dataType, dataset) {
  const countryData = [];
  let message = '';
  dataset.forEach((currentYearData) => {
    const yearObj = { year: currentYearData.year };
    const datasetCountry = currentYearData.countries.find(
      (val) => val.countryName === currentCountry,
    );
    if (!datasetCountry) {
      return;
    }
    yearObj[dataType] = datasetCountry[dataType];
    countryData.push(yearObj);
  });
  if (!countryData.length) {
    message = `Sorry, ${currentCountry} doesn't seem to have data on CO<tspan font-size = "16px" baseline-shift = "sub">2</tspan> emissions`;
    barSpace
      .select('.graphHeader')
      .html(
        `Sorry, ${currentCountry} doesn't seem to have data on CO<tspan font-size = "16px" baseline-shift = "sub">2</tspan> emissions`,
      );
    barSpace
      .selectAll('rect')
      .transition()
      .duration(500)
      .ease(d3.easePolyInOut)
      .delay((d, i) => i * 5)
      .attr('y', svgHeight / 4 - 2 * svgPadding)
      .attr('height', 0);
    return;
  }
  if (dataType === 'co2') {
    message = `Yearly emissions of CO<tspan font-size = "16px" baseline-shift = "sub">2</tspan> in ${currentCountry}`;
  } else {
    message = `Yearly emissions of CO<tspan font-size = "16px" baseline-shift = "sub">2</tspan> per capita in ${currentCountry}`;
  }

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(countryData, (d) => d.year))
    .range([-svgWidth / 4 + 2 * svgPadding, svgWidth / 4 - 2 * svgPadding]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(countryData, (d) => d[dataType])])
    .range([svgHeight / 4 - 2 * svgPadding, -svgHeight / 4 + 3 * svgPadding]);
  const heightScale = d3
    .scaleLinear()
    .domain([0, d3.max(countryData, (d) => d[dataType])])
    .range([0, svgHeight / 2 - 5 * svgPadding]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-svgWidth / 2 + 4 * svgPadding)
    .tickSizeOuter(0);
  xAxisSVG.attr('transform', `translate(0, ${svgHeight / 4 - 2 * svgPadding})`).call(xAxis);
  yAxisSVG
    .attr('transform', `translate(${-svgWidth / 4 + 2 * svgPadding}, 0)`)
    .transition()
    .duration(1000)
    .call(yAxis);
  const barPadding = 1;
  const sectionBorders = [-svgWidth / 4 + 2 * svgPadding, svgWidth / 4 - 2 * svgPadding];
  const sectionWidth = sectionBorders[1] - sectionBorders[0];
  const barWidth = (sectionWidth - (countryData.length - 1) * barPadding) / countryData.length;
  const bars = barSpace.selectAll('rect').data(countryData);
  bars.exit().remove();
  bars
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('y', svgHeight / 4 - 2 * svgPadding)
    .merge(bars)
    .classed('currentYear', (d) => d.year === activeYear)
    .attr('x', (d, i) => (barWidth + barPadding) * i - (svgWidth / 4 - 2 * svgPadding))
    .attr('width', (d) => barWidth)
    .transition()
    .duration(500)
    .ease(d3.easePolyInOut)
    .delay((d, i) => i * 5)
    .attr('height', (d) => heightScale(d[dataType]))
    .attr('y', (d) => yScale(d[dataType]));
  barSpace.select('.graphHeader').html(message);
}

function setupGraphs(
  currentYear = currentYearGlobal,
  currentDataType = currentDataTypeGlobal,
  currentCountry = currentCountryGlobal,
  dataSet,
  topoJSON,
) {
  currentYearGlobal = currentYear;
  currentDataTypeGlobal = currentDataType;
  currentCountryGlobal = currentCountry;
  updateMap(currentYear, currentDataType, dataSet, topoJSON);
  updatePie(currentYear, currentDataType, dataSet);
  if (currentCountry !== '') {
    updateBar(currentYear, currentCountry, currentDataType, dataSet);
  }
}

Promise.all([
  parseCSV('../data/co2Emissions.csv'),
  parseCSV('../data/co2EmissionsPerCapita.csv'),
  continentsPromise,
  topoJSONPromise,
]).then((data) => {
  const [co2Emissions, co2EmissionsPerCapita, continents, topoJSON] = data;
  //  Add continent codes and IDs
  const continentSets = addContinents([co2Emissions, co2EmissionsPerCapita], continents);
  //  Sudan country has incorrect ID
  topoJSON.objects.countries.geometries.find((val) => val.id === '729').id = '736';
  const formattedSets = formatDatasets(continentSets, ['co2', 'co2PerCapita']);
  const mergedSet = mergeDatasets(formattedSets);
  setupGraphs(undefined, undefined, undefined, mergedSet, topoJSON);
  yearInput.on('input', () => {
    const year = +d3.event.target.value;
    d3.select('.year')
      .select('.optionstitle')
      .html(`Explore CO<sub>2</sub> emissions by year. Current year: ${year}`);
    setupGraphs(year, undefined, undefined, mergedSet, topoJSON);
  });
  dataTypeInput.on('change', () => {
    const dataType = d3.event.target.value;
    setupGraphs(undefined, dataType, undefined, mergedSet, topoJSON);
  });
});
