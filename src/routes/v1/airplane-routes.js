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

// /api/vi/airplanes/id - GET
router.get("/:id", AirplaneController.getAirplane);

// /api/vi/airplanes/id - DELETE
router.delete("/:id", AirplaneController.destroyAirplane);

module.exports = router;
