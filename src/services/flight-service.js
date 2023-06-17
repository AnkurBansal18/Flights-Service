const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    // const date1 = new Date(data.departure_time); //epoch time
    // const date2 = new Date(data.arrival_time);
    // console.log(date1, date1 < date2);
    // if (date1 < date2) {
    const flight = await flightRepository.create(data);
    return flight;
    // } else {
    //   throw new AppError("Invalid timings", StatusCodes.BAD_REQUEST);
    // }
  } catch (error) {
    // console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((error) => {
        explanation.push(error.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Can't create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
};
