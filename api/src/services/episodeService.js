const utils = require('../utils/utils');

exports.fillEpisodesAnime = async (id) => {
    try {
        const episodes = await utils.getAllEpisodes(id);
        return episodes;
      } catch (error) {
        return "ESTO ES INFO" + error.message;
      }
}