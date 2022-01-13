"use strict";
module.exports = function (app) {
  let Ctrl = require("./controllers/NhanvienController");
  let CtrlAtd = require("./controllers/ChamcongController");
  let CtrlAtdm = require("./controllers/ChamcongthangController");

  // todoList Routes
  app.route("/nhanvien").get(Ctrl.get).post(Ctrl.store);

  app.route("/nhanvien/search/:TenNV").get(Ctrl.search);

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
};
