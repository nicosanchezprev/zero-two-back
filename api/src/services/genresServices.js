const utils = require('../utils/utils');

exports.fillGenreModel = async () => {
    try {
        const genres = await utils.getAllGenres();
        return genres;
      } catch (error) {
        return "ESTO ES INFO" + error.message;
      }
}