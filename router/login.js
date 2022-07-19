const { Router } = require("express");
const router = Router();

router.post("/", async function (req, res, next) {
  let id = req.body.id;
  let password = req.body.pw;
  let name = req.body.name;
  let phonenum = req.body.phonenum;

  const hashPassword = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");
  let query = "SESECT userid FROM member where userid='" + id + "';"; // 중복 처리하기 위한 쿼리
  connection.query(query, function (err, rows) {
    if (rows.length == 0) {
      // sql 제대로 연결되고 중복이 없는 경우
      let sql = {
        userid: id,
        password: hashPassword,
        name: name,
        phonenum: phonenum,
        salt: salt,
      };
      // create query
      let query = connection.query(
        "inset into member set ?",
        sql,
        function (err, rows) {
          if (err) throw err;
          else {
            res.send("성공");
          }
        }
      );
    } else {
      //이미 있음
      res.send("중복ID");
    }
  });
});
