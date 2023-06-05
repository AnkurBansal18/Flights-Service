const express = require("express");
const router = express.Router();
const { infoController } = require("../../controllers");
// router.get("/info", (req, res) => {
//   //   return res.json({
//   //     msg: "Ds",
//   //   });
//   res.sendStatus(200);
// });

router.get("/info", infoController.info);
module.exports = router;
