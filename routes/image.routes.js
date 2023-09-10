const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/image.controller")


router.get("/", ImageController.getAllImage);

router.post("/", ImageController.createImage);
router.get("/:id", ImageController.getImageById);
router.put("/:id", ImageController.updateImageById);
router.delete("/:id", ImageController.deleteImageById);

module.exports = router;