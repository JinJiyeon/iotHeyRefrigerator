const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const db = require('../lib/db');
const cors = require('cors');


// 미들웨어
router.use(morgan('dev'));
router.use(cors({
  origin: global.django_origin,
  credentials: true
}))                                 // Django 서버와 통신하기 위함
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 임시 변수
const recom_user_id = 'expire'

// 라우터
router.get('/', (req, res) => {
  res.send('node > ingredient')
})

// 보유 중인 재료. 추천로직을 위함. node_origin/ingredient/와 기능이 겹치므로 추후에 merge 필요함
router.get('/retaining', (req, res, next) => {
  db.query(`SELECT * FROM users_and_ingredients WHERE user_id='${recom_user_id}'`, (err, rows, fields) => {
    if (err) next (err)
    res.send(rows)
  })
});


router.get('/expire', (req, res, next) => {
  db.query(`SELECT * FROM users_and_ingredients 
            WHERE user_id='${recom_user_id}' AND DATEDIFF(expiration_date, CURDATE()) < 3`, 
            (err, rows, fields) => {
    if (err) next (err)
    res.send(rows)
  })
})


module.exports = router;