"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Aeroplane, {
        foreignKey: "airplane_id",
        as: "airplane_details",
      });
      this.belongsTo(models.airport, {
        foreignKey: "departure_airport_id",
        // targetKey: "IATA_code",
        as: "departure_airport",
      });
      this.belongsTo(models.airport, {
        foreignKey: "arrival_airport_id",
        // targetKey: "IATA_code",
        as: "arrival_airport",
      });
    }
  }
  flight.init(
    {
      flight_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      airplane_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departure_airport_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrival_airport_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrival_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departure_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      boarding_gate: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "flight",
    }
  );
  return flight;
};
