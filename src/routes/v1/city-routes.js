const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");
// /api/vi/city -POST
router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);

router.delete("/:id", CityController.destroyCity);

module.exports = router;
