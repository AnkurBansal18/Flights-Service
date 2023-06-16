"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint("airports", {
      type: "FOREIGN KEY",
      name: "city_fk_constraint",
      fields: ["city_id"],
      references: {
        table: "Cities",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // deletes rows in a child table when corresponding rows are deleted in the parent table
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("airports", "city_fk_constraint");
  },
};
