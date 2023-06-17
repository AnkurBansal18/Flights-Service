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

module.exports = router;
