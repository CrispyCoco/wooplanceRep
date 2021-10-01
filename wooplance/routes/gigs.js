const express = require("express");
const router = express.Router();
const controller = require("../controllers/gigsController");

const multer= require('multer')
const path= require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
//-------------------------------
router.get("/show/:id", controller.index);
router.get("/add", controller.add);
router.post("/create", upload.single('img'), controller.create);
router.get("/edit/:id", controller.edit);
router.post("/edit/:id", upload.single('img'), controller.update);
router.get("/myGigs", controller.myGigs);

module.exports = router;
