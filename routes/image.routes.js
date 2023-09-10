const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/image.controller")
const upload = require('../middlewares/uploadImage')

router.get("/", ImageController.getAllImage);

router.post("/", upload.single('photo'), ImageController.createImage);
router.get("/:id", ImageController.getImageById);
router.put("/:id", upload.single('photo'), ImageController.updateImageById);
router.delete("/:id", ImageController.deleteImageById);

module.exports = router;