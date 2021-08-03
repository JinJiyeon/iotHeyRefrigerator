//routes/user.js
const express = require('express');
const router = express.Router();

//jwt
const jwt = require('jsonwebtoken');
let secretObj = require("../utils/jwt");

//암호화
const crypto = require('crypto');

router.use(express.json())
router.use(express.urlencoded({extended:false}));
const db = require('../lib/db'); // mysql 연결




// 로그인, 로그아웃(쿠키 삭제), 회원가입(C), 회원 정보(R), 정보 수정(U), 탈퇴 (D)

// access token을 secret key 기반으로 생성
 const generateAccessToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
  });
};

// refersh token을 secret key  기반으로 생성
const generateRefreshToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "180 days",
  });
};

// db에서 user_id를 기준으로 중복 확인
const db_user_info = (user_id) => {
  return new Promise((resolve, reject)=> {
  db.query('SELECT * FROM users WHERE user_id=?', [user_id], (err, rows) => {
    console.log('아이디')
    if (rows.length !== 0) reject('중복된 아이디입니다.')
    else resolve(rows[0])
    })
  })
}

// db에서 email 기준으로 중복 확인
const db_email_info = (email) => {
  return new Promise((resolve, reject)=> {
  db.query('SELECT * FROM users WHERE email=?', [email], (err, rows) => {
    if (rows.length !== 0) reject('중복된 이메일입니다.')
    else resolve(rows[0])
    })
  })
}


// 로그인 확인
// 1. accessToken이 있으면 로그인 되어있는 것
const isLogin = (req, res, next) =>{
  console.log(req.cookies.accessToken)
  if (req.cookies.accessToken){
    return res.json({error:"이미 로그인 되어있습니다."})
  }
  next()
}

//토큰 관리
const checkToken = (req, res, next) => {
  // 1. 토큰 자체가 없는 경우
  if (req.cookies.accessToken === undefined) throw Error('로그인이 필요합니다')
  // 2. 토큰을 받았지만
  if (req.cookies.accessToken === null){
    if (req.cookies.refreshToken === null){ //2-1. 둘 다 만료
      throw Error ('로그인이 필요합니다')
    } else { // 2-2. accessToken만 만료
      jwt.verify(aceessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err){
          return res
            .status(500)
            .json({error:"token을 decode 하는데 실패했습니다."})
        }
      const user_id = decoded.user_id
      newAccessToken = generateAccessToken(user_id)
      res.cookie('accessToken', newAccessToken)
      req.cookies.aceessToken = newAccessToken
      next()
      })
    }
  } else {
    if (refreshToken === null){ ///3. refreshTocken 만료
      newRefreshToken = generateRefreshToken(user_id)
      res.cookie('refreshToken', newRefreshToken )
      req.cookies.refreshToken = newRefreshToken
      next()
    } else{
      next()
    }
  }
}

// 사용자 존재 확인
const userCheck = (req, res, next) => {
  let aceessToken = req.cookies.accessToken
  jwt.verify(aceessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
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

// 사용자 권한 확인
const authCheck = (req, res, next) => {
  let accessToken = req.cookies.accessToken
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
    console.log(decoded)
    if(err){
      return res
        .status(500)
        .json({error:"token을 decode 하는데 실패했습니다."})
    }
    const accessUserId = decoded.user_id // 로그인 토큰 유저
    var user_id = req.params.userId // 파라메터 유저

    if (accessUserId !== user_id){
      console.log(accessUserId, user_id)
      return res.json({error: "접근 권한이 없습니다."})
    }
    req.accessToken = accessToken,
    req.user_id = user_id
    next()
  })
}

 
// 1. 로그인
router.post('/login', isLogin, (req, res)=>{
  const user_id = req.body.user_id
  const password = req.body.password
  
  // db에서 user_id를 기준으로 있는 id인지 확인
  const login_info = new Promise((resolve, reject)=> {
    console.log(user_id, password)
    db.query('SELECT * FROM users WHERE user_id=?', [user_id], (err, rows) => {
      console.log('0', rows)
      if (err) reject(err)
      if (rows.length === 0) reject('아이디가 없습니다.')
      else resolve(rows[0])
    })
  })
  
  // 비밀번호 대조
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
      return check_password(password, db_password)
    })
    .then(function(result){
      accessToken = generateAccessToken(user_id)
      refreshToken = generateRefreshToken(user_id)
      res.cookie('accessToken', accessToken )
      res.cookie('refreshToken', refreshToken)
      res.json({
        accessToken : accessToken,
        refreshToken : refreshToken
      })
    })
    .catch(error => console.log('6', error))
})



