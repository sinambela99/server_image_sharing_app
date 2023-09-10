const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user.controller")
const authUser = require("../middlewares/authUser")
const auth = require("../middlewares/authentication");

router.get("/", Controller.getAllUser);
router.post("/", Controller.register);

// router.use(auth);

router.get("/:id", Controller.getUserById);
router.put("/:id", authUser, Controller.updateUser);
router.delete("/:id", authUser, Controller.deleteUser);


module.exports = router;