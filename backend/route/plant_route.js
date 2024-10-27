const express = require("express");
const router = express.Router();
const plantController = require("../controller/plant_controller");
const upload = require("../middleware/multerConfig");

router.post("/add/plant", upload.single("image"), plantController.addPlantApi);
router.get("/get/plant", plantController.listPlantApi);
router.put("/update/plant", plantController.updatePlantApi);
router.delete("/delete/plant", plantController.deletePlantApi);

module.exports = router;
