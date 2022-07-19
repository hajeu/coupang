let express = require("express");
let app = express();
let port = 5000;
let cors = require("cors");
let bodyParser = require("body-parser");
let router = require("./router/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(router);
