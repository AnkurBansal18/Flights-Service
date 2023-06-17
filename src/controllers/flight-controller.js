const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flight_number: req.body.flight_number,
      price: req.body.price,
      airplane_id: req.body.airplane_id,
      total_seats: req.body.total_seats,
      departure_airport_id: req.body.departure_airport_id,
      arrival_airport_id: req.body.arrival_airport_id,
      departure_time: req.body.departure_time,
      arrival_time: req.body.arrival_time,
      boarding_gate: req.body.arrival_time,
    });
    SuccessResponse.data = flight;
    SuccessResponse.message = "Successfully created the flight";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
};
