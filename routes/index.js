const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const user = require("./user.routes");
const image = require("./image.routes");
const comment = require("./comment.routes");


router.post("/api/register", userController.register);
router.post("/api/login", userController.login);

router.use("/api/user", user);
router.use("/api/image", image);
router.use("/api/comment", comment);

module.exports = router;