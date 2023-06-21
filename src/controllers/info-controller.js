const { StatusCodes } = require("http-status-codes");
function info(req, res) {
  return res.status(StatusCodes.OK).json({
    success: true,
    msg: "api live",
    error: {},
    data: {},
  });
}
module.exports = {
  info,
};
