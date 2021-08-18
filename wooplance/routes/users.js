const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

//-------------------------------
router.get("/profile/:id?", controller.index);
//-------------------------------
router.get("/profile/edit/:id?", controller.edit);
//-------------------------------
router.get("/register", controller.register);
router.post("/register", controller.create);
//-------------------------------
router.get("/login", controller.login);
router.post("/login", controller.loginPost);
//-------------------------------
router.get("/dashboard", controller.dashboard);

module.exports = router;
