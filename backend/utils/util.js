// //util.js
// 사용법
// 1. 쓰고 싶은 라우터.js 상단 에 const util = require('../utils/util') 입력
// 2. 쓰고 싶은 위치에 util.함수이름 으로 불러올 수 있음

var util = {};
const jwt = require('jsonwebtoken');

// 로그인 확인
// accessToken이 있으면 로그인 되어있는 것
const isNotLogin = (req, res, next) =>{
  if (req.cookies.accessToken){
    return res.json({error:"이미 로그인 되어있습니다."})
  }
  next()
}

// isLogin
const isLogin = (req, res, next) =>{
  const accessToken = req.cookies.accessToken;
  if (accessToken){
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
      if (err) {
        return res.cookie('accessToken', {maxAge : 0}).redirect('/auth/login');
      }
      else {
        req.user_id = decoded.user_id;
        next();
      }
    })
  } else {
    res.redirect('/auth/login/');
  }
}

// isLogin
const isLogin = (req, res, next) =>{
  const accessToken = req.cookies.accessToken;
  if (accessToken){
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
      if (err) {
        return res.cookie('accessToken', {maxAge : 0}).redirect('/auth/login');
      }
      else {
        req.user_id = decoded.user_id;
        next();
      }
    })
  } else {
    res.redirect('/auth/login/');
  }
}



// 사용자 권한 확인
const authCheck = (req, res, next) => {
    let accessToken = req.cookies.accessToken
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
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

// 유저 아이디 확인
const accessUserId = (accessToken) => {
    result = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
      if(err){
        return res
          .status(500)
          .json({error:"token을 decode 하는데 실패했습니다."})
      }
      return decoded.user_id
    })

    return result
}
  

module.exports = {
  isNotLogin: isNotLogin,
  authCheck : authCheck,
  accessUserId : accessUserId,
  isLogin : isLogin
}