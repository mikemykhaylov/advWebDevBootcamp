const sumArguments = (...args) =>
  args.reduce((accum, next) => {
    accum += next;
    return accum;
  });
