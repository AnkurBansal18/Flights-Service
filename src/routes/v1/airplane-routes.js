const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
// /api/vi/airplanes -POST
router.post(
  "/",
  AirplaneMiddleware.validateCreateRequest,
  AirplaneController.createAirplane
);
// /api/vi/airplanes - GET

router.get("/", AirplaneController.getAirplanes);
router.get("/:id", AirplaneController.getAirplane);

module.exports = router;
