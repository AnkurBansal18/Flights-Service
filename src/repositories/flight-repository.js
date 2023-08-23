const CrudRepository = require("./crud-repository");
const { flight, Aeroplane, airport, City } = require("../models");
const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepository {
  constructor() {
    super(flight);
  }

  async getAllFlights(filter) {
    const response = await flight.findAll({
      where: filter,
      // order: sort,
      // order: [["price", "ASC"]],
      include: [
        {
          model: Aeroplane,
          required: true,
          as: "airplane_details",
        },
        {
          model: airport,
          required: true, //inner join
          as: "departure_airport",
          //used if association is based on column other than primary key
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.departure_airport_id"),
              "=",
              Sequelize.col("departure_airport.IATA_code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: airport,
          required: true,
          as: "arrival_airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.arrival_airport_id"),
              "=",
              Sequelize.col("arrival_airport.IATA_code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }
  async updateRemainingSeats(flightId, seats, dec = true) {
    const reqFlight = await flight.findByPk(flightId);

    //type coercion(parseInt(dec))
    if (parseInt(dec)) {
      await reqFlight.decrement("total_seats", { by: seats });
    } else {
      await reqFlight.increment("total_seats", { by: seats });
    }
    return reqFlight;
  }
}

module.exports = FlightRepository;
