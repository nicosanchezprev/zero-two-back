const animeServices = require('../services/animeServices');

exports.get_Animes = async (req, res) => {
  try {

    const allAnimes = await animeServices.fillAnimeModel();
    res.status(200).send(allAnimes);
    
  } catch (error) {
    res.status(400).send(error.message);
  }
}