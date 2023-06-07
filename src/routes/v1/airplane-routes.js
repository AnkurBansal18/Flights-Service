const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
// /api/vi/airplane -POST
router.post(
  "/",
  AirplaneMiddleware.validateCreateRequest,
  AirplaneController.createAirplane
);
module.exports = router;
