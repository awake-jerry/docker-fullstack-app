// 서버구동에 필요한 모듈 가져오기
const express = require('express');
// 웹 post url 요청 시, param 요청 받기위한 모듈
const bodyParser = require('body-parser');

const db = require('./db');

//Express 서버를 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log('::: backend Application is started at 5000 port :::');
})

// lists 테이블 만들기
//db.pool.query(`CREATE TABLE lists (
//    id INTEGER AUTO_INCREMENT,
//    value TEXT,
//    PRIMARY KEY (id)
//)`, (err, results, field) => {
//    console.log('results', results)
//})

// DB lists 테이블에 있는 모든 데이터를 가져오기
app.get('/api/values', function(req, res) {
    db.pool.query(`SELECT * FROM lists;`,
    (err, results, fields) => {
        if(err) {
            return res.status(500).send(err)
        } else {
            return res.json(results)
        }
    })
}) 

// DB lists 테이블에 데이터를 입력하기
app.post('/api/value', function(req, res, next) {
    // db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    let param = {
        value : req.body.value
    };
    db.pool.query(`INSERT INTO lists set`, param,
    (err, results, fields) => {
        if(err) {
            return res.status(500).send(err)
        } else {
            return res.json({ success: true, value: req.body.value})
        }   
    })
})

