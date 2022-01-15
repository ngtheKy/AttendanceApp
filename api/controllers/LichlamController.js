"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("./../db");

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM `lichlamviec`";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.status(200).json({
        status_code: 200,
        message: "Success",
        calam: response,
      });
    });
  },

  update: (req, res) => {
    let data = req.body;
    let Id = req.params.Id;
    let sql = "UPDATE lichlamviec SET ? WHERE idCalam = ?";
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

  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO `lichlamviec` SET ?";
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Insert successfully!" });
    });
  },
  delete: (req, res) => {
    let sql = "DELETE FROM lichlamviec WHERE idCalam = ?";
    db.query(sql, [req.params.Id], (err, response) => {
      if (response.affectedRows == 0) {
        res.status(404).json({
          status_code: 404,
          message: "error",
        });
      }
      if (err) throw err;
      res.json({ message: "Delete successfully!" });
    });
  },
};
