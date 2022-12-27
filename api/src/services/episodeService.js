const utils = require('../utils/utils');
const { Anime } = require('../db.js');
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