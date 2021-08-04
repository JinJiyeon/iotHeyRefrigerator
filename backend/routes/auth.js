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

// 로그인,  회원가입(C), 회원 정보(R), 정보 수정(U), 탈퇴 (D)

// access token을 secret key 기반으로 생성
const generateAccessToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5 seconds",
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

//토큰 관리
const checkToken = (req, res, next) => {
  // 1. 토큰 자체가 없는 경우
  if (req.cookies.accessToken === undefined) throw Error('로그인이 필요합니다')
  // 2. 토큰을 받았지만
  if (req.cookies.accessToken === null){
    if (req.cookies.refreshToken === null){ //2-1. 둘 다 만료
      throw Error ('로그인이 필요합니다')
    } else { // 2-2. accessToken만 만료
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err){
          return res
            .status(500)
            .json({error:"token을 decode 하는데 실패했습니다."})
        }
      const user_id = decoded.user_id
      newAccessToken = generateAccessToken(user_id)
      res.cookie('accessToken', newAccessToken)
      req.cookies.accessToken = newAccessToken
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
router.post('/login', (req, res)=>{
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
    .then(function(result){ // 비밀번호가 같으면
      accessToken = generateAccessToken(user_id) // 토큰 발급
      refreshToken = generateRefreshToken(user_id)
      res.cookie('accessToken', accessToken ) // 쿠키에 토큰 저장
      res.cookie('refreshToken', refreshToken)
      res.json({ // 정보 전달
        accessToken : accessToken,
        refreshToken : refreshToken
      })
    })
    .catch(error => console.log(error))
})



// 전체 유저 확인 (추후 삭제 예정)
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


router.get('/signup', util.isLogin, (req,res) => {
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


// 2. 회원가입(C)
// ~user/signup
router.post('/signup', util.isLogin, (req, res)=> {
  // form 으로 받아온 정보 변수에 저장
  var user_id = req.body.user_id
  var password = req.body.password
  var password2 = req.body.password2
  var email = req.body.email

  //암호화 - db 이슈 해결되면 추가됨 
  // let salt = Math.round((new Date().valueOf()*Math.random())) +""
  // var hashpassword = crypto.createHash("sha512").update(password).digest("hex")


  // 회원 정보 db에 저장(회원가입)
  const createUser = function(user_id, password, email){
    db.query('INSERT INTO users (user_id, password, email) VALUES(?,?,?)', [user_id, password, email], function(err, rows){
      if (err) { reject(err)}
      else {resolve(rows[0])}
    })
  }

  passwordCheck(password, password2) // 비밀번호 일치 체크
    .then(function(result){
      return db_user_info(user_id) // user_id가 기존 db에 존재하나 체크
    })
    .then(function(result){
      return db_email_info(email) //email이 기존 db에 존재하나 체크
    })
    .then(function(result){
      return createUser // 회원가입(저장)
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
// router.get('/detail/:userId', util.authCheck, (req, res)=> {
//   var sql = `select * from users where user_id=${req.user_id}`
//   db.query(sql, function(err, results){
//     if(err){
//       res.send(err)
//     }else if(results.length === 0){ 
//       throw "results is empty"
//     }else{
//       res.send(results)
//     }
//   })
// })



//4 U (수정)
// ~ user/edit/:userId
router.get('/edit/:userId', util.authCheck, (req, res)=>{
  res.send( `<form action="/auth/edit" method="post">
  email : <input type="text" name="email" /> <br />
  name : <input type="text" name="user_id" /> <br />
  password : <input type="text" name="password" /> <br />
  password2 : <input type="text" name="password2" /> <br />
  <input type="submit">
</form>
`)
})


// 업데이트
router.post('/edit', (req, res)=> {
  const user_id = req.body.user_id
  const password = req.body.password
  const password2 = req.body.password2
  const email = req.body.email
  const accessToken = req.cookies.accessToken
  const accessUserId = util.accessUserId(accessToken) // 토큰에 담긴 유저


  const db_info = (accessUserId) => {
    return new Promise((resolve, reject)=>{
      db.query('SELECT * FROM users WHERE user_id=?', [accessUserId], (err, rows) => {
        if(err) reject (err)
        else resolve(rows[0])
      })
    })
  }

  db_info(accessUserId) // access Token을 기반으로 해서 db에서 유저 정보 불러오기
    .then(res.clearCookie('accessToken'))
    // .then((result) => {
    //   if (result.user_id === user_id) {
    //     if (result.email === email) {
    //       // 둘 다 같으면db에 저장
    //     } else {
    //       //user_id만 같으면 email 중복 확인 후 다를 경우 저장
    //     }
    //   } else if (result.email === email) { // email만 같은 경우
    //     // user 중복 확인 후 저장
    //   } else{ // 둘 다 다를경우
    //     // 중복 확인 후 저장
    //     }
    //   }
    // )
    // .then .catch로 전달 

})


  // db_user_info(user_id)
  //   .then(function(result){
  //     return db_email_info(email)
  //   })
  //   .then(function(result){
  //     return passwordCheck(password, password2)
  //   })
  //   .then(
  //     db.query('UPDATE users SET user_id=?, email=?, password=? WHERE user_id=?', [user_id, email, password, user_id], (err, rows) => {
  //       if (err) console.log(err)
  //       else{
  //         res.json(rows[0])
  //       }
  //     }
  //   ))
  //   .catch(err=> res.json({error: err}))
  
  
  // db.query('UPDATE users SET user_id=?, email=?, password=? WHERE user_id=?', [user_id, email, password, user_id], (err, rows) => {
  //   if (err) console.log(err)
  //   res.json(rows[0])
  // })
// })




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
    <form action="/auth/login" method="post">
        name : <input type="text" name="user_id" /> <br />
        password : <input type="text" name="password" /> <br />
        <input type="submit">
    </form>
  `)
})

  
module.exports = router;
