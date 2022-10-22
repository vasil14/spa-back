"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employee }) {
      // define association here
      this.belongsTo(Employee, { foreignKey: "employeeId" });
    }
  }
  Availability.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "availability",
      modelName: "Availability",
    }
  );
  return Availability;
};
