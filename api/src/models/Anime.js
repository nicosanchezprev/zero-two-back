const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define( 'anime',
   
    {
    	// id:{
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true,
     	// },
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
     	name:{
			type:DataTypes.TEXT,
			allowNull: false,
		},
		userCount:{
			type:DataTypes.INTEGER,
		}, 
     	synopsis:{
        	type:DataTypes.TEXT,
     	},
     	averageRating:{
        	type:DataTypes.FLOAT,
     	},
     	favoritesCount:{
        	type:DataTypes.INTEGER,

     	},
     	startDate:{
        	type:DataTypes.DATE,
     	},
     	endDate:{
        	type:DataTypes.DATE,
     	},
     	popularityRank:{
        	type:DataTypes.INTEGER,
     	},
     	ratingRank:{
        	type:DataTypes.INTEGER,
     	},
     	status:{
        	type:DataTypes.TEXT,
     	},
     	posterImage:{
        	type:DataTypes.STRING(1234),
     	},
     	coverImage:{
        	type:DataTypes.STRING(1234),
     	},
     	episodeCount:{
        	type:DataTypes.INTEGER,
     	},
    	episodeLength:{
      		type:DataTypes.INTEGER,
     	},
     	youtubeVideoId:{
        	type:DataTypes.TEXT,
     	},
     	nsfw:{
        	type:DataTypes.BOOLEAN,
     	},
     	subtype:{
        	type:DataTypes.TEXT,
     	},
     	showType:{
        	type:DataTypes.TEXT,
     	},
     	ageRatingGuide:{
        	type:DataTypes.TEXT,
     	}
    },
    { timestamps: false }
  );
};
