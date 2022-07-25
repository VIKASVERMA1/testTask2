const express = require("express");
const router = express.Router("epxpress");
const userController = require("../controller/userController");
const multer=require("multer")
let storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({ storage: storage });



router.post("/SavedData", upload.single("project"),userController.taskAssigened);
router.post("/register",userController.registered);
router.get("/getData",userController.getdata);
module.exports = router;