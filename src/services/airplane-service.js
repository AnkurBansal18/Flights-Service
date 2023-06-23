const { log } = require("winston");
const { AirplaneRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const airplaneRepository = new AirplaneRepository(); //instance
async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if ((error.name = "SequelizeValidationError")) {
      let explanation = [];
      error.errors.forEach((error) => {
        explanation.push(error.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cant create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Can't fetch data of all the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airplane you requested is not present :(",
        error.statusCode
      );
    }
    throw new AppError("Can't fetch data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airplane you requested for deletion is not present :(",
        error.statusCode
      );
    }
    throw new AppError("Can't fetch data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAirplane(id, data) {
  try {
    const response = await airplaneRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airplane you requested for updation is not present :(",
        error.statusCode
      );
    }
    throw new AppError("Can't fetch data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
