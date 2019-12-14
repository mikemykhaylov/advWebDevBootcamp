const got = require('got');

async function first() {
  try {
    const { body } = await got('https://swapi.co/api/people/10');
    console.log(JSON.parse(body).name);
  } catch (e) {
    console.log('Something went wrong');
  }
}

async function second() {
  const obiwanPromise = got('https://swapi.co/api/people/10');
  const vaderPromise = got('https://swapi.co/api/people/4');
  const { body: obiwanBody } = await obiwanPromise;
  const { body: vaderBody } = await vaderPromise;
  console.log(JSON.parse(obiwanBody).name);
  console.log(JSON.parse(vaderBody).name);
}

async function third() {
  const obiwanPromise = got('https://swapi.co/api/people/10');
  const vaderPromise = got('https://swapi.co/api/people/4');
  const responses = await Promise.all([obiwanPromise, vaderPromise]);
  console.log(JSON.parse(responses[0].body).name);
  console.log(JSON.parse(responses[1].body).name);
}

third();
