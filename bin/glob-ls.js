const glob = require('glob');

const patterns = process.argv.slice(2);
patterns.forEach((pattern) => {
  glob(pattern, {}, (err, files) => {
    if (err) throw err;
    for (let i = 0; i < files.length; i += 1) {
      const newElement = files[i].replace(/ /g, '\\ ');
      files[i] = newElement;
    }
    process.stdout.write(`${files.join('\n')}\n`);
  });
});
