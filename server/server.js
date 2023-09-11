const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('API RUNNING'));

// Routes
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
