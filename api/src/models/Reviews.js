// UNNUSED 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('reviews', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
    }, 
    coments: {
        type: DataTypes.TEXT,
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            max:5,
            min:1
        }
    },
    //spoiler:{},
    id_user:{
        type:DataTypes.INTEGER,
    },
    id_anime:{
        type:DataTypes.INTEGER,
    },
  },
  {
    timestamps: false
  });
};

