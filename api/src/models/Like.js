const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('like', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    created: {
        type: DataTypes.BOOLEAN,
        defaultValue: false   
    }
  },
  {
    timestamps: false
  });
};