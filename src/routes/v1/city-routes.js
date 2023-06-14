const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");

// /api/vi/city - POST
router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);

// /api/vi/city/id - DELETE
router.delete("/:id", CityController.destroyCity);

// /api/vi/city/id - PATCH
router.patch("/:id", CityController.updateCity);

module.exports = router;
