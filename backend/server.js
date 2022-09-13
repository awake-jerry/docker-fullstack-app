//서버구동에 필요한 모듈들을 가져오기
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

//Express 서버를 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(bodyParser.json());

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
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
        if(err) {
            return res.status(500).send(err)
        } else {
            return res.json({ success: true, value: req.body.value})
        }   
    })
})

app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작 되었습니다.');
})