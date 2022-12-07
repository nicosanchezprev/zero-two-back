const utils = require('../utils/utils');

exports.fillAnimeModel = async () => {
  try {
    const info = await utils.getAllAnime();
    return info;
  } catch (error) {
    return "ESTO ES INFO" + error.message;
  }
};