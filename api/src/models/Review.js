// UNNUSED 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    replyingTo: {
      type:DataTypes.STRING,
      defaultValue: null
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating:{
        type: DataTypes.FLOAT,
        validate:{
            max:5,
            min:1
        }
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    spoiler:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    id_episode: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
};

