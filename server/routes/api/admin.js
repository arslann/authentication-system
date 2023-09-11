const express = require('express');
const auth = require('../../middleware/auth');
const { adminTest } = require('../../controller/admin');
const router = express.Router();

router.get('/', [auth], adminTest);

module.exports = router;
