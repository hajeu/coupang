let express = require("express");
let app = express();
let router = express.Router();
let path = require("path");

router.get("/", function (req, res) {
  res.sendfile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;
