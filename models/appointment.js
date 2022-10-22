'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Service, Employee }) {
      // define association here
      this.belongsToMany(Service, {
        through: 'appointment_service'
      });
      this.belongsTo(Employee);
    }
  }

  Appointment.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      start_at: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end_at: {
        type: DataTypes.TIME,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'appointment',
      modelName: 'Appointment'
    }
  );
  return Appointment;
};
