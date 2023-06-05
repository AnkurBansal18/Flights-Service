const { StatusCodes } = require("http-status-codes");
function info(req, res) {
  return res.status(StatusCodes.OK).json({
    msg: "bhaibhai",
  });
}
module.exports = {
  info,
};
