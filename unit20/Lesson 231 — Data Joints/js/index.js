const quotes = [
  {
    quote: 'I see dead people.',
    movie: 'The Sixth Sense',
    year: 1999,
    rating: 'PG-13',
  },
  {
    quote: 'May the force be with you.',
    movie: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
    rating: 'PG',
  },
  {
    quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: 'Dirty Harry',
    year: 1971,
    rating: 'R',
  },
  {
    quote: "You had me at 'hello.'",
    movie: 'Jerry Maguire',
    year: 1996,
    rating: 'R',
  },
  {
    quote: 'Just keep swimming. Just keep swimming. Swimming, swimming, swiming.',
    movie: 'Finding Nemo',
    year: 2003,
    rating: 'G',
  },
];

const newQuotes = [
  {
    quote: 'Houston, we have a problem.',
    movie: 'Apollo 13',
    year: 1995,
    rating: 'PG-13',
  },
  {
    quote: "Gentlemen, you can't fight in here! This is the war room!",
    movie: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
    rating: 'PG',
  },
];

const colors = {
  G: '3cff00',
  PG: 'f9ff00',
  'PG-13': 'ff9000',
  R: 'ff0000',
};

d3.select('#quotes')
  .style('list-style', 'none')
  .selectAll('li')
  .data(quotes, (d) => d.quote)
  .enter()
  .append('li')
  .text((data) => `${data.quote} — ${data.movie} (${data.year})`)
  .style('margin', '20px')
  .style('padding', '20px')
  .style('font-size', (data) => (data.quote.length < 25 ? '2em' : '1em'))
  .style('background-color', (d) => `#${colors[d.rating]}`)
  .style('border-radius', '8px');

d3.select('#removeLast').on('click', () => {
  quotes.pop();
  d3.selectAll('li')
    .data(quotes, (d) => d.quote)
    .exit()
    .remove();
});

d3.select('#removeRRated').on('click', () => {
  const nonRQuotes = quotes.filter((val) => val.rating !== 'R');
  d3.selectAll('li')
    .data(nonRQuotes, (d) => d.quote)
    .exit()
    .remove();
  d3.select('#removeRRated').remove();
});

d3.select('#addQuotes').on('click', () => {
  const addedQuotes = [...quotes, ...newQuotes];
  const listItems = d3
    .select('#quotes')
    .selectAll('li')
    .data(addedQuotes, (d) => d.quote);
  console.log(listItems);
  listItems
    .enter()
    .append('li')
    .text((data) => `${data.quote} — ${data.movie} (${data.year})`)
    .style('margin', '20px')
    .style('padding', '20px')
    .style('font-size', (data) => (data.quote.length < 25 ? '2em' : '1em'))
    .style('background-color', (d) => `#${colors[d.rating]}`)
    .style('border-radius', '8px')
    .merge(listItems)
    .style('color', '#5599ff');
  d3.select('#addQuotes').remove();
});
