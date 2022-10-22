'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('appointment_service', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      AppointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointment_service');
  }
};