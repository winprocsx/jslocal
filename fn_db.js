const dbConfig = require("./config-db");
const util = require("./util.js");
//npm install -S mysql
var mysql = require("mysql");

var config = {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: dbConfig.connectionLimit,
  timezone: "+9:00",
  dateStrings: "date",
  multipleStatements: true,
};

var pool = mysql.createPool(config);

var db = {};

// 관리자 페이지 로그인
db.apiAdminLogin = function (req, res) {
  console.log("apiAdminLogin");
  const SHA1 = require("sha1");

  // let salt = 'a67b97aea12cebeae0f72afef494922e';
  // let password = 'jslocal1234*'
  // let pwd = SHA1( salt + SHA1( password ) )
  // console.log(pwd);

  pool.getConnection(function (err, connection) {
    let resultData = {
      message: "해당 유저가 없습니다.",
    };

    if (!err) {
      //connected!
      query = `
      SELECT hashed_password, salt
      FROM users
      WHERE login = '${req.body.userId}'
      `;
      connection.query(query, function (error, results, fields) {
        if (error) {
          resultData.message = error.message;
          console.log("e: " + error);
          console.log("r: " + results);
          return res.status(202).json(resultData);
        }

        if (results.length < 1) {
          return res.status(203).json(resultData);
        } else {
          const salt = results[0].salt;
          const dbPassword = results[0].hashed_password;

          let inputPwd = SHA1(salt + SHA1(req.body.password));

          console.log(inputPwd, dbPassword, salt);

          if (dbPassword === inputPwd) {
            return res.status(200).json(results);
          } else {
            resultData.message = "비밀번호가 일치하지 않습니다.";
            return res.status(203).json(resultData);
          }
        }
      });
    }
    // 커넥션을 풀에 반환
    connection.release();
  });
};

// 사용자 계정 목록
db.apiLogWeeklyLogs = function (req, res) {
  console.log("apiUserAccounts");

  pool.getConnection(function (err, connection) {
    let resultData = {
      message: "사용자 정보가 없습니다.",
    };

    if (!err) {
      query = `
      SELECT id, login, concat(lastname,firstname) as name, admin, last_login_on, created_on
      FROM users
      WHERE login <> '' ;
      `;
      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log("e: " + error);
          console.log("r: " + results);
          resultData.message = error.message;
          return res.status(202).json(resultData);
        }

        return res.status(200).json(results);
      });
    } else {
      return res.status(202).json(err);
    }
    connection.release();
  });
};

//여행정산 리스트
db.apiLogWeeklyLogDetail = function (req, res) {
  console.log("apiLogWeeklyLogDetail");
  let userId = req.query.id;
  let startDate = req.query.st;
  let endDate = req.query.ed;

  pool.getConnection(function (err, connection) {
    let resultData = {
      message: "지자체 정보가 없습니다.",
    };

    if (!err) {
      query = `SELECT 
        c.lastname,
        c.firstname,
        a.notes,
        a.created_on,
        b.subject,
        b.id as issueId
      FROM journals A
      JOIN issues b 
      JOIN users c
      on a.journalized_id = b.id and a.user_id = c.id
      WHERE c.login = '${userId}'
        AND a.notes <> ''
        AND a.created_on >= '${startDate}'
        AND a.created_on <= '${endDate}'
      ORDER BY b.id desc, a.created_on desc;
      `;

      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log("e: " + error);
          console.log("r: " + results);
          resultData.message = error.message;
          return res.status(202).json(resultData);
        } else {
          let data = {
            name : "",
            result :[{}]
            // "1" : [
            //   {created_on : "2022-02-01 11:55:55", lastname : "l", fisrtname : "f", notes:"noteds"}
            //   {created_on : "2022-02-01 11:55:55", lastname : "l", fisrtname : "f", notes:"noteds"}
            //   {created_on : "2022-02-01 11:55:55", lastname : "l", fisrtname : "f", notes:"noteds"}
            // ]
          };

          data["name"] = results[0].lastname + results[0].firstname;
          results.forEach((item) => {
            if(!data.result[0][item.issueId]){
              data.result[0][item.issueId] = [];
            }
            let content = {
              created_on: item.created_on,
              lastname: item.lastname,
              fisrtname: item.firstname,
              notes: item.notes,
              subject: item.subject,
            };

            data.result[0][item.issueId].push(content);

            // data[item.issueId].push(
            //   {
            //     created_on : item.created_on,
            //     lastname : item.lastname,
            //     fisrtname : item.firstname,
            //     notes : item.notes,
            //     subject : item.subject,
            //   }
            // )
          });
          console.log(data);

          return res.status(200).json([data]);
        }
      });
    } else {
      return res.status(202).json(err);
    }
    connection.release();
  });
};

module.exports = db;
