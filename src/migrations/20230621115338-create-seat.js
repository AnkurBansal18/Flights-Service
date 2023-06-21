"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Enums } = require("../utils/common");
const { BUSINESS, PREMIUM_ECONOMY, ECONOMY, FIRST_CLASS } = Enums.SEAT_TYPE;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      airplane_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Aeroplanes", //if associating in same migration, the names should be model and key, in case of another migration the name should be table and field.
          key: "id",
        },
        onDelete: "CASCADE",
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      column: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: [BUSINESS, PREMIUM_ECONOMY, ECONOMY, FIRST_CLASS],
        defaultValue: ECONOMY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Seats");
  },
};
