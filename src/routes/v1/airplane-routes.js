const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");

// /api/vi/airplane -POST
router.post("/", AirplaneController.createAirplane);
module.exports = router;
