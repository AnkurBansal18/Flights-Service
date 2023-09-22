const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
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

async function getAllFlights(query) {
  // trips = BOM-DEL

  let customFilter = {};
  // let sortFilter = [];
  let tripDateEndTime = " 23:59:00"; // 2022-05-12 01:00:00 ex
  if (query.trips) {
    [departure_airport_id, arrival_airport_id] = query.trips.split("-");

    //todo - add a check that departure_airport_id != arrival_airport_id
    if (departure_airport_id !== arrival_airport_id) {
      customFilter.departure_airport_id = departure_airport_id;
      customFilter.arrival_airport_id = arrival_airport_id;
    } else {
      throw new AppError(
        "Can't fetch data of flights",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  if (query.price) {
    [min_price, max_price] = query.price.split("-");

    customFilter.price = {
      [Op.between]: [min_price, max_price == undefined ? 30000 : max_price],
    };
  }

  if (query.travellers) {
    customFilter.total_seats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.travelDate) {
    customFilter.departure_time = {
      [Op.between]: [query.travelDate, query.travelDate + tripDateEndTime],
    };
  }

  // if (query.sort) {
  //   const params = query.sort.split(",");
  //   const sortFilters = params.map((param) => param.split("_"));
  //   const sortFilter = sortFilters;
  // }

  try {
    const flights = await flightRepository.getAllFlights(customFilter); //sortfilter

    return flights;
  } catch (error) {
    throw new AppError(
      "Can't fetch data of flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Flight you requested is not present :(",
        error.statusCode
      );
    }
    throw new AppError("Can't fetch data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );
    return response;
  } catch (error) {
    throw new AppError(
      "Can't update data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
