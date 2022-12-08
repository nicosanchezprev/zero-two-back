const utils = require('../utils/utils');
const { Anime, Genre } = require('../db.js');

exports.fillAnimeModel = async () => {
  let options = {
    include: [{
      model: Genre,
      through: {attributes: []},
      
    },],
    order: [['id', 'asc'], [Genre, 'id', 'asc']]
  }

  try {
    const dbAux = await Anime.findAll(options);
    
    if(dbAux.length) {
      return dbAux;

    } else {
      const allAnimes = await utils.getAllAnime();
      console.log('NUMERO DE ANIMES:', allAnimes.length)
      await Promise.all(allAnimes.map(async anime => {
        const auxGenres = anime.genres;
        delete anime.genres;
        await Anime.create(anime)
        const animeToFind = await Anime.findOne({where: {id: anime.id}});
        await animeToFind.setGenres(auxGenres);
      }))
      const dbData = await Anime.findAll(options);
      
      return dbData;
    };
    
  } catch (error) {
    return "ESTO ES INFO" + error.message;
  }
};