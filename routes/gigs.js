const express = require("express");
const router = express.Router();
const controller = require("../controllers/gigsController");

const multer= require('multer')
const path= require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/gigs/'))
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
router.post("/edit", upload.single('img'), controller.update);
router.get("/myGigs", controller.myGigs);
router.post('/comment', controller.comment);
router.post('/hire', controller.hire);
module.exports = router;
