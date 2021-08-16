var express = require('express');
var router = express.Router();
const db = require('../lib/db');
const util = require('../utils/util')


router.get('/led', util.isLogin, (req, res, next) =>{
    res.send('여기는 iot/led 입니다')
})

router.get('/buzzer', function(req, res) {
    res.send('여기는 iot/buzzer 입니다.')
})

module.exports = router;