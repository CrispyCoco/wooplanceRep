const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

const multer= require('multer')
const path= require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
//-------------------------------
router.get("/profile/id/:id", controller.index);
//-------------------------------
router.get("/profile/edit/:id", controller.edit);
router.post("/profile/edit/:id", upload.single('profilePic'), controller.update);
//-------------------------------
router.get("/register", controller.register);
router.post("/register", upload.single('profilePic'), controller.create);
//-------------------------------
router.get("/login", controller.login);
router.post("/login", controller.loginPost);
//-------------------------------
router.get("/dashboard", controller.dashboard);
//-------------------------------
router.post('/logout', controller.logout)

module.exports = router;
