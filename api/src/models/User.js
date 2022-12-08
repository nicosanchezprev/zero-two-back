// UNNUSED 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    premium:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
    },
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nickname:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
    password:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
    email:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
  
    age:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    registered:{
        type:DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false
  });
};
