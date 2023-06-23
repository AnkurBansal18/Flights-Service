const { log } = require("winston");
const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if ((error.name = "SequelizeValidationError")) {
      let explanation = [];
      error.errors.forEach((error) => {
        explanation.push(error.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cant create a new airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Can't fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport you requested is not present :(",
        error.statusCode
      );
    }
    throw new AppError("Can't fetch data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport you requested for deletion is not present :(",
        error.statusCode
      );
    }
    throw new AppError("Can't fetch data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport you requested for updation is not present :(",
        error.statusCode
      );
    }
    throw new AppError("Can't fetch data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
