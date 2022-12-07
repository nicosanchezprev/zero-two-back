
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      
  },
  name: {
      type: DataTypes.TEXT     
  },
  id_anime:{
    type: DataTypes.INTEGER,
  },
  },
  {
    timestamps: false
  });
};
