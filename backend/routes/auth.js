//routes/user.js
const express = require('express');
const router = express.Router();

//jwt
const jwt = require('jsonwebtoken');

//util.js
const util = require('../utils/util')


//암호화
const crypto = require('crypto');

router.use(express.json())
router.use(express.urlencoded({extended:false}));
const db = require('../lib/db'); // mysql 연결





// 로그인,  회원가입(C), 회원 정보(R)
// 업데이트, 탈퇴 -> (x)

// access token을 secret key 기반으로 생성
const generateAccessToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "180 days",
  });
};

// refresh token을 secret key  기반으로 생성
const generateRefreshToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "180 days",
  });
};

// db에서 user_id를 기준으로 중복 확인 (중복 시 에러)
const db_user_info = (user_id) => {
  return new Promise((resolve, reject)=> {
  db.query('SELECT * FROM users WHERE user_id=?', [user_id], (err, rows) => {
    if (rows.length !== 0) reject('중복된 아이디입니다.')
    else resolve(rows[0])
    })
  })
}

// db에서 email 기준으로 중복 확인 (중복 에러)
const db_email_info = (email) => {
  return new Promise((resolve, reject)=> {
  db.query('SELECT * FROM users WHERE email=?', [email], (err, rows) => {
    if (rows.length !== 0) reject('중복된 이메일입니다.')
    else resolve(rows[0])
    })
  })
}

// 회원가입 시 비밀번호 일치 확인
const passwordCheck = (password, password2) => {
  return new Promise((resolve, reject)=> {
    if (password !== password2) { reject('비밀번호를 확인해주세요')}
    else resolve('비밀번호가 일치합니다')
  })
}


// 사용자 존재 확인
const userCheck = (req, res, next) => {
  let accessToken = req.cookies.accessToken
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
    if(err){
      return res
        .status(500)
        .json({error:"token을 decode 하는데 실패했습니다."})
    }
    const user_id = decoded.user_id
    db.query('SELECT * FROM users WHERE user_id=?', [user_id], (err, rows) => {
      if (err) {
        return res.json({error: "DB에서 찾던 중 오류가 발생했습니다."})
      }
      if (rows.length===0){
        return res
          .status(404)
          .json({isAuth: false, error:"token에 해당하는 유저가 없습니다."})
      }
      if (rows) {
        req.accessToken = accessToken, // 다음에 사용할 수 있도록 req에 전달
        req.user_id = user_id
      }
      next()
    })
  })
}


// 1. 로그인
// ~user/login
router.post('/login', util.isNotLogin, (req, res, next)=>{
  const user_id = req.body.user_id
  const password = req.body.password
  // db에서 user_id를 기준으로 있는 id인지 확인 (있어야 통과)
  const login_info = new Promise((resolve, reject)=> {
    db.query('SELECT * FROM users WHERE user_id=?', [user_id], (err, rows) => {
      if (err) reject(err)
      if (rows.length === 0) reject('아이디가 없습니다.')
      else resolve(rows[0])
    })
  })
  // db 비밀번호와 입력 비밀번호 대조
  const check_password = function(password, db_password){
    return new Promise(function(resolve, reject){
      if (password === db_password){
        resolve('비밀번호가 같습니다')
      }else{
        reject('비밀번호를 확인해주세요')
      }
    })
  }

  login_info
    .then(function(result){ // 아이디가 db에 있으면
      const db_password = result.password
      return check_password(password, db_password) // 비밀번호 대조
    })
    .then(function(){ // 비밀번호가 같으면
      accessToken = generateAccessToken(user_id) // 토큰 발급
      refreshToken = generateRefreshToken(user_id)
      res.cookie('accessToken', accessToken ) // 쿠키에 토큰 저장
      res.cookie('refreshToken', refreshToken)
      res.cookie('user_id', user_id) // 로그인 시 쿠키에 아이디 저장
      res.redirect('/') 
      
    })
    .catch((err)=>{
      console.log(err)
      res.redirect('login') 
    })
})




// 2. 회원가입(C)
// ~user/signup
router.post('/signup', util.isNotLogin, (req, res, next)=> {
  const user_id = req.body.user_id
  const password = req.body.password
  const password2 = req.body.password2
  const email = req.body.email
  //암호화 - db 이슈 해결되면 추가됨 
  // let salt = Math.round((new Date().valueOf()*Math.random())) +""
  // var hashpassword = crypto.createHash("sha512").update(password).digest("hex")

  // 회원가입 공백 체크
  const isEmpty = function(user_id, password, password2, email){
    return new Promise((resolve, reject) => {
      if (user_id === "" || password ==="" || password2 === "", email === ""){
        reject('공란을 확인해주세요')
      } else {
        resolve()
      }
    })
  }
  // 회원 정보 db에 저장(회원가입)
  const createUser = function(user_id, password, email){
    return new Promise((resolve, reject)=>{
      db.query('INSERT INTO users (user_id, password, email) VALUES(?,?,?)', [user_id, password, email], function(err, rows){
        if (err){ reject(err)}
        else resolve (rows[0])
      })
    })
  }
  isEmpty(user_id, password, password2, email)
    .then(function(){
      return passwordCheck(password, password2) // 비밀번호 일치 체크
    })
    .then(function(){
      return db_user_info(user_id) // user_id가 기존 db에 존재하나 체크
    })
    .then(function(){
      return db_email_info(email) //email이 기존 db에 존재하나 체크
    })
    .then(function(){
      return createUser(user_id, password, email) // 회원가입(저장)
    })
    .then(function(){ // 자동 로그인
      accessToken = generateAccessToken(user_id)
      refreshToken = generateRefreshToken(user_id)
      res.cookie('accessToken', accessToken )
      res.cookie('refreshToken', refreshToken)
      res.cookie('user_id', user_id) // 로그인 시 쿠키에 아이디 저장
      console.log(res)
      // res.redirect('/')
      res.send()
      
    })
    .catch((err)=>{
      console.log(err)
      res.redirect('signup')
    })
    
})


// 회원가입
/*
 2021 / 08 / 06 / 박민상
 미 로그인시에만 회원가입 페이지를 전송하도록 수정
 */
router.get('/signup', util.isNotLogin, (req, res) => {
  res.send(`
    <form action="/auth/signup" method="post">
        email : <input type="text" name="email" /> <br />
        name : <input type="text" name="user_id" /> <br />
        password : <input type="text" name="password" /> <br />
        password2 : <input type="text" name="password2" /> <br />
        <input type="submit">
    </form>
  `)
})


// 로그인
/*
 2021 / 08 / 06 / 박민상
 미 로그인시에만 로그인 페이지를 전송하도록 수정
 */
router.get('/login', util.isNotLogin, (req, res) => {
  res.send(`
    <form action="/auth/login" method="post">
        name : <input type="text" name="user_id" /> <br />
        password : <input type="text" name="password" /> <br />
        <input type="submit">
    </form>
  `)
})


// // test
// router.get('/test', util.checkToken, (req, res) =>{
//   console.log('테스트')
//   res.send('테스트')
// })

//err middleware
router.use((err, req, res, next) => {
  console.log('auth.js 에러 미들웨어');
  console.log(err);
  // res.send('err')
  res.redirect('/');
})


module.exports = router;
