const express = require('express');
const morgan = require('morgan');
const router = express.Router();

router.use(morgan('dev'));

module.exports = router;