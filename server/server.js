const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const admin = require('./routes/api/admin');

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('API RUNNING'));

// Routes
app.use('/api/users', users);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
