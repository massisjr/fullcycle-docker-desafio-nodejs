const express = require('express');
const app = express();
const serverPort = 3000;

const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "db",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "fullcycledb",
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM people", (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      var texto = "FullCycle Rocks!!!";
      for (let i in rows) {
        texto += "</br><h2>ID: " + JSON.stringify(rows[i].id) + "</h2><h2>Name: "+ rows[i].name + "</h2>";
      }
      res.send(texto)

      // res.json({
      //   success: true,
      //   rows,
      // });
    }
  });
});

app.listen(serverPort, () => console.log('Server is up and running'));
