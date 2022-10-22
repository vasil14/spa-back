"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("categories");
  },
};
