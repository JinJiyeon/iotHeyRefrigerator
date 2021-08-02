// //routes/user.js
// const express = require('express');
// const router = express.Router();

// //jwt
// const jwt = require('jsonwebtoken');
// let secretObj = require("../utils/jwt");

// router.use(express.json())
// router.use(express.urlencoded({extended:false}));
// const db = require('../lib/db'); // mysql 연결


// // R (users) 
// // ~ /users
// router.get('/', (req, res)=>{
//   var sql = `SELECT * FROM users`
//   db.query(sql, function(err, results){
//     if(err){
//       res.send(err)
//     }else{
//       res.send(results)
//     }
//   })
// })


// router.get('/signup', (req,res) => {
//   res.send(`
//     <form action="/user/signup" method="post">
//         email : <input type="text" name="email" /> <br />
//         name : <input type="text" name="user_id" /> <br />
//         password : <input type="text" name="password" /> <br />
//         password2 : <input type="text" name="password2" /> <br />
//         <input type="submit">
//     </form>
//   `)
// })



// // C (signup)
// // 회원가입 
// router.post('/signup', (req, res)=> {
//   var user_id = req.body.user_id
//   var password = req.body.password
//   var password2 = req.body.password2
//   var email = req.body.email


//   if (password === password2){
//     db.query('SELECT * FROM users WHERE user_id=?', [user_id], function(err, reduplication){
//       console.log(reduplication)
//       console.log(user_id)
//       if (reduplication.length !== 0){
//         res.send('아이디 중복')
//       } else{
//        db.query('SELECT * FROM users WHERE email=?', [email], function(err, reduplication){
//           console.log(reduplication)
//          if (reduplication.length !== 0){
//            res.send('이메일 중복')
//          } else {
//            db.query('INSERT INTO users (user_id, email, password) VALUES (?,?,?)', [user_id, email, password], function(req, res){
//             console.log('회원가입 성공?')
//             res.send('회원가입')
//             // res.writeHead(200)
//            })
//          }
//        })
//       }     
//      })
//     } else {
//     res.send('비밀번호 확인')
//     }
// })


// // R (show) - userid 이용
// // ~ /users/:userId/detail
// router.get('/:userId/detail', (req, res)=> {
//   var userId=req.params.userId
//   // console.log(userId)
//   var sql = `select * from users where user_id=${userId}`
//   db.query(sql, function(err, results){
//     if(err){
//       console.log(err)
//     }else if(results.length === 0){ 
//       throw "results is empty"
//     }else{
//       res.send(results)
//     }
//   })
// })

// // U (수정)
// // ~ users/:userId/edit
// router.get('/:username/edit', (req, res)=> {
//   User.findOne({username:req.params.username}, function(err, user){
//     if(err) return res.json(err)
//     res.send({user:user})
//   })
// })

// // ~ users/:username
// router.put('/:username', (req, res)=> {
//   User.findOne({username:req.params.username}) 
//     .select('password')
//     .exec(function(err, user){
//       if(err) return res.json(err);
      
//       //update user obj
//       user.originalPassword = user.password;
//       user.password = req.body.newPassword? req.bodynewPassword : user.password; //password 업데이트 or 업데이트 x 삼항연산자
//       for(var p in req.body){ //body가 실제 form에서 입력된 값이므로 db의 user에 덮어쓰기
//         user[p] = req.body[p];
//       }

//       //save update
//       user.save(function(err, user){
//         if(err) return res.json(err);
//         res.send({user:user})
//       })
//     })
// })




// // D (탈퇴)
// router.delete('/:username', function(req, res){
//   User.deleteOne({username:req.params.username}, function(err){
//     if(err) return res.json(err)
//     res.send('200 delete success')
//   })
// })



// //로그인
// router.get('/login', (req, res)=> {
//   res.send(`
//     <form action="/user/login" method="post">
//         name : <input type="text" name="user_id" /> <br />
//         password : <input type="text" name="password" /> <br />
//         <input type="submit">
//     </form>
//   `)
// })


