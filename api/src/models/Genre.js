// UNNUSED 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      
  },
    name: {
        type: DataTypes.TEXT     
    }
  },
  {
    timestamps: false
  });
};
