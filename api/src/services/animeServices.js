const utils = require('../utils/utils');
const { Anime, Genre } = require('../db.js');
const { Op, Sequelize } = require('sequelize');
const genreServices = require('./genresServices');
exports.fillAnimeModel = async () => {
  
  await genreServices.fillGenreModel();

  let options = {
    include: [{
      model: Genre,
      through: {attributes: []},
      
    },],
    distinct: true,
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
      const dbData = await Anime.findAndCountAll(options);
      
      return dbData;
    };
    
  } catch (error) {
    throw new Error("ESTO ES INFO" + error.message); 
  }
};

exports.get_animes_by_query = async (query) => {
  
  await this.fillAnimeModel();
  console.log(query)
  let limit = query.limit ? query.limit: 15;
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
    distinct: true,
    order: [['name', sort], [Genre, 'id', 'asc']],

  }
  // console.log(query.page)
  if(query.page) {
    options.limit = limit ;
    options.offset = (limit * (page - 1));
  } 
  query.page && delete query.page;
  try {
    let dbData = await Anime.findAndCountAll(options)
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

exports.get_animes_newest = async (sort, page) => {
  // this has beeen harcoded for show 9 newest animes
  // do the right logic for paginated 
  
  

  let limit = 9;
  let options = {
    include: [{
      model: Genre,
      through: {attributes: []},
      
    },],
    distinct:true,
    order: [['startDate', 'desc'], [Genre, 'id', 'asc']],
  };

  try {
    let pageSort = page ? Number(page) : 1
    if (page) {
      console.log('PAGE', page)
      page = Number(page);
      options.limit = 15 || limit
      options.offset = (limit * (page - 1)) || 0
    }
    let allAnimesLatest = await Anime.findAndCountAll(options);
    
    if (sort === 'rating') {
      allAnimesLatest.rows = allAnimesLatest.rows.sort((a,b) => (a.averageRating > b.averageRating) ? -1 : ((b.averageRating > a.averageRating) ? 1 : 0))

    };
    // if (sort === 'rating' && page) {
    //   allAnimesLatest.rows = allAnimesLatest.rows.sort((a,b) => (a.averageRating > b.averageRating) ? -1 : ((b.averageRating > a.averageRating) ? 1 : 0))
    //   allAnimesLatest.rows = allAnimesLatest.rows.slice((9* (Number(page) - 1)), 9)
    // };

    if(!allAnimesLatest) {
      throw new Error("No se logro hacer el filtrado");
    } else {
      allAnimesLatest = allAnimesLatest
      return allAnimesLatest;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.get_animes_trending = async (sort, page) => {
  page = Number(page)
  let limit = 9;
  let options = {
    include: [{
      model: Genre,
      through: {attributes: []},
      
    },],
    distinct:true,
    order: [['startDate', 'desc'], [Genre, 'id', 'asc']],
  };

  try {

  
    let allAnimeTrending = await Anime.findAndCountAll(options);
    
    if (page) {
      
      allAnimeTrending.rows = allAnimeTrending.rows.sort((a,b) => (a.averageRating > b.averageRating) ? -1 : ((b.averageRating > a.averageRating) ? 1 : 0))
 
      allAnimeTrending.rows = allAnimeTrending.rows.slice((9* (Number(page) - 1)), (9 * Number(page)))
    };

    if(!allAnimeTrending) {
      throw new Error("No se logro hacer el filtrado");
    } else {
      allAnimeTrending.rows = allAnimeTrending.rows.sort((a,b) => (a.averageRating > b.averageRating) ? -1 : ((b.averageRating > a.averageRating) ? 1 : 0))
      allAnimeTrending = allAnimeTrending
      return allAnimeTrending;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
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