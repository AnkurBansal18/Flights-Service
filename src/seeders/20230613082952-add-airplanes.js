"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("aeroplanes", [
      {
        modelNumber: "boeing777",
        capacity: "335",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "airbus A220",
        capacity: "290",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("aeroplanes", {
      [Op.or]: [{ modelNumber: "boeing777" }, { modelNumber: "airbus A220" }],
    });
  },
};
