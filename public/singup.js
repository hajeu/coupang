function checkPW() {
  let id = $("#id").val();
  let pw = $("#password").val();
  let name = $("#name").val();
  let phonenum = $("#phonenum").val();
  let cpw = $("#password_a").val();

  if (id.length < 4 || id.length >= 20) alert("ID가 양식에 적합하지 않습니다.");
  else if (pw.length < 4 || cpw.length < 4)
    alert("비밀번호는 4자 이상 입력해주세요");
  else if (pw !== cpw) alert("비밀번호가 일치하지 않습니다.");
  else {
    $.ajax({
      url: "/signup",
      type: "POST",
      data: {
        pw: pw,
        id: id,
        name: name,
        phonenum: phonenum,
      },
      success: function (data) {
        if (data === "중복ID") {
          alert("이미 존재하는 ID입니다");
        } else if (data === "성공") {
          alert("정상적으로 회원가입 되었습니다");
        }
      },
    });
  }
}
