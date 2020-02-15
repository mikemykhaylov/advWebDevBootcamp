const bodyparser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const api = require('./routes/api');
const routes = require('./routes/index');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/json_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = Promise;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(methodOverride('_method'));
app.use(express.static(`${__dirname}/views`));
app.use(express.static(`${__dirname}/public`));
app.use(routes);
app.use(api);

app.listen(3000, () => {
  console.log('Running on 3000');
});
