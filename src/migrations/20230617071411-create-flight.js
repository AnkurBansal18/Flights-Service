"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      flight_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      total_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

      departure_airport_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "airports",
          key: "IATA_code",
        },
        onDelete: "CASCADE",
      },

      arrival_airport_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "airports",
          key: "IATA_code",
        },
        onDelete: "CASCADE",
      },

      arrival_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      departure_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      boarding_gate: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("flights");
  },
};

//command to check foreign key assoiation

// mysql> select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'flights' AND CONSTRAINT_SCHEMA = 'airlines';
