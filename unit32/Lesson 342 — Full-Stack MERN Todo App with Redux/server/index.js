const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/json_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = Promise;
mongoose.set('debug', true)

app.use(bodyparser.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(cors());
app.use(api);

app.listen(3000, () => {
  console.log('Running on 3000');
});
