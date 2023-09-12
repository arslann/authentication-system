const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const admin = require('./routes/api/admin');

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  next();
});

app.get('/', (req, res) => res.send('API RUNNING'));

// Routes
app.use('/api/users', users);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
