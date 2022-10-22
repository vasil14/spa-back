"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("employee_services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      EmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("employee_services");
  },
};
