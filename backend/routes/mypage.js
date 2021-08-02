const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../lib/db.js');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 미 로그인시 로그인 화면으로 redirect 필요

// 로그인 시 내 정보
router.post('/', (req, res, next) => {
    // userid 수정 필요
    const userid = 'admin';
    
    let mydata = {};

    const user_info = new Promise((resolve, reject) => {
        db.query('select * from users where user_id=?', [userid], (err, rows) => {
            if (err) reject();
            else resolve(rows);
        })
    })

    const user_ingredients = new Promise((resolve, reject) => {
        db.query('select * from users_and_ingredients where user_id=?', [userid], (err, rows) => {
            if (err) reject();
            else resolve(rows);
        })
    })

    const user_likes = new Promise((resolve, reject) => {
        db.query('select * from likes where user_id=?', [userid], (err, rows) => {
            if (err) reject();
            else resolve(rows);
        })
    })

    user_info
        .then((rows) => {
            mydata.info = rows;
            return user_ingredients;
        })
        .then((rows) => {
            mydata.ingredients = rows;
            return user_likes;
        })
        .then((rows) => {
            mydata.likes = rows;
            res.send(mydata);
        })
        .catch((err) => {
            next(err);
        })

})


module.exports = router;