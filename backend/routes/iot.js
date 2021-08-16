var express = require('express');
var router = express.Router();
var onoff = require('onoff')
var pigpio = require('pigpio');
const db = require('../lib/db');
const util = require('../utils/util')

router.get('/led', util.isLogin, (req, res, next) =>{
    var Gpio = onoff.Gpio
    var power = new Gpio(21, 'out')
    db.query(`SELECT * FROM users_and_ingredients 
            WHERE user_id='${req.user_id}' 
            AND DATEDIFF(expiration_date, CURDATE()) < 0`,
            (err, rows) => {
    if (err) next (err)
    else if (rows.length === 0) { console.log('empty')
        power.writeSync(0)} // 불 안들어옴
    else { console.log('not empty');
        power.writeSync(1);} // 불들어옴
    console.log('--------------------------------------------------')
    res.send(rows)
    })
})


// // 부저 코드 -> 시간 다 되면 백으로 요청
const beeper =  new pigpio.Gpio (18, {mode: pigpio.Gpio.OUTPUT});
function shortBeep()
{
    beeper.pwmFrequency(4000);
    let maxDutyCycle = beeper.getPwmRange();
    let dutyCycle = Math.trunc(0.5 * maxDutyCycle);
    beeper.pwmWrite(dutyCycle);
    setTimeout(function(){
        beeper.pwmWrite(0)
    }, 300)
}



// // 부저 울리는 코드 
router.get('/buzzer', function(req, res) {
    shortBeep()
    setTimeout(shortBeep, 1000)
    setTimeout(shortBeep, 2000)
    res.send();
});


module.exports = router;