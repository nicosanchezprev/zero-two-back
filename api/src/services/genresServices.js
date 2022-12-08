const utils = require('../utils/utils');
const {Genre} = require('../db.js');

exports.fillGenreModel = async () => {

      try {
        const dbAux = await Genre.findAll();
        
        if(dbAux.length) {
          return dbAux;
          
        } else {
          
          const allGenres = await utils.getAllGenres();
          await Promise.all(allGenres.map(async genre => {
            await Genre.create(genre);
          }))
          const dbData = await Genre.findAll();
          
          return dbData;
        };
        
    
      } catch (error) {
        return "ESTO ES INFO" + error.message;
      }
}