"use strict";
module.exports = function (app) {
  let Ctrl = require("./controllers/Controller");

  // todoList Routes
  app.route("/nhanvien").get(Ctrl.get).post(Ctrl.store);

  app.route("nhanvien/search").get(Ctrl.search);
  app
    .route("/nhanvien/:Id")
    .get(Ctrl.detail)
    .put(Ctrl.update)
    .delete(Ctrl.delete)
    .patch(Ctrl.patch);
  app.route("nhanvien/:Id/upload").post().put();
};
