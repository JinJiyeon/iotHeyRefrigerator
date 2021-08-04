var test = {};
const jwt = require('jsonwebtoken');

//토큰 관리
// const checkToken = (req, res, next) => {
//   // 1. 토큰 자체가 없는 경우
//   if (req.cookies.accessToken === undefined) throw Error('로그인이 필요합니다')
//   // 2. 토큰을 받았지만
//   if (req.cookies.accessToken === null){
//     if (req.cookies.refreshToken === null){ //2-1. 둘 다 만료
//       throw Error ('토큰 둘 다 만료')
//     } else { // 2-2. accessToken만 만료
//       jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
//         if(err){
//           return res
//             .status(500)
//             .json({error:"token을 decode 하는데 실패했습니다."})
//         }
//       const user_id = decoded.user_id
//       newAccessToken = generateAccessToken(user_id)
//       res.cookie('accessToken', newAccessToken)
//       req.cookies.accessToken = newAccessToken
//       next()
//       })
//     }
//   } else {
//     if (refreshToken === null){ ///3. refreshTocken 만료
//       newRefreshToken = generateRefreshToken(user_id)
//       res.cookie('refreshToken', newRefreshToken )
//       req.cookies.refreshToken = newRefreshToken
//       next()
//     } else{
//       next()
//     }
//   }
// }


const checkToken = (req, res, next) => {
  console.log('체크토큰')
  if (req.cookies.accessToken === undefined){
    console.log('토큰 아예 없음')
    next()
    }
  else if(jwt.verify(req.cookies.accessToke, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
    if(err){
      console.log('만료')
    }}))
    {
      console.log('낫널!')
      next()
    }
  }
  

  module.exports = {
    checkToken : checkToken
  }