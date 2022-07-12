const express = require('express');
const app = express();
const serverPort = 3000;

const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "db",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "fullcycledb",
});

app.get("/", (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    connection.query("INSERT INTO people (name) VALUES (\"Nome Qualquer\")", function (err, result, fields) {
      // if any error while executing above query, throw error
    if (err) throw err;

    console.log(result);

    });

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
        res.send(texto);
      }
    });

    connection.end()

  });


});

app.listen(serverPort, () => console.log('Server is up and running'));
