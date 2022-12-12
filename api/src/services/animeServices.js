const utils = require('../utils/utils');
const { Anime, Genre } = require('../db.js');
const { Op } = require('sequelize');
const genreServices = require('./genresServices');
exports.fillAnimeModel = async () => {
  
  await genreServices.fillGenreModel();

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
      console.log('NUMERO DE ANIMES:', allAnimes.length);

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

exports.get_animes_by_query = async (query) => {
  
  await this.fillAnimeModel();
  let limit = query.limit ? query.limit: 9;
  let page = query.page ? query.page: 1;
  let sort = query.sort ? query.sort: 'asc';
  query.sort && delete query.sort;

   // allow pass multiple genre params => Comedy, Action,...
  let genres = query.genres ? {name: query.genres.split(",")}: {};
  query.genres && delete query.genres;

  query.name ? query.name = {
    [Op.iLike]: `%${query.name}%`
  } : {};
 
  // console.log(query)
  let options = {
    where: query,
    
    include: [{
      model: Genre,
      through: {attributes: []},
      where: genres
    },],
    order: [['name', sort], [Genre, 'id', 'asc']],

  }
  console.log(query.page)
  if(query.page) {
    options.limit = limit ;
    options.offset = (limit * (page - 1));
  } 
  query.page && delete query.page;
  try {
    let dbData = await Anime.findAll(options)
    // db con info
    if(dbData) return dbData;
    else throw new Error('Nooo');

  } catch (err) {
    throw new Error(err.message);
  }
}

exports.get_anime_by_id = async (id) => {
  let options = {
    include: [{
      model: Genre,
      through: {attributes: []},
      
    },],
    order: [['id', 'asc'], [Genre, 'id', 'asc']]
  }

  try {
    let anime = await Anime.findByPk(id, options);

    if(anime.name) {
      return anime;
    } else {
      throw new Error(`The anime with id ${id} does not exist`);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.get_animes_newest = async () => {
  // this has beeen harcoded for show 9 newest animes
  // do the right logic for paginated 
  let limit = 9;
  let page = 1;
  let options = {
    include: [{
      model: Genre,
      through: {attributes: []},
      
    },],
    order: [['startDate', 'desc'], [Genre, 'id', 'asc']],
    limit: 9 || limit,
    offset :(limit * (page - 1)) || 0
  };
  try {
    let allAnimesLatest = await Anime.findAll(options);

    if(!allAnimesLatest) {
      throw new Error("No se logro hacer el filtrado");
    } else {
      return allAnimesLatest;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.get_animes_oldest = async () => {
  let options = {
    include: [{
      model: Genre,
      through: {attributes: []},
      
    },],
    order: [['startDate', 'asc'], [Genre, 'id', 'asc']]
  };
  try {
    let allAnimesOldest = await Anime.findAll(options);

    if(!allAnimesOldest) {
      throw new Error("No se logro hacer el filtrado");
    } else {
      return allAnimesOldest;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};