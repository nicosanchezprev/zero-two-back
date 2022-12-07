const utils = require('../utils/utils');

exports.fillEpisodeModel = async () => {
    try {
        const reviews = await utils.getAllEpisodes();
        return reviews;
      } catch (error) {
        return "ESTO ES INFO" + error.message;
      }
}