'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Employee, Appointment }) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'categoryId' });

      this.belongsToMany(Employee, {
        through: 'employee_service'
      });

      this.belongsToMany(Appointment, {
        through: 'appointment_service'
      });
    }
  }
  Service.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000)
      }
    },
    {
      sequelize,
      tableName: 'services',
      modelName: 'Service'
    }
  );
  return Service;
};
