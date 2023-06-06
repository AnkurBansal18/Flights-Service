const express = require("express");
const router = express.Router();
const { infoController } = require("../../controllers");
const airplaneRoutes = require("./airplane-routes");
// router.get("/info", (req, res) => {
//   //   return res.json({
//   //     msg: "Ds",
//   //   });
//   res.sendStatus(200);
// });
router.use("/airplane", airplaneRoutes);
router.get("/info", infoController.info);
module.exports = router;
