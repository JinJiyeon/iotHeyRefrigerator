const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const db = mysql.createConnection({ //인자로 객체 전달
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,  
    dateStrings : 'date'
});

db.connect(function(err){
    if (err) throw err;
    console.log('mysql connect!')
});

module.exports = db;