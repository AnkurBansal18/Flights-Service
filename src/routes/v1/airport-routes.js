const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");

// /api/vi/airports - POST

router.post(
  "/",
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);

// /api/vi/airplanes - GET
router.get("/", AirportController.getAirports);

// /api/vi/airplanes/id - GET
router.get("/:id", AirportController.getAirport);

// /api/vi/airplanes/id - DELETE
router.delete("/:id", AirportController.destroyAirport);

// /api/vi/airplanes/id - PATCH
router.patch("/:id", AirportController.updateAirport);

module.exports = router;
