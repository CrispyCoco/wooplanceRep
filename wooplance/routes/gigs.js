const express = require("express");
const router = express.Router();
const controller = require("../controllers/gigsController");

//-------------------------------
router.get("/show/:id?", controller.index);
router.get("/add", controller.create);
router.get("/edit/:id?", controller.edit);
router.get("/myGigs", controller.myGigs);

module.exports = router;
