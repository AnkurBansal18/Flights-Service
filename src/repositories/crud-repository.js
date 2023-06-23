const Logger = require("../config/logger-config");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    // try {
    const response = await this.model.create(data);
    return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in the crud repository : create");
    //   throw error;
    // }
  }

  async destroy(data) {
    // try {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in the crud repository : destroy");
    //   throw error;
    // }
  }

  async get(data) {
    // try {
    const response = await this.model.findByPk(data);
    if (!response) {
      //handling here as it can be common for other tables like city as well.
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;

    // } catch (error) {
    //   Logger.error("Something went wrong in the crud repository : get");
    //   throw error;
    // }
  }

  async getAll() {
    // try {
    const response = await this.model.findAll();
    return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in the crud repository : getAll");
    //   throw error;
    // }
  }

  async update(id, data) {
    //data - object (key:value)
    // try {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    if (response.length === 1 && response[0] === 0) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in the crud repository : update");
    //   throw error;
    // }
  }
}

module.exports = CrudRepository;
