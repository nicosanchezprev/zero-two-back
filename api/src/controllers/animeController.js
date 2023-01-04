const animeServices = require('../services/animeServices');
const { Anime } = require('../db.js');
exports.get_Animes = async (req, res) => {
  
let reqHasQuery = Object.entries(req.query).length;
  try {
    // console.log(req.query);
    if (reqHasQuery) {
      const allAnimes = await animeServices.get_animes_by_query(req.query);
      res.status(200).send(allAnimes);
    } else {
      const allAnimes = await animeServices.fillAnimeModel(req.query);
      res.status(200).send(allAnimes);
    }
    
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.require_Anime = async (req, res) => {
  let id = req.params.id;
  try {
    let anime = await animeServices.get_anime_by_id(id);
    res.status(200).send(anime);

  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.require_Newest = async (req, res) => {
  try {
    const {sort, page} = req.query;
    console.log(sort,page)
    let animesNewest;
    sort ? animesNewest = await animeServices.get_animes_newest(sort): page ? animesNewest = await animeServices.get_animes_newest(null, page)
     : animesNewest = await animeServices.get_animes_newest();
    if(!animesNewest) {
      res.status(400).send("FALLO EL FILTRADO");
    } else {
      res.status(200).send(animesNewest);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};
exports.require_Trending = async (req, res) => {
  try {
    const {sort, page} = req.query;
    console.log(sort,page)
    let animesNewest = await animeServices.get_animes_trending(sort, page);
    if(!animesNewest) {
      res.status(400).send("FALLO EL FILTRADO");
    } else {
      res.status(200).send(animesNewest);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.require_Oldest = async (req, res) => {
  try {
    let animesOldest = await animeServices.get_animes_oldest();
    if(!animesOldest) {
      res.status(400).send("FALLO EL FILTRADO");
    } else {
      res.status(200).send(animesOldest);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};