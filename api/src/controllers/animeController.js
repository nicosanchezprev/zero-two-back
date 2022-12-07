const animeServices = require('../services/animeServices');

exports.create_anime = async (req, res) => {
  try {
    // Example!
    // animeCreado = animeService.createAnime(idAnime);
    // res.status(200).send(animeCreado);
    const allAnimes = await animeServices.fillAnimeModel();
    console.log("ESTO ES ALLANIMES", allAnimes);
    res.status(200).send(allAnimes);
  } catch (error) {
    res.status(400).send(error.message);
  }
}