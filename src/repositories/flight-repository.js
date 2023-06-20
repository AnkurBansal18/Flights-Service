const CrudRepository = require("./crud-repository");
const { flight } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(flight);
  }

  async getAllFlights(filter) {
    const response = await flight.findAll({
      where: filter,
      // order: sort,
      // order: [["price", "ASC"]],
    });
    return response;
  }
}

module.exports = FlightRepository;
