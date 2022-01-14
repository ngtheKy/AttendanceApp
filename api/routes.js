"use strict";

const express = require("express");
const router = express.Router();
const db = require("./db");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
  let Ctrl = require("./controllers/NhanvienController");
  let CtrlAtd = require("./controllers/ChamcongController");
  let CtrlAtdm = require("./controllers/ChamcongthangController");

  // todoList Routes
  app.route("/nhanvien").get(Ctrl.get).post(Ctrl.store);

  app.route("/search/:TenNV").get(Ctrl.search);

  app
    .route("/nhanvien/:Id")
    .get(Ctrl.detail)
    .put(Ctrl.update)
    .delete(Ctrl.delete)
    .patch(Ctrl.patch);

  app.route("/nhanvien/:Id/upload").post().put();

  app
    .route("/chamcong")
    .get(CtrlAtd.get)
    .post(CtrlAtd.store)
    .delete(CtrlAtd.delete);
  app
    .route("/chamcong/:Id")
    .get(CtrlAtd.detail)
    .patch(CtrlAtd.patch)
    .put(CtrlAtd.update);
  app.route("/chamcongthang").get(CtrlAtdm.get).post(CtrlAtdm.store);

  //authentication
  app.post("/register", signupValidation, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: "This user is already in use!",
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err,
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO users (name, email, password) VALUES ('${
                  req.body.name
                }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err,
                    });
                  }
                  return res.status(201).send({
                    msg: "The user has been registerd with us!",
                  });
                }
              );
            }
          });
        }
      }
    );
  });
  app.post("/login", loginValidation, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Email or password is incorrect!",
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]["password"],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: "Email or password is incorrect!",
              });
            }
            if (bResult) {
              const token = jwt.sign(
                { iduser: result[0].iduser },
                "the-super-strong-secrect",
                { expiresIn: "1h" }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE iduser = '${result[0].iduser}'`
              );
              return res.status(200).send({
                msg: "Logged in!",
                token,
                user: result[0],
              });
            }
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }
        );
      }
    );
  });
  app.post("/get-user", signupValidation, (req, res, next) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }
    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    db.query(
      "SELECT * FROM users where iduser=?",
      decoded.iduser,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results[0],
          message: "Fetch Successfully.",
        });
      }
    );
  });
};
