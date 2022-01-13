const util = require("util");
const mysql = require("mysql");
const db = require("../db");

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM `chamcongthang`";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.status(200).json({
        status_code: 200,
        message: "Success",
        chamcong: response,
      });
    });
  },
  detail: (req, res) => {
    let sql = "SELECT * FROM chamcongthang WHERE idChamcongthang = ?";
    db.query(sql, [req.params.Id], (err, response) => {
      if (err) throw err;
      res.json({
        status_code: 200,
        message: "Success",
        chamcongthang: response[0],
      });
    });
  },
  update: (req, res) => {
    let data = req.body;
    let Id = req.params.Id;
    let sql = "UPDATE chamcongthang SET ? WHERE idChamcongthang = ?";
    // if(!data.id ){

    //     return res.status(400).send({error:`nhanvien information must be filled out`})
    // }
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      if (response.affectedRows == 0) {
        res.status(404).json({
          status_code: 404,
          message: "error",
        });
      }
      res.status(200).json({
        status_code: 200,
        message: "Update successfully!",
        response: data,
      });
    });
  },
  patch: (req, res) => {
    let data = req.body;
    let Id = req.params.Id;
    let sql = "UPDATE chamcongthang SET ? WHERE idChamcongthang = ?";

    db.query(sql, [data, Id], (err, response) => {
      if (response == 0) {
        res.status(404).json({
          status_code: 404,
          message: "error",
        });
      }
      if (err) throw err;
      res.json({ message: "Update successfully!" });
    });
  },
  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO `chamcongthang` SET ?";
    // if(!data.id ){

    //     return res.status(400).send({error: '400' ,message:`nhanvien information must be filled out`})
    // }
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Insert successfully!" });
    });
  },
};
