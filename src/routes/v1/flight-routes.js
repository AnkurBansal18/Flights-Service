const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

// /api/vi/flights - POST

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);

router.get("/", FlightController.getAllFlights);

router.get("/:id", FlightController.getFlight);

router.patch(
  "/:id/seats",
  FlightMiddleware.validateUpdateSeatsRequest,
  FlightController.updateSeats
);

module.exports = router;
