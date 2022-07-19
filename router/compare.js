const { Router } = require("express");

Router.post("/", function (req, res, next) {
  let id = req.body.id;
  let pw = req.body.pw;

  let query = "select salt, password from member where userid='" + id + "';";
  console.log(query);
  connection.query(query, function (err, rows) {
    if (err) throw err;
    else {
      if (rows.length == 0) {
        // 아이디가 존재하지 않는 경우
        console.log("아이디 틀림");
        res.redirect("/login");
      } else {
        let salt = rows[0].salt;
        let password = rows[0].password;
        const hashPassword = crypto
          .createHash("sha512")
          .update(pw + salt)
          .digest("hex");
        if (password === hashPassword) {
          //로그인 성공
          console.log("로그인 성공");
          res.cookie("user", id, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
          });
          res.redirect("/");
        } else {
          //로그인 실패(아이디는 존재하지만 비밀번호가 다름)
          console.log("로그인 실패 비밀번호 틀림");
          res.redirect("/login");
        }
      }
    }
  });
});
