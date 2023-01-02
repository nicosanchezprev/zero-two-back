const utils = require('../utils/utils');
const { Anime } = require('../db.js');

exports.getEpisode= async (idAnime, idEpisode) => {
  try {
    let dbData = await Anime.findByPk(idAnime);
        if (!dbData) {
          throw new Error(`Anime with id ${idAnime} wasn't found. Not related episodes.`);

        } else {
          const episode = await utils.getEpisode(idAnime, idEpisode);
          return episode
        }
  } catch (error) {
    throw new Error(error.message)
  }
}

exports.fillEpisodesAnime = async (id) => {
    try {
        let dbData = await Anime.findByPk(id);
        if (!dbData) {
          throw new Error(`Anime with id ${id} wasn't found. Not related episodes.`)
        }
        else {
          const episodes = await utils.getAllEpisodes(id);
          return episodes;
        }
        
      } catch (error) {
        throw new Error(error.message)
      }
};

exports.getNewestEpisodes = async (id) => {
  try {
    let dbData = await Anime.findByPk(id);
    if (!dbData) {
      throw new Error(`Anime with id ${id} wasn't found. Not related episodes.`)
    }
    else {
      let newestEpisodes = await utils.getAllEpisodes(id);

      newestEpisodes = newestEpisodes.sort((a, b) => b.id - a.id);

      return newestEpisodes;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}