// // db에서 user_id를 기준으로 올바른 정보인지 대조
// const login = (user_id, password) => {
//   db.query('SELECT * FROM users WHERE user_id=?', [user_id], function(err, rows){
//     console.log(rows)
//   })
// }

// // access token을 secret key 기반으로 생성
// const generateAccessToken = (user_id) => {
//   return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "50m",
//   });
// };

// // refersh token을 secret key  기반으로 생성
// const generateRefreshToken = (user_id) => {
//   return jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "2 days",
//   });
// };

// router.post('/login', (req, res) => {
//   let user_id = req.body.user_id
//   let password = req.body.password
//   let user = login(user_id, password)
//   console.log('받은 user', user)
//   // 로그인 실패시 
//   if(user===""){return res.sendStatus(500)}
//   //성공시
//   let accessToken = generateAccessToken(user);
//   let refreshToken = generateRefreshToken(user);
//   res.json({accessToken, refreshToken})
// })

// //로그아웃
// router.post('/logout', (req, res)=> {
//   //jwt delete
// })




// // router.get('/login', (req, res)=> {
// //   is_login = util.isLogIN(req)
// //   if(is_login){
// //     // id, pw가 맞다면 access token, refresh token 발급
// //     const accessToken = jwt.sign(user);
// //     const refreshToken = jwt.refresh();
    
// //     // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장
// //     redisClient.set(user.id, refreshToken);

// //     res.status(200).send({ // client에게 토큰 모두를 반환
// //       ok: true,
// //       data: {
// //         accessToken,
// //         refreshToken,
// //       },
// //     });
// //   } else {
// //     res.status(401).send({
// //       ok: false,
// //       message: 'Login Fail',
// //     });
// //   }
// // })
  

// // // ~ users/:username
// // router.put('/:username', (req, res)=> {
// //   User.findOne({username:req.params.username}) // user.password를 조건에 맞게 바꿔야 하므로 findOndAndUpdate는 쓰지 않는다.
// //     .select('password')//db에서 항목 선택 여부 정하는 것. 이렇게 하면 password를 읽어오게 된다. DB 저장시 PASSWORD는 보통 select를 false로 지정하기 때문. 아닐 경우 없어도 됨.
// //     .exec(function(err, user){
// //       if(err) return res.json(err);
      
// //       //update user obj
// //       user.originalPassword = user.password;
// //       user.password = req.body.newPassword? req.bodynewPassword : user.password; //password 업데이트 or 업데이트 x 삼항연산자
// //       for(var p in req.body){ //body가 실제 form에서 입력된 값이므로 db의 user에 덮어쓰기
// //         user[p] = req.body[p];
// //       }

// //       //save update
// //       user.save(function(err, user){
// //         if(err) return res.json(err);
// //         res.send({user:user})
// //       })
// //     })
// // })




// // // D (탈퇴)
// // router.delete('/:username', function(req, res){
// //   User.deleteOne({username:req.params.username}, function(err){
// //     if(err) return res.json(err)
// //     res.send('200 delete success')
// //   })
// // })


// // //로그인
// // router.get('/login', (req, res)=> {
// //   is_login = util.isLogIN(req)
// //   if(is_login){
// //     // id, pw가 맞다면 access token, refresh token 발급
// //     const accessToken = jwt.sign(user);
// //     const refreshToken = jwt.refresh();
    
// //     // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장
// //     redisClient.set(user.id, refreshToken);

// //     res.status(200).send({ // client에게 토큰 모두를 반환
// //       ok: true,
// //       data: {
// //         accessToken,
// //         refreshToken,
// //       },
// //     });
// //   } else {
// //     res.status(401).send({
// //       ok: false,
// //       message: 'Login Fail',
// //     });
// //   }

// module.exports = router;