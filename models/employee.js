'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Service, Availability, Appointment }) {
      this.belongsToMany(Service, {
        through: 'employee_service'
      });

      this.hasMany(Availability, {
        foreignKey: 'employeeId'
      });

      this.hasMany(Appointment, {
        foreignKey: 'employeeId'
      });
    }
  }
  Employee.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      about: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'employees',
      modelName: 'Employee'
    }
  );
  return Employee;
};
