const express = require("express");
var path = require("path");
const app = express();
var port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "jtb9ia3h1pgevwb1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "bvhzzrfxifpd1onh",
  password: "b6ukrzvtl0slupbq",
  database: "jfaocgizpyz9abz2",
});

app.get("/api/scores", function (req, res) {
  console.log("getting all history");
  connection.query("SELECT username, score FROM scores", function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.post("/api/scores", function (req, res) {
  console.log(req.body);
  connection.query(
    "INSERT INTO scores (username, score) values(?,?)",
    [req.body.user, req.body.score],
    function (err, data) {
      if (err) throw err;
      res.json(data);
    }
  );
});
