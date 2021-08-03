// // auth.js

// require('dotenv').config();
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

// const JWTConfig = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET_KEY,
// };

// const JWTVerify = async (jwtPayload, done) => {
//   try {
//     // jwtPayload에 유저 정보가 담겨있다.
// 		// 해당 정보로 유저 식별 로직을 거친다.

//     // 유효한 유저라면
//     if (user) {
//       done(null, user);
//       return;
//     }
//     // 유저가 유효하지 않다면
//     done(null, false, { message: 'inaccurate token.' });
//   } catch (error) {
//     console.error(error);
//     done(error);
//   }
// };

// passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));

// // 토큰에 담길 유저명의 key를 지정하는 옵션. 패스워드도 지정할 수 있다.
// const passportConfig = { usernameField: 'userName' };


// passport.use(
//   'signup',
//   new localStrategy(passportConfig, async (userName, password, done) => {
// 		// 유저 생성
// 		// 성공하면
//     return done(null, userName);
		
// 		// 실패하면
//     return done(null, false, { message: 'User creation fail.' });
//   })
// )

// passport.use(
//   'signin',
//   new localStrategy(passportConfig, async (userName, password, done) => {
//     // 유저가 db 에 존재한다면
//     return done(null, userName, { message: 'Sign in Successful' });

// 		// 없다면
//     return done(null, false, { message: 'Wrong password' });
//   })
// );

// module.exports = { passport };