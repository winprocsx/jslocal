const express = require("express");
const dbConfig = require("./config-db");
const fnDb = require("./fn_db.js");
const app = express();
var bodyParser = require("body-parser");

// app.use(fileupload());
app.use(express.json({limit:5000000})); //5MB
app.use(express.urlencoded({ limit: 5000000, extended: true, parameterLimit:50000 }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening at port ${PORT}`));



//로그인
app.post('/apis/login', (req, res) => fnDb.apiAdminLogin(req, res));

// 근무일지 > 주간활동일지
app.get('/apis/workLog/weekly', (req, res) => fnDb.apiLogWeeklyLogs(req, res));

// 근무일지 > 주간활동일지
app.get('/apis/workLog/weekly/detail', (req, res) => fnDb.apiLogWeeklyLogDetail(req, res));