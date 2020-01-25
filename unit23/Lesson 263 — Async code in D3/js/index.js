const countriesPromise = d3.json('../data/countries.json');
const citiesPromise = d3.csv('../data/cities.csv', (row, i, cols) => {
  const formattedRow = d3.autoType(row);
  return {
    cityName: formattedRow.city,
    population: formattedRow.pop,
    countryCode: formattedRow.iso2,
  };
});
Promise.all([countriesPromise, citiesPromise]).then(([countries, cities]) => {
  const data = countries.geonames.map((country) => {
    country.cities = cities.filter((city) => city.countryCode === country.countryCode);
    return country;
  });
  const countrySelection = d3
    .select('body')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div');
  countrySelection.append('h3').text((d) => d.countryName);
  countrySelection.append('ul').html((d) =>
    d.cities.reduce((accum, next) => {
      const percent = (next.population / d.population) * 100;
      if (Number.isFinite(percent)) {
        accum += `<li>${next.cityName} — ${percent.toFixed(2)}% population</li>`;
      } else {
        accum += `<li>${next.cityName} — Zero population</li>`;
      }
      return accum;
    }, ''),
  );
});
