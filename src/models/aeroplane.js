"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Aeroplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.flight, {
        foreignKey: "airplane_id",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Seat, {
        foreignKey: "airplane_id",
        onDelete: "CASCADE",
      });
    }
  }
  Aeroplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          max: 1000,
        },
      },
    },
    {
      sequelize,
      modelName: "Aeroplane",
    }
  );
  return Aeroplane;
};
