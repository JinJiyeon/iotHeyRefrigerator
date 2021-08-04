//routes/user.js
const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const db = require('../lib/db'); // mysql 연결
const cors = require('cors');

dotenv.config();

const util = require('../utils/util')

// 미들웨어
router.use(cors({
  origin: process.env.DJANGO_ORIGIN,
  credentials: true
}))                                 /
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/myingredients/important', util.isLogin, (req, res, next) => {
    const user_id = req.user_id
    db.query(`SELECT * FROM users_and_ingredients WHERE user_id='${user_id}'`, (err, rows, fields) => {
      if (err) next (err)
      res.send(rows)
    })
  });

// 로그인 되어 있을 경우에만
// 얼마 남지 않은 유통기한 + 이미 지난 유통기한
router.get('/myingredients/expired', util.isLogin, (req, res, next) => {
    const user_id = req.user_id
    db.query(`SELECT * FROM users_and_ingredients 
            WHERE user_id='${user_id}' 
            AND DATEDIFF(expiration_date, CURDATE()) < 3`,  
            (err, rows) => {
    if (err) next (err)
    res.send(rows)
    })
})


// R조회 // 수정 필요 : 유저 재료 정보 조회시 get? post?
router.get('/myingredients', (req, res, next) => {
    // user id 수정 필요 (로그인 정보 확인)
    const userid = 'admin'

    db.query('select * from users_and_ingredients where user_id=?', [userid], (err, rows) => {
        if (err) next(err);
        res.send(rows);
    })
})

// C추가
router.post('/myingredients/add', (req, res, next) => {
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
router.post('/myingredients/delete', (req, res, next) => {
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
router.patch('/myingredients/modify', (req, res, next) => {
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

// 재료추가 시 연관 재료 목록 반환
router.get('/myingredients/associated/:searchWord', (req, res, next) => {
    const searchWord = req.params.searchWord;

    db.query(`select ingredient_name
        from ingredients_preprocessing
        where match(original) against('${searchWord}*' in boolean mode)
        group by ingredient_name`, (err, rows) => {
        if (err) next(err);
        res.send(rows);
    })
})


router.get('/mypage', util.isLogin, (req, res, next) => {
  // userid 수정 필요
  const userid = 'admin';
  
  let mydata = {};

  const user_info = new Promise((resolve, reject) => {
      db.query('select * from users where user_id=?', [userid], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
      })
  })

  const user_ingredients = new Promise((resolve, reject) => {
      db.query('select * from users_and_ingredients where user_id=?', [userid], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
      })
  })

  const user_likes = new Promise((resolve, reject) => {
      db.query('select * from likes where user_id=?', [userid], (err, rows) => {
          if (err) reject(err);
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

// 에러마다 다름
  
module.exports = router;
