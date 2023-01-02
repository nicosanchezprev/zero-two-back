// UNNUSED 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('episodes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    },
    titles:{
        type:DataTypes.JSONB,
    },
    number:{
        type:DataTypes.INTEGER,
    },
    seasonNumber:{
        type:DataTypes.INTEGER,
    },
   /* airdate:{},
    length:{},
    thumbnail:{},*/
    // user_id:{
    //     type:DataTypes.INTEGER,
    // },
    // anime_id:{
    //     type:DataTypes.INTEGER,
    // },
  },
  {
    timestamps: false
  });
};