// R (users) 
// ~ /users
router.get('/', (req, res)=>{
  var sql = `SELECT * FROM users`
  db.query(sql, function(err, results){
    if(err){
      res.send(err)
    }else{
      res.send(results)
    }
  })
})


router.get('/signup', isLogin, (req,res) => {
  res.send(`
    <form action="/user/signup" method="post">
        email : <input type="text" name="email" /> <br />
        name : <input type="text" name="user_id" /> <br />
        password : <input type="text" name="password" /> <br />
        password2 : <input type="text" name="password2" /> <br />
        <input type="submit">
    </form>
  `)
})




// 비밀번호 일치하는지 확인
const passwordCheck = (password, password2) => {
  return new Promise((resolve, reject)=> {
  if (password !== password2) { reject('비밀번호를 확인해주세요')}
  else resolve('비밀번호가 일치합니다')
})
}
// 2. 회원가입(C)
router.post('/signup', isLogin, (req, res)=> {
  var user_id = req.body.user_id
  var password = req.body.password
  var password2 = req.body.password2
  var email = req.body.email

  //암호화
  // let salt = Math.round((new Date().valueOf()*Math.random())) +""
  // var hashpassword = crypto.createHash("sha512").update(password).digest("hex")


  // 회원가입
  const createUser = function(user_id, password, email){
    db.query('INSERT INTO users (user_id, password, email) VALUES(?,?,?)', [user_id, password, email], function(err, rows){
      if (err) { reject(err)}
      else {resolve(rows[0])}
    })
  }

  passwordCheck(password, password2)
    .then(function(result){
      return db_user_info(user_id)
    })
    .then(function(result){
      return db_email_info(email)
    })
    .then(function(result){
      return createUser
    })
    .then(function(result){ // 자동 로그인
      accessToken = generateAccessToken(user_id)
      refreshToken = generateRefreshToken(user_id)
      res.cookie('accessToken', accessToken )
      res.cookie('refreshToken', refreshToken)
      return res.json({success: user_id})
    })
    .catch(function(error){
      res.json({error: error})
    })
    
})


/// 3. 회원 정보(R)
// ~ /user/detail/:userId
router.get('/detail/:userId', authCheck, (req, res)=> {
  var sql = `select * from users where user_id=${req.user_id}`
  db.query(sql, function(err, results){
    if(err){
      console.log(err)
    }else if(results.length === 0){ 
      throw "results is empty"
    }else{
      res.send(results)
    }
  })
})

//4 U (수정)
// ~ user/edit/:userId
router.get('/edit/:userId', authCheck, (req, res)=>{
  res.send( `<form action="/user/edit" method="post">
  email : <input type="text" name="email" /> <br />
  name : <input type="text" name="user_id" /> <br />
  password : <input type="text" name="password" /> <br />
  password2 : <input type="text" name="password2" /> <br />
  <input type="submit">
</form>
`)
})


//
router.post('/edit', authCheck, (req, res)=> {
  const user_id = req.body.user_id
  const password = req.body.password
  const password2 = req.body.password2
  const email = req.body.email
  
  db_user_info(user_id)
    .then(function(result){
      return db_email_info(email)
    })
    .then(function(result){
      return passwordCheck(password, password2)
    })
    .then(
      db.query('UPDATE users SET user_id=?, email=?, password=? WHERE user_id=?', [user_id, email, password, user_id], (err, rows) => {
        if (err) console.log(err)
        else{
          res.json(rows[0])
        }
      }
    ))
    .catch(err=> res.json({error: err}))
  
  
  // db.query('UPDATE users SET user_id=?, email=?, password=? WHERE user_id=?', [user_id, email, password, user_id], (err, rows) => {
  //   if (err) console.log(err)
  //   res.json(rows[0])
  // })
})




// D (탈퇴)
router.delete('/:username', function(req, res){
  User.deleteOne({username:req.params.username}, function(err){
    if(err) return res.json(err)
    res.send('200 delete success')
  })
})



// 로그인
router.get('/login', (req, res)=> {
  res.send(`
    <form action="/user/login" method="post">
        name : <input type="text" name="user_id" /> <br />
        password : <input type="text" name="password" /> <br />
        <input type="submit">
    </form>
  `)
})

  
module.exports = router;
