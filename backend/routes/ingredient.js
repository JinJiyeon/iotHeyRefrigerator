const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../lib/db.js');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// R조회 // 수정 필요 : 유저 재료 정보 조회시 get? post?
router.post('/user/myingredients', (req, res, next) => {
    // user id 수정 필요 (로그인 정보 확인)
    const userid = 'admin'

    db.query('select * from users_and_ingredients where user_id=?', [userid], (err, rows) => {
        if (err) next(err);
        res.send(rows);
    })
})

// C추가
router.post('/user/add', (req, res, next) => {
    // user id 수정 필요 (로그인 정보 확인)
    const userid = 'admin';
    const ingredient_name = req.body.ingredient_name;
    const expiration_date = req.body.expiration_date;

    db.query('insert into users_and_ingredients values(?,?,?)',[userid, ingredient_name, expiration_date], (err, rows) => {
        if (err) next(err);
        // 수정 필요 : 재료 추가 완료 후 보여야 될 페이지 send
        res.send(rows);
    })
})

// D삭제
router.post('/user/delete', (req, res, next) => {
    // userid 수정 필요 (로그인 정보 확인)
    const userid = 'admin';
    const ingredient_name = req.body.ingredient_name;
    const expiration_date = req.body.expiration_date;

    db.query('delete from users_and_ingredients where user_id=? and ingredient_name=? and expiration_date=?', [userid, ingredient_name, expiration_date], (err, rows) => {
        if (err) next(err);
        // 수정 필요 : 삭제 후 보여야 할 페이지 send
        res.send(rows);
    })
})

// U수정 (날짜 수정)
router.patch('/user/modify', (req, res, next) => {
    // userid 수정 필요 (로그인 정보 확인)
    const userid = 'admin';
    const ingredient_name = req.body.ingredient_name;
    const expiration_date = req.body.expiration_date;
    const update_date = req.body.update_date;

    db.query(`update users_and_ingredients
            set expiration_date = ?
            where user_id=? and ingredient_name=? and expiration_date=?`, [update_date, userid, ingredient_name, expiration_date], (err, rows) => {
        if (err) next(err);
        // 수정 필요 : 수정 후 보여야 할 페이지 send
        res.send(rows);
    })
})


module.exports = router;