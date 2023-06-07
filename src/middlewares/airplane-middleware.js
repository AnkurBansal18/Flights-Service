const StatusCodes = require("http-status-codes");
function validateCreateRequest(req, res, next) {
  //client side error
  if (!req.body.modelNumber) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: { explanation: "model number not found in the request" },
    });
  }

  next();
}
module.exports = {
  validateCreateRequest,
};
